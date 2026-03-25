import React from 'react';
import { Globe, Lock, RefreshCw, Save, Shield, SlidersHorizontal } from 'lucide-react';
import { useSusanBridge } from '../../hooks/useSusanBridge';

const SETTINGS = [
  { label: 'Theme', value: 'Executive Cyber Minimal', note: 'Dirección visual actual del dashboard privado.' },
  { label: 'Bridge URL', value: 'Derived from env', note: 'Fuente de conexión del panel operativo.' },
  { label: 'Environment', value: 'Private Ops / Production-like', note: 'Entorno actual de trabajo de Susan.' },
  { label: 'Security Mode', value: 'Login + 2FA', note: 'Acceso restringido para un solo usuario.' },
  { label: 'UX Source', value: 'Susania + Stitch Hybrid', note: 'Sistema visual propio fusionado con exploración de Stitch.' },
];

const SettingsControl: React.FC = () => {
  const { bridgeStatus, bridgeUrl, refreshStatus } = useSusanBridge();

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
        <SlidersHorizontal size={14} /> Ops Settings
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8 surface-panel rounded-sm p-6">
          <div className="grid gap-4">
            {SETTINGS.map(item => (
              <div key={item.label} className="rounded-sm bg-surface-lowest px-4 py-4 ghost-border">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-[10px] font-label uppercase tracking-widest text-outline">{item.label}</span>
                  <span className="text-sm text-white text-right break-all">{item.label === 'Bridge URL' ? bridgeUrl : item.value}</span>
                </div>
                <p className="text-xs text-outline leading-relaxed">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-4 space-y-4">
          <div className="surface-panel rounded-sm p-5">
            <div className="flex items-center gap-2 text-xs font-label text-secondary uppercase tracking-[0.2em] mb-4">
              <Shield size={14} /> Security
            </div>
            <ul className="space-y-3 text-sm text-white">
              <li className="flex items-start gap-2"><Lock size={14} className="mt-0.5 text-primary" /> Token local para sesión privada</li>
              <li className="flex items-start gap-2"><Lock size={14} className="mt-0.5 text-primary" /> 2FA como capa obligatoria</li>
              <li className="flex items-start gap-2"><Lock size={14} className="mt-0.5 text-primary" /> Enfoque Boss-first / single-user</li>
            </ul>
          </div>

          <div className="surface-panel rounded-sm p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-label text-primary uppercase tracking-[0.2em]">
              <Globe size={14} /> Bridge Control
            </div>
            <div className="text-sm text-outline leading-relaxed">
              Estado actual: <span className={bridgeStatus.status === 'ok' ? 'text-primary' : 'text-danger'}>{bridgeStatus.status.toUpperCase()}</span>
            </div>
            <button onClick={() => refreshStatus()} className="w-full secondary-button !justify-center !py-3">
              <RefreshCw size={14} /> Test Connection
            </button>
            <button className="w-full primary-button !justify-center !py-3">
              <Save size={14} /> Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsControl;
