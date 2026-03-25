import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Zap, Share2, Monitor,
  Newspaper, FlaskConical, BookOpen, LogOut, LayoutDashboard, RefreshCw, FolderKanban, SlidersHorizontal,
} from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';
import DashboardOverview from './DashboardOverview';
import StrategicCanvas from './StrategicCanvas';
import LivePreview from './LivePreview';
import AINewsDashboard from './AINewsDashboard';
import AgentLab from './AgentLab';
import KnowledgeBaseTab from './KnowledgeBaseTab';
import ProjectsControl from './ProjectsControl';
import SettingsControl from './SettingsControl';

type TabId = 'overview' | 'canvas' | 'preview' | 'news' | 'lab' | 'knowledge' | 'projects' | 'settings';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'canvas', label: 'Strategic Canvas', icon: Share2 },
  { id: 'preview', label: 'Live Preview', icon: Monitor },
  { id: 'news', label: 'AI News', icon: Newspaper },
  { id: 'lab', label: 'Agent Lab', icon: FlaskConical },
  { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
  { id: 'projects', label: 'Projects', icon: FolderKanban },
  { id: 'settings', label: 'Ops Settings', icon: SlidersHorizontal },
] as const;

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { logs, isConnected, bridgeStatus, refreshStatus } = useSusanBridge();

  const logout = () => {
    localStorage.removeItem('susan_2fa_token');
    window.location.href = '/login';
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'canvas':
        return <StrategicCanvas />;
      case 'preview':
        return <LivePreview />;
      case 'news':
        return <AINewsDashboard />;
      case 'lab':
        return <AgentLab />;
      case 'knowledge':
        return <KnowledgeBaseTab />;
      case 'projects':
        return <ProjectsControl />;
      case 'settings':
        return <SettingsControl />;
    }
  };

  const activeLabel = TABS.find(t => t.id === activeTab)?.label ?? '';

  return (
    <div className="flex h-screen bg-surface text-on-surface overflow-hidden">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -264 }}
            animate={{ x: 0 }}
            exit={{ x: -264 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-64 bg-surface-low shadow-ambient flex flex-col z-20 flex-shrink-0"
          >
            <div className="p-6 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 flex items-center justify-center rounded-sm">
                  <Zap size={15} className="text-primary" />
                </div>
                <div>
                  <div className="font-headline text-xl font-bold tracking-tighter text-primary">Mission Control</div>
                  <div className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Susania Platform</div>
                </div>
              </div>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-headline font-semibold tracking-tight text-left transition-all duration-300 rounded-sm ${
                    activeTab === id
                      ? 'bg-surface-highest text-primary'
                      : 'text-outline hover:text-primary hover:bg-surface-highest'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </nav>

            <div className="mt-auto px-4 py-5 border-t border-outline-variant/10 space-y-4">
              <div className="flex items-center gap-3 px-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <div>
                  <div className="text-xs font-headline font-bold text-white">Carlos · Boss</div>
                  <div className="text-[10px] font-label uppercase tracking-widest text-outline">{isConnected ? 'Bridge Online' : 'Bridge Offline'}</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-headline font-semibold tracking-tight text-outline hover:text-danger hover:bg-surface-high transition-all"
              >
                <LogOut size={16} />
                Salir
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0 bg-surface-lowest">
        <header className="flex justify-between items-center w-full px-6 md:px-8 h-20 sticky top-0 z-50 bg-[#131313]/60 backdrop-blur-3xl border-b border-outline-variant/10">
          <div className="flex items-center gap-4 md:gap-8 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-outline hover:text-primary transition-all duration-300"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="min-w-0">
              <h1 className="font-headline text-lg font-bold text-white tracking-tight truncate">{activeLabel}</h1>
              <div className="hidden md:flex gap-6 mt-1">
                <span className="font-label uppercase tracking-widest text-[10px] text-primary border-b border-primary pb-1">Bridge Status</span>
                <span className="font-label uppercase tracking-widest text-[10px] text-outline">Events</span>
                <span className="font-label uppercase tracking-widest text-[10px] text-outline">Sync</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <div className="hidden md:flex items-center gap-2 px-3 py-2 bg-surface-low border border-outline-variant/10 rounded-sm">
              <div className={`w-2 h-2 rounded-full ${bridgeStatus.status === 'ok' ? 'bg-primary animate-pulse' : 'bg-danger/70'}`} />
              <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                {bridgeStatus.status === 'ok' ? `${bridgeStatus.connections} Connections` : 'Bridge Offline'}
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-surface-low border border-outline-variant/10 rounded-sm">
              <Zap size={12} className={isConnected ? 'text-primary' : 'text-outline'} />
              <span className="font-label text-[10px] uppercase tracking-widest text-outline">Events: {logs.length}</span>
            </div>

            <button
              onClick={() => refreshStatus()}
              className="text-outline hover:text-primary transition-all duration-300"
              title="Refrescar estado del bridge"
            >
              <RefreshCw size={17} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 md:p-8 custom-scrollbar max-w-7xl mx-auto w-full">{renderTab()}</main>
      </div>
    </div>
  );
};

export default Dashboard;
