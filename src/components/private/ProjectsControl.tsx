import React, { useMemo, useState } from 'react';
import { Archive, ArrowUpRight, CheckCircle2, Clock3, FolderKanban, Search, Star } from 'lucide-react';

type ProjectStatus = 'active' | 'paused' | 'archived';
type ProjectPriority = 'high' | 'medium' | 'low';

interface ProjectItem {
  id: string;
  name: string;
  category: string;
  priority: ProjectPriority;
  status: ProjectStatus;
  progress: number;
  note: string;
  nextStep: string;
}

const PROJECTS: ProjectItem[] = [
  { id: 'mission-control', name: 'Mission Control', category: 'dashboard', priority: 'high', status: 'active', progress: 56, note: 'Proyecto canónico consolidado en susania-platform.', nextStep: 'Fusionar lo mejor del UX actual con Stitch y seguir operativizando el bridge.' },
  { id: 'travel-europe', name: 'Viaje Europa 2026', category: 'travel', priority: 'high', status: 'active', progress: 30, note: 'Ruta Madrid + Lisboa/Fátima + Croacia + París definida. Visa en trámite.', nextStep: 'Esperar carta de EUDE y avanzar con Schengen.' },
  { id: 'polymarket-copybot', name: 'Polymarket Copy Bot', category: 'trading', priority: 'high', status: 'paused', progress: 18, note: 'Se eligió AgentKit como capa de wallet/orquestación.', nextStep: 'Crear CDP API key y fondear wallet antes de retomar desarrollo.' },
  { id: 'nano-banana', name: 'Nano Banana MCP', category: 'image-ai', priority: 'medium', status: 'paused', progress: 55, note: 'MCP funcional, bloqueado por cuota 0 en Google Cloud.', nextStep: 'Activar billing o cuota válida para Gemini Image.' },
  { id: 'blender-mcp', name: 'Blender MCP', category: '3d', priority: 'low', status: 'paused', progress: 12, note: 'Investigación hecha; depende de Blender corriendo en laptop.', nextStep: 'Activar Tailscale y definir flujo remoto.' },
  { id: 'moltlaunch', name: 'MoltLaunch Gigs', category: 'growth', priority: 'low', status: 'archived', progress: 8, note: 'Registrada onchain, sin gigs activos todavía.', nextStep: 'Completar perfil y publicar gigs cuando haya foco comercial.' },
];

const badgeStyles: Record<ProjectStatus, string> = {
  active: 'bg-primary/10 text-primary',
  paused: 'bg-yellow-500/10 text-yellow-400',
  archived: 'bg-surface-highest text-outline',
};

const priorityStyles: Record<ProjectPriority, string> = {
  high: 'text-danger',
  medium: 'text-yellow-400',
  low: 'text-primary',
};

const ProjectsControl: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<ProjectStatus | 'all'>('all');

  const filtered = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesQuery = query.trim() === '' || project.name.toLowerCase().includes(query.toLowerCase()) || project.note.toLowerCase().includes(query.toLowerCase()) || project.category.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = filter === 'all' || project.status === filter;
      return matchesQuery && matchesStatus;
    });
  }, [query, filter]);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
        <FolderKanban size={14} /> Project Control
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-3 items-center">
        <div className="relative">
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar proyecto, categoría o contexto..." className="w-full bg-surface-lowest border border-outline-variant/10 rounded-sm pl-10 pr-4 py-3.5 text-sm text-white placeholder:text-outline/40 focus:outline-none focus:border-primary/40" />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all', 'active', 'paused', 'archived'] as const).map(item => (
            <button key={item} onClick={() => setFilter(item)} className={`px-3 py-2 rounded-sm text-[10px] font-label uppercase tracking-widest transition-colors ${filter === item ? 'bg-primary/15 text-primary' : 'bg-surface-highest text-outline hover:text-white'}`}>
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 grid gap-4">
          {filtered.map(project => (
            <div key={project.id} className="surface-panel rounded-sm p-6 hover:bg-surface-container transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-headline text-xl font-bold text-white">{project.name}</h3>
                    <span className={`px-2.5 py-1 rounded-sm text-[10px] font-label uppercase tracking-widest ${badgeStyles[project.status]}`}>{project.status}</span>
                  </div>

                  <p className="text-xs text-outline font-label uppercase tracking-widest flex items-center gap-2">
                    <Star size={11} className={priorityStyles[project.priority]} /> priority: <span className={priorityStyles[project.priority]}>{project.priority}</span> · {project.category}
                  </p>

                  <p className="text-sm text-outline leading-relaxed">{project.note}</p>

                  <div>
                    <div className="flex items-center justify-between text-[10px] font-label text-outline uppercase tracking-widest mb-2">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-surface-highest overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                </div>

                <div className="md:w-[320px] bg-surface-lowest rounded-sm p-4 space-y-3 ghost-border">
                  <div className="text-[10px] font-label text-outline uppercase tracking-widest">Next Step</div>
                  <p className="text-sm text-white leading-relaxed">{project.nextStep}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button className="secondary-button !py-2 !px-3">Open Project</button>
                    <button className="secondary-button !py-2 !px-3">View Notes</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center gap-2 text-xs font-label text-secondary uppercase tracking-[0.2em] mb-4">
              <CheckCircle2 size={14} /> Portfolio Snapshot
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-outline">Activos</span><strong className="text-white">{PROJECTS.filter(p => p.status === 'active').length}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Pausados</span><strong className="text-white">{PROJECTS.filter(p => p.status === 'paused').length}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Archivados</span><strong className="text-white">{PROJECTS.filter(p => p.status === 'archived').length}</strong></div>
            </div>
          </div>

          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em] mb-4">
              <Clock3 size={14} /> Focus Now
            </div>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start gap-2"><ArrowUpRight size={14} className="mt-0.5 text-primary" /> Mission Control UI + ops integration</li>
              <li className="flex items-start gap-2"><ArrowUpRight size={14} className="mt-0.5 text-primary" /> Visa + logística viaje Europa</li>
              <li className="flex items-start gap-2"><ArrowUpRight size={14} className="mt-0.5 text-primary" /> Consolidar dirección visual con Stitch</li>
            </ul>
          </div>

          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center gap-2 text-xs font-label text-outline uppercase tracking-[0.2em] mb-4">
              <Archive size={14} /> Rule
            </div>
            <p className="text-sm text-outline leading-relaxed">Todo lo archivado debe quedar documentado, con fecha, contexto y siguiente paso claro. Nada se pierde, pero tampoco contamina el foco activo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsControl;
