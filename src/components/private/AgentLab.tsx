import React, { useEffect, useRef, useState } from 'react';
import { Bot, Database, RefreshCw, Send, Share2, TerminalSquare, FlaskConical } from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';

const TYPE_COLORS: Record<string, string> = {
  info: 'text-primary',
  success: 'text-secondary',
  warning: 'text-yellow-400',
  error: 'text-danger',
};

const AgentLab: React.FC = () => {
  const { logs, isConnected, bridgeStatus, bridgeUrl, bridgeError, emitTestEvent, refreshStatus } = useSusanBridge();
  const logEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('Mission Control test event');
  const [type, setType] = useState<'info' | 'success' | 'warning' | 'error'>('info');
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const agents = [
    { name: 'OpenClaw', status: 'active', meta: 'Personal orchestration layer', icon: Share2, accent: 'text-primary' },
    { name: 'OpenGravity', status: 'active', meta: 'Bot / API agent layer', icon: Bot, accent: 'text-secondary' },
    { name: 'Susan Bridge', status: isConnected ? 'online' : 'offline', meta: `${bridgeStatus.connections} socket clients`, icon: Database, accent: isConnected ? 'text-primary' : 'text-outline' },
  ];

  const sendTest = async () => {
    if (!message.trim()) return;
    setSending(true);
    setFeedback(null);
    try {
      await emitTestEvent({ agent: 'Mission Control', message: message.trim(), type });
      setFeedback('Evento de prueba emitido correctamente.');
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : 'No pude emitir el evento.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
        <FlaskConical size={14} /> Agent Runtime
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-7 surface-panel rounded-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">
              <Bot size={16} /> Active Agents
            </h3>
            <span className="font-label text-[10px] text-outline uppercase tracking-widest">Instance Count: {agents.length.toString().padStart(2, '0')}</span>
          </div>

          <div className="space-y-4">
            {agents.map(agent => {
              const Icon = agent.icon;
              return (
                <div key={agent.name} className="group flex items-center justify-between p-4 bg-surface hover:bg-surface-highest transition-all duration-300 cursor-pointer rounded-sm border border-outline-variant/5">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 flex items-center justify-center bg-surface-highest rounded-sm ${agent.accent}`}>
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-headline font-bold text-on-surface">{agent.name}</p>
                      <p className="text-xs font-label text-outline uppercase tracking-wider">{agent.meta}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest ${agent.status === 'offline' ? 'bg-surface-highest text-outline' : 'bg-primary/10 text-primary'}`}>
                      {agent.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="xl:col-span-5 surface-panel rounded-sm p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">
              <Database size={16} /> Health Diagnostics
            </h3>
            <button onClick={() => refreshStatus()} className="text-outline hover:text-primary transition-colors">
              <RefreshCw size={15} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface p-4 rounded-sm border border-outline-variant/5">
              <p className="text-[10px] font-label text-outline uppercase tracking-widest mb-1">Socket Status</p>
              <p className={`text-lg font-bold font-headline ${isConnected ? 'text-primary' : 'text-danger'}`}>{isConnected ? 'ESTABLISHED' : 'OFFLINE'}</p>
            </div>
            <div className="bg-surface p-4 rounded-sm border border-outline-variant/5">
              <p className="text-[10px] font-label text-outline uppercase tracking-widest mb-1">Connections</p>
              <p className="text-lg font-bold font-headline text-white">{bridgeStatus.connections}</p>
            </div>
          </div>

          <div className="bg-surface p-4 rounded-sm border border-outline-variant/5">
            <p className="text-[10px] font-label text-outline uppercase tracking-widest mb-2">Bridge URL</p>
            <code className="text-xs text-primary font-label break-all">{bridgeUrl}</code>
            {bridgeError && <p className="text-[10px] text-danger mt-2">{bridgeError}</p>}
          </div>
        </section>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <section className="xl:col-span-4 surface-panel rounded-sm p-6">
          <h3 className="font-headline font-bold text-primary mb-6 flex items-center gap-2">
            <FlaskConical size={16} /> Bridge Tester
          </h3>

          <div className="space-y-6">
            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">Event Type</label>
              <div className="grid grid-cols-2 gap-2">
                {(['info', 'success', 'warning', 'error'] as const).map(item => (
                  <button
                    key={item}
                    onClick={() => setType(item)}
                    className={`px-3 py-2 rounded-sm text-[10px] font-label uppercase tracking-widest transition-all border ${
                      type === item ? 'border-primary text-primary bg-primary/5' : 'border-outline-variant/20 text-outline hover:border-primary/30'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-label text-[10px] uppercase tracking-widest text-outline block mb-2">Payload Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="w-full h-36 bg-surface-highest border-none text-on-surface font-label text-xs focus:ring-1 focus:ring-primary p-3 rounded-sm resize-none"
                placeholder='{"action":"trigger_recalibration"}'
              />
            </div>

            <button onClick={sendTest} disabled={sending} className="w-full primary-button !justify-center !py-4 disabled:opacity-50">
              <Send size={14} /> {sending ? 'Emitting...' : 'Emit Test Event'}
            </button>

            {feedback && <p className="text-[11px] font-label text-outline">{feedback}</p>}
          </div>
        </section>

        <section className="xl:col-span-8 bg-surface-lowest rounded-sm p-6 shadow-inner min-h-[420px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-bold text-primary flex items-center gap-2">
              <TerminalSquare size={16} /> Live Console Stream
            </h3>
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-primary animate-pulse' : 'bg-outline'}`} />
              <span className="text-[10px] font-label text-outline uppercase tracking-widest">{isConnected ? 'Streaming' : 'Idle'}</span>
            </div>
          </div>

          <div className="flex-1 bg-black/30 p-4 font-label text-[11px] leading-relaxed overflow-y-auto border-t border-outline-variant/5 space-y-2 custom-scrollbar rounded-sm">
            {logs.length === 0 ? (
              <div className="text-outline text-center mt-12 space-y-2">
                <TerminalSquare size={28} className="mx-auto opacity-30" />
                <p>Sin eventos — usa el tester o espera señales del bridge.</p>
              </div>
            ) : (
              logs.map((log, i) => (
                <div key={`${log.timestamp}-${i}`} className="flex gap-4 border-b border-outline-variant/5 pb-2 last:border-b-0">
                  <span className="text-outline shrink-0">[{log.timestamp}]</span>
                  <span className={`${TYPE_COLORS[log.type] ?? 'text-primary'} shrink-0`}>[{log.agent}]</span>
                  <span className="text-on-surface break-all">{log.message}</span>
                </div>
              ))
            )}
            <div ref={logEndRef} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AgentLab;
