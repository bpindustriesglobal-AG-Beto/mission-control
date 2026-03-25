import React, { useMemo, useState } from 'react';
import { BookOpen, FileText, Filter, Pin, Search, Tag } from 'lucide-react';

interface DocEntry {
  title: string;
  tags: string[];
  date: string;
  desc: string;
  category: string;
  author: string;
}

const DOCS: DocEntry[] = [
  { title: 'SUSANIA_MASTER_BLUEPRINT v1.0', tags: ['arquitectura', 'infraestructura'], date: 'Mar 2026', category: 'Projects', author: 'Susan', desc: 'Documento maestro de arquitectura completo. Topología Tailscale, bridge Node.js, componentes frontend.' },
  { title: 'Protocolo Tailscale Mesh', tags: ['red', 'seguridad', 'vpn'], date: 'Mar 2026', category: 'Operations', author: 'Susan', desc: 'Configuración de red zero-trust entre vnic-beto, cb-zephyrus e iPhone. IPs y rutas.' },
  { title: 'OpenClaw — Guía de Comandos', tags: ['agentes', 'telegram', 'bot'], date: 'Mar 2026', category: 'Operations', author: 'Susan', desc: 'Comandos disponibles, gateway puerto 18789, integración con SusanIA bot.' },
  { title: 'OpenGravity — Arquitectura', tags: ['agentes', 'firebase', 'node'], date: 'Mar 2026', category: 'Research', author: 'Susan', desc: 'Agente IA personal. TypeScript/Node.js, PM2, Firebase, API puerto 3000.' },
  { title: 'Guía Skills Claude (Anthropic)', tags: ['claude', 'skills', 'mcp'], date: 'Mar 2026', category: 'Research', author: 'Susan', desc: 'Patrones de diseño, categorías, métricas de éxito y troubleshooting de skills.' },
  { title: 'Mission Control — Consolidation Notes', tags: ['mission-control', 'frontend', 'stitch'], date: 'Mar 2026', category: 'System Decisions', author: 'Susan', desc: 'Consolidación del proyecto moderno en susania-platform como fuente de verdad.' },
];

const CATEGORIES = ['Projects', 'Research', 'Operations', 'Trading', 'Ideas for Future', 'System Decisions'];

const KnowledgeBaseTab: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(DOCS.flatMap(d => d.tags)));

  const filtered = useMemo(() => {
    return DOCS.filter(d => {
      const q = search.toLowerCase();
      const matchSearch = search === '' || d.title.toLowerCase().includes(q) || d.desc.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
      const matchTag = activeTag === null || d.tags.includes(activeTag);
      return matchSearch && matchTag;
    });
  }, [search, activeTag]);

  const pinned = filtered.slice(0, 2);

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-outline-variant/10 pb-8">
        <div>
          <span className="label-kicker mb-4 block">Central Intelligence Repository</span>
          <h2 className="section-title">Knowledge Base</h2>
          <p className="text-outline mt-3 max-w-2xl">Notas, decisiones, investigación, operaciones y referencias estratégicas consolidadas en un solo repositorio operativo.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="secondary-button !py-2.5"><Filter size={14} /> Filter by Tag</button>
          <button className="primary-button !py-2.5"><BookOpen size={14} /> Create Note</button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 space-y-6">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="text"
              placeholder="Search knowledge base..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-surface-lowest border border-outline-variant/10 rounded-sm pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-outline/40 focus:outline-none focus:border-primary/40"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map(category => (
              <button key={category} className="surface-panel rounded-sm p-6 text-left hover:bg-surface-container transition-colors">
                <div className="text-primary mb-4"><FileText size={18} /></div>
                <h3 className="font-headline text-lg font-bold text-white">{category}</h3>
                <p className="text-[11px] text-outline mt-1 font-label uppercase tracking-widest">{DOCS.filter(d => d.category === category).length} entries</p>
              </button>
            ))}
          </div>

          <div>
            <div className="flex gap-2 flex-wrap mb-4">
              <button onClick={() => setActiveTag(null)} className={`px-3 py-2 rounded-sm text-[10px] font-label uppercase tracking-widest transition-all ${activeTag === null ? 'bg-primary/15 text-primary' : 'bg-surface-highest text-outline hover:text-white'}`}>All</button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`px-3 py-2 rounded-sm text-[10px] font-label uppercase tracking-widest transition-all flex items-center gap-1 ${activeTag === tag ? 'bg-secondary/15 text-secondary' : 'bg-surface-highest text-outline hover:text-white'}`}
                >
                  <Tag size={10} /> {tag}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-sm bg-surface-low/30 ghost-border">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/10">
                    <th className="px-5 py-4 font-label text-[10px] uppercase tracking-[0.18em] text-outline">Title</th>
                    <th className="px-5 py-4 font-label text-[10px] uppercase tracking-[0.18em] text-outline hidden md:table-cell">Category</th>
                    <th className="px-5 py-4 font-label text-[10px] uppercase tracking-[0.18em] text-outline hidden lg:table-cell">Author</th>
                    <th className="px-5 py-4 font-label text-[10px] uppercase tracking-[0.18em] text-outline hidden lg:table-cell">Tags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  {filtered.map((doc, i) => (
                    <tr key={i} className="hover:bg-surface-lowest/50 transition-colors group">
                      <td className="px-5 py-5">
                        <div className="flex items-start gap-3">
                          <FileText size={16} className="text-outline group-hover:text-primary mt-0.5 transition-colors" />
                          <div>
                            <div className="text-sm font-headline font-semibold text-white">{doc.title}</div>
                            <p className="text-xs text-outline mt-1 leading-relaxed">{doc.desc}</p>
                            <span className="text-[10px] font-label uppercase tracking-widest text-outline mt-2 block md:hidden">{doc.category} · {doc.date}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 hidden md:table-cell"><span className="text-xs text-outline bg-surface-highest/70 px-2 py-1 rounded-sm font-label uppercase tracking-wider">{doc.category}</span></td>
                      <td className="px-5 py-5 hidden lg:table-cell text-sm text-white">{doc.author}</td>
                      <td className="px-5 py-5 hidden lg:table-cell">
                        <div className="flex gap-1 flex-wrap">
                          {doc.tags.map(tag => (
                            <span key={tag} className="text-[9px] uppercase tracking-tighter text-outline px-1.5 py-0.5 border border-outline-variant/20 rounded-sm">{tag}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Pinned Entries</h3>
              <Pin size={13} className="text-outline" />
            </div>
            <div className="space-y-4">
              {pinned.map((doc, i) => (
                <div key={i} className={`bg-surface-lowest p-4 rounded-sm relative ${i === 0 ? 'border-l border-primary' : 'ghost-border'}`}>
                  <h4 className="font-headline font-bold text-sm text-white mb-1">{doc.title}</h4>
                  <p className="text-[11px] text-outline leading-relaxed">{doc.desc}</p>
                  <div className="mt-3 text-[10px] font-label uppercase tracking-widest text-primary/70">{doc.category}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="surface-panel rounded-sm p-5">
            <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline mb-4">Knowledge Pulse</div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-outline">Entries visible</span><strong className="text-white">{filtered.length}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Pinned</span><strong className="text-white">{pinned.length}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Tag filter</span><strong className="text-white">{activeTag || 'none'}</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseTab;
