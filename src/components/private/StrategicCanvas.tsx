import React from 'react';
import { Bot, Database, Network, Server, Share2, Zap } from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';

const StrategicCanvas: React.FC = () => {
  const { opsStatus } = useSusanBridge();

  const nodes = [
    { id: 'susan', name: 'Susan Core', type: 'core', icon: Zap, accent: 'text-primary', desc: 'Orquesta el sistema y la capa ejecutiva.' },
    { id: 'openclaw', name: 'OpenClaw', type: 'agent', icon: Share2, accent: opsStatus.services.openClaw.ok ? 'text-primary' : 'text-danger', desc: 'Capa de orquestación personal y skills.' },
    { id: 'opengravity', name: 'OpenGravity', type: 'agent', icon: Bot, accent: opsStatus.services.openGravity.status === 'online' ? 'text-secondary' : 'text-outline', desc: 'Bot/API agent layer complementaria.' },
    { id: 'bridge', name: 'Susan Bridge', type: 'service', icon: Network, accent: 'text-primary', desc: `Conexiones activas: ${opsStatus.services.bridge.connections}` },
    { id: 'vps', name: 'Oracle VPS', type: 'resource', icon: Server, accent: 'text-white', desc: `${opsStatus.host} · load ${opsStatus.loadAverage.join(' / ')}` },
    { id: 'memory', name: 'Knowledge / Memory', type: 'resource', icon: Database, accent: 'text-secondary', desc: 'Notas, proyectos, decisiones y contexto operativo.' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
        <Network size={14} /> Strategic Canvas
      </div>

      <div className="surface-panel rounded-sm p-6 md:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div className="relative bg-surface-lowest rounded-sm p-8 min-h-[560px] overflow-hidden ghost-border">
            <div className="absolute inset-0 grid-faint opacity-40" />

            <div className="relative z-10 h-full min-h-[500px]">
              <div className="absolute left-1/2 top-[14%] -translate-x-1/2 w-[240px]">
                <div className="surface-elevated rounded-sm p-4 text-center border border-primary/20">
                  <Zap size={18} className="mx-auto text-primary mb-2" />
                  <div className="font-headline text-lg font-bold text-white">Susan Core</div>
                  <div className="text-[11px] text-outline mt-1">Executive intelligence and command logic</div>
                </div>
              </div>

              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line x1="50%" y1="22%" x2="25%" y2="42%" stroke="rgba(195,245,255,0.18)" strokeDasharray="4 4" />
                <line x1="50%" y1="22%" x2="75%" y2="42%" stroke="rgba(195,245,255,0.18)" strokeDasharray="4 4" />
                <line x1="50%" y1="22%" x2="50%" y2="42%" stroke="rgba(205,189,255,0.18)" strokeDasharray="4 4" />
                <line x1="25%" y1="48%" x2="22%" y2="76%" stroke="rgba(195,245,255,0.16)" strokeDasharray="4 4" />
                <line x1="50%" y1="48%" x2="50%" y2="76%" stroke="rgba(205,189,255,0.16)" strokeDasharray="4 4" />
                <line x1="75%" y1="48%" x2="78%" y2="76%" stroke="rgba(195,245,255,0.16)" strokeDasharray="4 4" />
              </svg>

              <div className="absolute left-[10%] top-[36%] w-[220px] surface-panel rounded-sm p-4">
                <Share2 size={16} className={opsStatus.services.openClaw.ok ? 'text-primary mb-2' : 'text-danger mb-2'} />
                <div className="font-headline font-bold text-white">OpenClaw</div>
                <div className="text-[11px] text-outline mt-1">{opsStatus.services.openClaw.ok ? 'Responding to status checks' : 'Needs attention'}</div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 top-[36%] w-[220px] surface-panel rounded-sm p-4">
                <Network size={16} className="text-primary mb-2" />
                <div className="font-headline font-bold text-white">Susan Bridge</div>
                <div className="text-[11px] text-outline mt-1">{opsStatus.services.bridge.connections} active client connections</div>
              </div>

              <div className="absolute right-[10%] top-[36%] w-[220px] surface-panel rounded-sm p-4">
                <Bot size={16} className={opsStatus.services.openGravity.status === 'online' ? 'text-secondary mb-2' : 'text-outline mb-2'} />
                <div className="font-headline font-bold text-white">OpenGravity</div>
                <div className="text-[11px] text-outline mt-1">Status: {opsStatus.services.openGravity.status}</div>
              </div>

              <div className="absolute left-[8%] bottom-[8%] w-[220px] surface-panel rounded-sm p-4">
                <Server size={16} className="text-white mb-2" />
                <div className="font-headline font-bold text-white">Oracle VPS</div>
                <div className="text-[11px] text-outline mt-1">{opsStatus.host} · load {opsStatus.loadAverage.join(' / ')}</div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[220px] surface-panel rounded-sm p-4">
                <Database size={16} className="text-secondary mb-2" />
                <div className="font-headline font-bold text-white">Knowledge / Memory</div>
                <div className="text-[11px] text-outline mt-1">Projects, notes, decisions and long-term context</div>
              </div>

              <div className="absolute right-[8%] bottom-[8%] w-[220px] surface-panel rounded-sm p-4">
                <Network size={16} className="text-primary mb-2" />
                <div className="font-headline font-bold text-white">External UX Feed</div>
                <div className="text-[11px] text-outline mt-1">Stitch exploration → internal implementation pipeline</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="label-kicker mb-4 block">Operational Topology</span>
              <h2 className="section-title mb-4">System Relationships</h2>
              <p className="text-outline leading-relaxed">No es un canvas bonito sin función. Es el mapa de cómo Mission Control se apoya en runtime, bridge, agentes y memoria para funcionar como sistema privado real.</p>
            </div>

            {nodes.map(node => {
              const Icon = node.icon;
              return (
                <div key={node.id} className="surface-panel rounded-sm p-4 flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-sm bg-surface-highest flex items-center justify-center ${node.accent}`}><Icon size={16} /></div>
                  <div>
                    <div className="font-headline font-bold text-white">{node.name}</div>
                    <div className="text-[10px] font-label uppercase tracking-widest text-outline mt-1">{node.type}</div>
                    <p className="text-sm text-outline mt-2 leading-relaxed">{node.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicCanvas;
