import React, { useMemo, useState } from 'react';
import { ExternalLink, Newspaper, RefreshCw, Sparkles } from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';

interface NewsItem {
  provider: string;
  title: string;
  summary: string;
  impact: 'High' | 'Medium' | 'Low';
  date: string;
  topic: string;
  url?: string;
}

const INITIAL_NEWS: NewsItem[] = [
  { provider: 'Anthropic', title: 'Claude 4 — Nuevas capacidades de agentes', summary: 'Claude 4 introduce mejoras significativas en razonamiento y ejecución de tareas multi-paso.', impact: 'High', date: 'Mar 2026', topic: 'Agents' },
  { provider: 'OpenAI', title: 'GPT-5 disponible para Enterprise', summary: 'GPT-5 lanzado para clientes enterprise con contexto extendido de 1M tokens.', impact: 'High', date: 'Mar 2026', topic: 'Infrastructure' },
  { provider: 'DeepSeek', title: 'DeepSeek V3 — Optimización de inferencia', summary: 'Nuevo modelo con reducción del 40% en costo de inferencia manteniendo benchmark parity.', impact: 'Medium', date: 'Feb 2026', topic: 'Cost' },
  { provider: 'Google', title: 'Gemini 2.0 Ultra — Multimodal nativo', summary: 'Integración nativa de audio, video e imagen en tiempo real con latencia sub-200ms.', impact: 'High', date: 'Feb 2026', topic: 'Multimodal' },
  { provider: 'Meta', title: 'Llama 4 — Open source con 400B parámetros', summary: 'Meta lanza Llama 4 con arquitectura MoE, disponible para uso comercial sin restricciones.', impact: 'Medium', date: 'Ene 2026', topic: 'Open Source' },
  { provider: 'Mistral', title: 'Mixtral 8x22B — Código especializado', summary: 'Nuevo modelo MoE especializado en generación y debugging de código con 94% en HumanEval.', impact: 'Low', date: 'Ene 2026', topic: 'Code' },
];

const IMPACT_STYLES: Record<string, string> = {
  High: 'bg-danger/10 text-danger',
  Medium: 'bg-yellow-500/10 text-yellow-400',
  Low: 'bg-secondary/10 text-secondary',
};

const AINewsDashboard: React.FC = () => {
  const { opsStatus } = useSusanBridge();
  const [filter, setFilter] = useState<string>('All');
  const providers = ['All', ...Array.from(new Set(INITIAL_NEWS.map(n => n.provider)))];
  const filtered = useMemo(() => (filter === 'All' ? INITIAL_NEWS : INITIAL_NEWS.filter(n => n.provider === filter)), [filter]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
        <Newspaper size={14} /> AI News
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {providers.map(p => (
              <button key={p} onClick={() => setFilter(p)} className={`px-3 py-2 rounded-sm text-[10px] font-label uppercase tracking-widest transition-all ${filter === p ? 'bg-primary/15 text-primary' : 'bg-surface-highest text-outline hover:text-white'}`}>
                {p}
              </button>
            ))}
            <button className="ml-auto secondary-button !py-2 !px-3"><RefreshCw size={14} /> Refresh</button>
          </div>

          {filtered.map((item, i) => (
            <div key={i} className="surface-panel rounded-sm p-5 hover:bg-surface-container transition-colors">
              <div className="flex justify-between items-center mb-3 gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-label uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-sm">{item.provider}</span>
                  <span className={`text-[10px] font-label uppercase tracking-widest px-2 py-1 rounded-sm ${IMPACT_STYLES[item.impact]}`}>{item.impact}</span>
                </div>
                <span className="text-[10px] text-outline font-label uppercase tracking-widest">{item.date}</span>
              </div>

              <h3 className="font-headline text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-outline leading-relaxed mb-4">{item.summary}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-label uppercase tracking-widest text-secondary">{item.topic}</span>
                {item.url && <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-outline hover:text-primary transition-colors"><ExternalLink size={14} /></a>}
              </div>
            </div>
          ))}
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center gap-2 text-xs font-label text-secondary uppercase tracking-[0.2em] mb-4">
              <Sparkles size={14} /> Briefing Context
            </div>
            <p className="text-sm text-outline leading-relaxed">Este panel sirve como intelligence layer. No es solo un feed; debe ayudar a decidir qué tendencias impactan Mission Control, agentes, infraestructura y costo.</p>
          </div>

          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em] mb-4">
              <Newspaper size={14} /> Ops Snapshot
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-outline">Host</span><strong className="text-white">{opsStatus.host}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">OpenGravity</span><strong className="text-white">{opsStatus.services.openGravity.status}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Load Avg</span><strong className="text-white">{opsStatus.loadAverage.join(' / ')}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Memory Used</span><strong className="text-white">{opsStatus.memory.usedPercent}%</strong></div>
            </div>
          </div>

          <div className="surface-panel rounded-sm p-5">
            <div className="text-xs font-label text-outline uppercase tracking-[0.2em] mb-4">Hot Topics</div>
            <div className="flex flex-wrap gap-2">
              {['#Agents', '#Infrastructure', '#Cost', '#Multimodal', '#OpenSource', '#BridgeOps'].map(topic => (
                <span key={topic} className="px-2 py-1 rounded-sm bg-surface-highest text-[10px] font-label uppercase tracking-widest text-outline">{topic}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AINewsDashboard;
