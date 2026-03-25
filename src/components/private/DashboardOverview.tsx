import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  LayoutDashboard,
  Server,
  Users,
  Wifi,
  WifiOff,
  Zap,
} from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';

const formatTime = (d: Date) =>
  d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const formatUptime = (seconds: number) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
};

const DashboardOverview: React.FC = () => {
  const { logs, isConnected, bridgeStatus, opsStatus, bridgeError, bridgeUrl, eventSummary } = useSusanBridge();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const last5 = logs.slice(0, 5);

  const typeColor: Record<string, string> = {
    info: 'text-primary',
    success: 'text-secondary',
    warning: 'text-yellow-400',
    error: 'text-danger',
  };

  const typeDot: Record<string, string> = {
    info: 'bg-primary',
    success: 'bg-secondary',
    warning: 'bg-yellow-400',
    error: 'bg-danger',
  };

  const statCards = [
    {
      label: 'Bridge Status',
      value: isConnected ? 'ONLINE' : 'OFFLINE',
      note: bridgeError || 'Socket + status endpoint monitorizados',
      icon: isConnected ? Wifi : WifiOff,
      valueClass: isConnected ? 'text-primary' : 'text-danger',
      iconClass: isConnected ? 'text-primary' : 'text-danger',
    },
    {
      label: 'Active Connections',
      value: String(bridgeStatus.connections),
      note: 'Clientes activos conectados al bridge',
      icon: Users,
      valueClass: 'text-white',
      iconClass: 'text-primary',
    },
    {
      label: 'Bridge Uptime',
      value: formatUptime(bridgeStatus.uptime),
      note: 'Tiempo del proceso bridge activo',
      icon: Clock,
      valueClass: 'text-secondary',
      iconClass: 'text-secondary',
    },
    {
      label: 'Events Count',
      value: String(logs.length),
      note: 'Buffer local de eventos recibidos',
      icon: Zap,
      valueClass: 'text-white',
      iconClass: 'text-primary',
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-panel rounded-xl ghost-border p-6 md:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 ambient-cyan"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-sm bg-surface-highest flex items-center justify-center text-primary">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-primary mb-1">Operational Status: Nominal</p>
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold tracking-tight text-white">Welcome back, Carlos</h2>
            <p className="text-sm text-outline mt-1">Mission Control · Susan executive runtime · private command layer</p>
          </div>
        </div>
        <div className="text-left lg:text-right">
          <p className="font-label text-2xl md:text-3xl font-bold text-primary tracking-tight">{formatTime(now)}</p>
          <p className="font-label text-[10px] uppercase tracking-[0.18em] text-outline mt-1">{formatDate(now)}</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + index * 0.05 }}
              className="surface-panel rounded-sm p-5 hover:bg-surface-container transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">{card.label}</span>
                <Icon size={15} className={card.iconClass} />
              </div>
              <p className={`font-label text-2xl md:text-3xl font-bold tracking-tight ${card.valueClass}`}>{card.value}</p>
              <p className="mt-2 text-[11px] text-outline leading-relaxed">{card.note}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="surface-panel rounded-sm p-5">
          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-3">Host</div>
          <div className="font-headline text-xl font-bold text-white">{opsStatus.host}</div>
          <div className="text-[11px] text-outline mt-2">{opsStatus.platform}</div>
        </div>
        <div className="surface-panel rounded-sm p-5">
          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-3">Memory</div>
          <div className="font-headline text-xl font-bold text-white">{opsStatus.memory.usedPercent}%</div>
          <div className="text-[11px] text-outline mt-2">{opsStatus.memory.usedGb} GB / {opsStatus.memory.totalGb} GB</div>
        </div>
        <div className="surface-panel rounded-sm p-5">
          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-3">Disk</div>
          <div className="font-headline text-xl font-bold text-white">{opsStatus.disk.usedPercent}</div>
          <div className="text-[11px] text-outline mt-2">{opsStatus.disk.used} used · {opsStatus.disk.free} free</div>
        </div>
        <div className="surface-panel rounded-sm p-5">
          <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-3">Services</div>
          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between"><span className="text-outline">OpenGravity</span><span className="text-white">{opsStatus.services.openGravity.status}</span></div>
            <div className="flex justify-between"><span className="text-outline">OpenClaw</span><span className={opsStatus.services.openClaw.ok ? 'text-primary' : 'text-danger'}>{opsStatus.services.openClaw.ok ? 'ok' : 'warn'}</span></div>
            <div className="flex justify-between"><span className="text-outline">PM2 apps</span><span className="text-white">{opsStatus.pm2Apps.length}</span></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="xl:col-span-7 surface-panel rounded-sm p-6 md:p-8"
        >
          <div className="flex justify-between items-start mb-10">
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight text-white">Bridge Intel</h3>
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mt-1">Real-time telemetry streams</p>
            </div>
            <div className="text-left md:text-right">
              <p className="font-label text-[10px] uppercase tracking-widest text-outline">Last Sync</p>
              <p className="font-label text-xs text-primary mt-1">{bridgeStatus.lastEventAt || 'No event yet'}</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-4 gap-4">
              {[
                ['INFO', eventSummary.info, 'bg-primary', '85%'],
                ['SUCCESS', eventSummary.success, 'bg-secondary', '68%'],
                ['WARNING', eventSummary.warning, 'bg-yellow-400', '20%'],
                ['ERROR', eventSummary.error, 'bg-danger', '8%'],
              ].map(([label, value, barClass, width]) => (
                <div key={label} className="text-center">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-2">{label}</p>
                  <div className="h-1 bg-surface-highest w-full rounded-full overflow-hidden">
                    <div className={`${barClass} h-full`} style={{ width: value === 0 ? '2%' : width }} />
                  </div>
                  <p className="font-label text-xs mt-3 text-white">{value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-sm bg-surface-lowest overflow-hidden relative min-h-[240px] p-6 flex flex-col justify-between">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(195,245,255,0.06)_0%,_transparent_70%)]" />
              <div className="relative z-10 flex items-center justify-between gap-4">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-2">Bridge Runtime</p>
                  <h4 className="font-headline text-2xl font-bold text-white">Telemetry Streams</h4>
                </div>
                <Server size={28} className="text-primary" />
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-4 max-w-md">
                <div className="surface-elevated px-4 py-3 rounded-sm">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Status</p>
                  <p className={bridgeStatus.status === 'ok' ? 'text-primary font-label text-sm' : 'text-danger font-label text-sm'}>{bridgeStatus.status.toUpperCase()}</p>
                </div>
                <div className="surface-elevated px-4 py-3 rounded-sm">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Connections</p>
                  <p className="text-white font-label text-sm">{bridgeStatus.connections}</p>
                </div>
                <div className="surface-elevated px-4 py-3 rounded-sm col-span-2">
                  <p className="font-label text-[10px] uppercase tracking-widest text-outline mb-1">Bridge URL</p>
                  <p className="text-white font-label text-xs break-all">{bridgeUrl}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="xl:col-span-5 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="surface-panel rounded-sm p-6"
          >
            <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {['Run Test Signal', 'Open Agent Lab', 'Refresh Preview'].map((action, idx) => (
                <button
                  key={action}
                  className={`w-full py-3 px-4 rounded-sm text-left flex items-center justify-between font-label text-[10px] uppercase tracking-[0.18em] transition-all ${
                    idx === 0
                      ? 'bg-surface-highest text-primary hover:bg-primary hover:text-[#00363d]'
                      : idx === 1
                        ? 'bg-surface-highest text-secondary hover:bg-secondary hover:text-[#20005f]'
                        : 'bg-surface-highest text-outline hover:bg-surface-container hover:text-white'
                  }`}
                >
                  {action}
                  <Zap size={13} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="surface-panel rounded-sm p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <Activity size={14} className="text-primary" />
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Last 5 Events</span>
            </div>

            {last5.length === 0 ? (
              <p className="text-xs font-label text-outline py-4">No events yet — waiting for bridge signals…</p>
            ) : (
              <ul className="space-y-4">
                {last5.map((log, i) => (
                  <motion.li key={`${log.timestamp}-${i}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }} className="flex gap-3 pb-3 border-b border-outline-variant/5 last:border-b-0 last:pb-0">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 ${typeDot[log.type] ?? 'bg-primary'}`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-headline font-semibold text-white">{log.message}</p>
                      <p className={`text-[10px] font-label uppercase tracking-widest mt-1 ${typeColor[log.type] ?? 'text-primary'}`}>
                        {log.timestamp} · {log.agent}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`rounded-sm p-4 border ${bridgeStatus.status === 'ok' ? 'border-primary/20 bg-primary/5 text-primary' : 'border-danger/20 bg-danger/5 text-danger'}`}
          >
            <div className="flex items-start gap-2 text-sm">
              {bridgeStatus.status === 'ok' ? <CheckCircle2 size={15} className="mt-0.5" /> : <AlertTriangle size={15} className="mt-0.5" />}
              <span className="leading-relaxed">
                {bridgeStatus.status === 'ok'
                  ? 'El bridge responde al endpoint /status y al socket.'
                  : 'Hay degradación o falta de conectividad con el bridge.'}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
