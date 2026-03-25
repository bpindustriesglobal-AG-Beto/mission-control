const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const os = require('os');
const fs = require('fs');
const { exec } = require('child_process');
const util = require('util');

const execAsync = util.promisify(exec);

const BRIDGE_TOKEN = process.env.BRIDGE_TOKEN || 'BP_INDUSTRIES_SECURE_2026';
const BIND_HOST = process.env.BIND_HOST || '0.0.0.0';
const PUBLIC_BRIDGE_HOST = process.env.PUBLIC_BRIDGE_HOST || process.env.TAILSCALE_IP || '100.97.56.83';
const PORT = parseInt(process.env.PORT || '8080');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

let lastEventAt = null;

io.use((socket, next) => {
  if (socket.handshake.auth.token === BRIDGE_TOKEN) {
    next();
  } else {
    next(new Error('Acceso denegado: 403 Forbidden'));
  }
});

io.on('connection', socket => {
  console.log(`[+] Cliente conectado: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log(`[-] Cliente desconectado: ${socket.id}`);
  });
});

function emitEvent({ agent, message, type }) {
  const event = {
    agent: agent || 'SusanIA',
    message: message || 'Señal recibida',
    timestamp: new Date().toLocaleTimeString('es-VE'),
    type: type || 'info',
  };
  lastEventAt = new Date().toISOString();
  io.emit('agent_event', event);
  return event;
}

async function runCommand(command) {
  try {
    const { stdout, stderr } = await execAsync(command, { timeout: 10000, maxBuffer: 1024 * 1024 });
    return { ok: true, stdout: stdout.trim(), stderr: stderr.trim() };
  } catch (error) {
    return {
      ok: false,
      stdout: error.stdout?.trim?.() || '',
      stderr: error.stderr?.trim?.() || error.message,
    };
  }
}

function getMemorySnapshot() {
  const total = os.totalmem();
  const free = os.freemem();
  const used = total - free;
  return {
    totalGb: +(total / 1024 / 1024 / 1024).toFixed(2),
    usedGb: +(used / 1024 / 1024 / 1024).toFixed(2),
    freeGb: +(free / 1024 / 1024 / 1024).toFixed(2),
    usedPercent: +((used / total) * 100).toFixed(1),
  };
}

async function getDiskSnapshot() {
  const disk = await runCommand(`df -h / | tail -1 | awk '{print $2"\\t"$3"\\t"$4"\\t"$5}'`);
  if (!disk.ok || !disk.stdout) {
    return { total: 'unknown', used: 'unknown', free: 'unknown', usedPercent: 'unknown' };
  }
  const [total, used, free, usedPercent] = disk.stdout.split('\t');
  return { total, used, free, usedPercent };
}

async function getPm2Apps() {
  const pm2 = await runCommand('pm2 jlist');
  if (!pm2.ok || !pm2.stdout) return [];
  try {
    const list = JSON.parse(pm2.stdout);
    return list.map(app => ({
      name: app.name,
      status: app.pm2_env?.status || 'unknown',
      cpu: app.monit?.cpu ?? null,
      memoryMb: app.monit?.memory ? +(app.monit.memory / 1024 / 1024).toFixed(1) : null,
    }));
  } catch {
    return [];
  }
}

async function getOpenClawStatus() {
  const status = await runCommand('openclaw status');
  return {
    ok: status.ok,
    summary: status.ok ? (status.stdout.split('\n').slice(0, 12).join('\n') || 'openclaw status ok') : 'openclaw status unavailable',
  };
}

async function buildOpsSnapshot() {
  const [disk, pm2Apps, openclawStatus] = await Promise.all([getDiskSnapshot(), getPm2Apps(), getOpenClawStatus()]);

  const openGravity = pm2Apps.find(app => app.name === 'opengravity') || null;

  return {
    host: os.hostname(),
    platform: `${os.platform()} ${os.arch()}`,
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(os.uptime()),
    loadAverage: os.loadavg().map(n => +n.toFixed(2)),
    memory: getMemorySnapshot(),
    disk,
    pm2Apps,
    services: {
      openGravity: openGravity
        ? {
            status: openGravity.status,
            cpu: openGravity.cpu,
            memoryMb: openGravity.memoryMb,
          }
        : { status: 'not-found', cpu: null, memoryMb: null },
      openClaw: openclawStatus,
      bridge: {
        status: 'online',
        connections: io.engine.clientsCount,
      },
    },
    timestamp: new Date().toISOString(),
  };
}

app.post('/webhook/susan', (req, res) => {
  const event = emitEvent(req.body || {});
  console.log(`[BROADCAST] ${event.agent}: ${event.message}`);
  res.status(200).json({ status: 'Broadcast Emitido', event });
});

app.post('/webhook/openclaw', (req, res) => {
  const { agent, message, type, text } = req.body || {};
  const event = emitEvent({
    agent: agent || 'OpenClaw',
    message: message || text || 'OpenClaw event received',
    type: type || 'info',
  });
  console.log(`[OPENCLAW] ${event.agent}: ${event.message}`);
  res.status(200).json({ status: 'Broadcast Emitido', event });
});

app.get('/status', async (_req, res) => {
  const ops = await buildOpsSnapshot();
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    connections: io.engine.clientsCount,
    lastEventAt,
    ops,
  });
});

app.get('/ops/status', async (_req, res) => {
  const ops = await buildOpsSnapshot();
  res.json({ status: 'ok', ops });
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    connections: io.engine.clientsCount,
  });
});

server.listen(PORT, BIND_HOST, () => {
  console.log(`[SUSANIA BRIDGE] Activo en http://${PUBLIC_BRIDGE_HOST}:${PORT} (bind ${BIND_HOST})`);
});
