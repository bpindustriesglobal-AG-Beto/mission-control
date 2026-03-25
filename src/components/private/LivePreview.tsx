import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Globe, Monitor, RotateCw, Smartphone, Tablet } from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';

type ViewMode = 'desktop' | 'tablet' | 'mobile';

const VIEW_WIDTHS: Record<ViewMode, string> = {
  desktop: '100%',
  tablet: '768px',
  mobile: '390px',
};

const runtimeHost = typeof window !== 'undefined' ? window.location.hostname : '';
const defaultPreviewUrl = runtimeHost === '127.0.0.1' || runtimeHost === 'localhost' ? 'http://127.0.0.1:5173' : 'http://100.97.56.83:5173';
const PREVIEW_URL = import.meta.env.VITE_PREVIEW_URL || defaultPreviewUrl;

const LivePreview: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('desktop');
  const [key, setKey] = useState(0);
  const { bridgeStatus, opsStatus } = useSusanBridge();

  const reload = () => setKey(k => k + 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
        <Globe size={14} /> Live Preview
      </div>

      <div className="surface-panel rounded-sm overflow-hidden ambient-cyan">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 px-5 py-4 border-b border-outline-variant/10 bg-surface-low">
          <div className="flex-1 bg-surface-lowest border border-outline-variant/10 rounded-sm px-4 py-2.5 text-xs font-label text-primary flex items-center gap-3 min-w-0">
            <Globe size={13} className="text-primary shrink-0" />
            <span className="truncate">{PREVIEW_URL}</span>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <span className={`w-2 h-2 rounded-full ${bridgeStatus.status === 'ok' ? 'bg-primary animate-pulse' : 'bg-yellow-500/80'}`} />
              <span className="text-[10px] text-outline uppercase tracking-widest">{bridgeStatus.status === 'ok' ? 'Live Sync' : 'Bridge Warn'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={reload} className="secondary-button !py-2 !px-3">
              <RotateCw size={14} /> Refresh Preview
            </button>

            <div className="flex bg-surface-lowest p-1 rounded-sm border border-outline-variant/10">
              {(['desktop', 'tablet', 'mobile'] as ViewMode[]).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-2 rounded-sm transition-colors ${viewMode === mode ? 'bg-primary/10 text-primary' : 'text-outline hover:text-white'}`}
                >
                  {mode === 'desktop' ? <Monitor size={16} /> : mode === 'tablet' ? <Tablet size={16} /> : <Smartphone size={16} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {bridgeStatus.status !== 'ok' && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-5 py-3 flex items-start gap-3 text-yellow-200 text-xs font-label uppercase tracking-widest">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <div>
              <div className="mb-1">Bridge warning</div>
              <div className="text-yellow-100/80 normal-case tracking-normal font-sans text-sm">El preview puede cargar, pero el bridge no está respondiendo al endpoint /status ahora mismo.</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-0 min-h-[620px]">
          <div className="bg-surface-lowest p-5 flex justify-center overflow-auto custom-scrollbar">
            <motion.div
              animate={{ width: VIEW_WIDTHS[viewMode] }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="bg-white rounded-t-sm shadow-ambient overflow-hidden w-full"
              style={{ minHeight: '100%' }}
            >
              <iframe key={key} src={PREVIEW_URL} className="w-full border-none" style={{ height: '100%', minHeight: '540px' }} title="Mission Control Live Preview" />
            </motion.div>
          </div>

          <aside className="surface-panel border-l border-outline-variant/10 p-5 space-y-5">
            <div>
              <h3 className="font-headline font-bold text-white mb-1">Preview Intel</h3>
              <p className="text-sm text-outline">Vista embebida del frontend vivo con estado del bridge y del host.</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-outline">Bridge</span><strong className={bridgeStatus.status === 'ok' ? 'text-primary' : 'text-danger'}>{bridgeStatus.status.toUpperCase()}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Host</span><strong className="text-white">{opsStatus.host}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">OpenGravity</span><strong className={opsStatus.services.openGravity.status === 'online' ? 'text-primary' : 'text-white'}>{opsStatus.services.openGravity.status}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">OpenClaw</span><strong className={opsStatus.services.openClaw.ok ? 'text-primary' : 'text-danger'}>{opsStatus.services.openClaw.ok ? 'ok' : 'warn'}</strong></div>
              <div className="flex items-center justify-between"><span className="text-outline">Viewport</span><strong className="text-white">{viewMode}</strong></div>
            </div>

            <div className="bg-surface-lowest rounded-sm p-4 ghost-border">
              <div className="text-[10px] font-label uppercase tracking-widest text-outline mb-2">Operational note</div>
              <p className="text-sm text-white leading-relaxed">El objetivo aquí es validar visualmente el frontend mientras Mission Control sigue recogiendo señales del runtime real.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
