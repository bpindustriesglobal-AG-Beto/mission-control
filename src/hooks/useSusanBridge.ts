import { useCallback, useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : '';
const defaultBridgeUrl = runtimeHost === '127.0.0.1' || runtimeHost === 'localhost' ? 'http://127.0.0.1:8080' : 'http://100.97.56.83:8080';
const BRIDGE_URL = import.meta.env.VITE_BRIDGE_URL || defaultBridgeUrl;
const BRIDGE_TOKEN = import.meta.env.VITE_BRIDGE_TOKEN || 'BP_INDUSTRIES_SECURE_2026';

export interface AgentEvent {
  agent: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface BridgeStatus {
  status: 'ok' | 'offline';
  uptime: number;
  connections: number;
  lastEventAt: string | null;
}

export interface OpsStatus {
  host: string;
  platform: string;
  nodeVersion: string;
  uptimeSeconds: number;
  loadAverage: number[];
  memory: {
    totalGb: number;
    usedGb: number;
    freeGb: number;
    usedPercent: number;
  };
  disk: {
    total: string;
    used: string;
    free: string;
    usedPercent: string;
  };
  services: {
    openGravity: {
      status: string;
      cpu: number | null;
      memoryMb: number | null;
    };
    openClaw: {
      ok: boolean;
      summary: string;
    };
    bridge: {
      status: string;
      connections: number;
    };
  };
  pm2Apps: Array<{
    name: string;
    status: string;
    cpu: number | null;
    memoryMb: number | null;
  }>;
  timestamp: string;
}

const initialStatus: BridgeStatus = {
  status: 'offline',
  uptime: 0,
  connections: 0,
  lastEventAt: null,
};

const initialOpsStatus: OpsStatus = {
  host: 'unknown',
  platform: 'unknown',
  nodeVersion: 'unknown',
  uptimeSeconds: 0,
  loadAverage: [0, 0, 0],
  memory: { totalGb: 0, usedGb: 0, freeGb: 0, usedPercent: 0 },
  disk: { total: 'unknown', used: 'unknown', free: 'unknown', usedPercent: 'unknown' },
  services: {
    openGravity: { status: 'unknown', cpu: null, memoryMb: null },
    openClaw: { ok: false, summary: 'unknown' },
    bridge: { status: 'offline', connections: 0 },
  },
  pm2Apps: [],
  timestamp: '',
};

export const useSusanBridge = () => {
  const [logs, setLogs] = useState<AgentEvent[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [bridgeStatus, setBridgeStatus] = useState<BridgeStatus>(initialStatus);
  const [opsStatus, setOpsStatus] = useState<OpsStatus>(initialOpsStatus);
  const [bridgeError, setBridgeError] = useState<string | null>(null);

  useEffect(() => {
    const socket = io(BRIDGE_URL, {
      auth: { token: BRIDGE_TOKEN },
      reconnectionDelay: 3000,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      setIsConnected(true);
      setBridgeError(null);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('connect_error', error => {
      setIsConnected(false);
      setBridgeError(error.message || 'Bridge connection failed');
    });

    socket.on('agent_event', (data: AgentEvent) => {
      setLogs(prev => [data, ...prev].slice(0, 100));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const refreshStatus = useCallback(async () => {
    try {
      const res = await fetch(`${BRIDGE_URL}/status`);
      if (!res.ok) throw new Error(`Status failed (${res.status})`);
      const data = await res.json();
      setBridgeStatus({
        status: data.status === 'ok' ? 'ok' : 'offline',
        uptime: Number(data.uptime) || 0,
        connections: Number(data.connections) || 0,
        lastEventAt: data.lastEventAt || null,
      });
      if (data.ops) setOpsStatus(data.ops);
      setBridgeError(null);
    } catch (error) {
      setBridgeStatus(initialStatus);
      setOpsStatus(initialOpsStatus);
      setBridgeError(error instanceof Error ? error.message : 'Bridge status unavailable');
    }
  }, []);

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 10000);
    return () => clearInterval(interval);
  }, [refreshStatus]);

  const emitTestEvent = useCallback(async (payload: Partial<AgentEvent> & { message: string }) => {
    const res = await fetch(`${BRIDGE_URL}/webhook/susan`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        agent: payload.agent || 'Mission Control',
        message: payload.message,
        type: payload.type || 'info',
      }),
    });

    if (!res.ok) throw new Error(`Webhook failed (${res.status})`);
    return res.json();
  }, []);

  const eventSummary = useMemo(() => {
    return logs.reduce(
      (acc, log) => {
        acc[log.type] += 1;
        return acc;
      },
      { info: 0, success: 0, warning: 0, error: 0 }
    );
  }, [logs]);

  return {
    logs,
    isConnected,
    bridgeStatus,
    opsStatus,
    bridgeError,
    bridgeUrl: BRIDGE_URL,
    eventSummary,
    refreshStatus,
    emitTestEvent,
  };
};
