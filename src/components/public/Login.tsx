import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [code2FA, setCode2FA] = useState('');
  const [step, setStep] = useState<'password' | '2fa'>('password');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim().length > 0) {
      setStep('2fa');
      setError('');
    }
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code2FA.length === 6) {
      localStorage.setItem('susan_2fa_token', String(Date.now()));
      navigate('/susania');
    } else {
      setError('Código inválido — 6 dígitos requeridos');
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex items-center justify-center px-6 py-16 overflow-hidden relative">
      <div className="absolute inset-0 grid-faint opacity-60" />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-surface-highest rounded-sm mb-5 text-primary">
            {step === 'password' ? <Lock size={28} /> : <Shield size={28} />}
          </div>
          <h1 className="font-headline text-3xl font-extrabold tracking-tight text-white">Mission Control</h1>
          <p className="font-label text-[10px] uppercase tracking-[0.22em] text-outline mt-2">Secure Access Layer</p>
        </div>

        <div className="glass-panel rounded-xl ghost-border p-8 ambient-cyan">
          {step === 'password' ? (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-outline block mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-surface-highest border border-outline-variant/15 rounded-sm px-4 py-3.5 pr-11 text-white placeholder:text-outline/35 focus:outline-none focus:border-primary/40 text-sm"
                    placeholder="••••••••"
                    autoFocus
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full primary-button !py-3.5 !justify-center">
                Continue
              </button>

              <a href="/" className="w-full secondary-button !justify-center !py-3.5">
                <ArrowLeft size={14} /> Back to Public Site
              </a>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Shield size={16} />
                  <span className="font-label text-[10px] uppercase tracking-[0.22em]">Two-Factor Verification</span>
                </div>
                <p className="text-sm text-outline leading-relaxed">Introduce el token de 6 dígitos para abrir la capa privada de Mission Control.</p>
              </div>

              <div>
                <label className="font-label text-[10px] uppercase tracking-[0.2em] text-outline block mb-2">2FA Code</label>
                <input
                  type="text"
                  value={code2FA}
                  onChange={e => setCode2FA(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="w-full bg-surface-highest border border-outline-variant/15 rounded-sm px-4 py-4 text-white text-center text-2xl tracking-[0.4em] placeholder:text-outline/35 focus:outline-none focus:border-primary/40"
                  placeholder="000000"
                  autoFocus
                  inputMode="numeric"
                  required
                />
              </div>

              {error && <p className="text-danger text-xs font-label uppercase tracking-widest">{error}</p>}

              <button type="submit" className="w-full primary-button !py-3.5 !justify-center">
                Verify Access
              </button>

              <button type="button" onClick={() => setStep('password')} className="w-full secondary-button !justify-center !py-3.5">
                <ArrowLeft size={14} /> Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
