import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Lock, Network, Shield, Sparkles, TerminalSquare, Workflow } from 'lucide-react';

const capabilities = [
  {
    title: 'AI Agents',
    desc: 'Operación de agentes, orquestación y ejecución estratégica desde un único centro de mando.',
    icon: BrainCircuit,
    accent: 'text-primary',
  },
  {
    title: 'Automation',
    desc: 'Workflows ejecutivos y operativos conectados a sistemas, eventos, datos y decisiones reales.',
    icon: Workflow,
    accent: 'text-secondary',
  },
  {
    title: 'Bridge Intel',
    desc: 'Eventos, salud del sistema, telemetry y visibilidad del runtime en un panel privado.',
    icon: Network,
    accent: 'text-primary',
  },
  {
    title: 'Secure Access',
    desc: 'Login privado + 2FA para una plataforma diseñada con enfoque single-user y control total.',
    icon: Shield,
    accent: 'text-secondary',
  },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface text-[#e5e2e1] selection:bg-primary/20 selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 z-50 h-20 px-6 md:px-8 bg-[#131313]/60 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <span className="font-headline text-lg font-bold text-white tracking-tighter">Mission Control</span>
            <div className="h-4 w-px bg-surface-highest hidden md:block" />
            <span className="hidden md:block font-label uppercase tracking-[0.22em] text-[10px] text-primary">Susania Platform</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            <a href="#susan" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">Susan</a>
            <a href="#capabilities" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">Capabilities</a>
            <a href="#architecture" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">Architecture</a>
          </div>

          <a href="/login" className="secondary-button !px-4 !py-2.5">
            <Lock size={13} /> Secure Access
          </a>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-faint opacity-70" />
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl w-full text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-low border border-outline-variant/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">Founder + Executive AI Operating System</span>
            </div>

            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white mb-6">
              The command center for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">one founder and his AI</span>
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl text-outline leading-relaxed mb-10">
              Mission Control es la plataforma privada donde Carlos Barrios y Susan, su CEO digital, coordinan agentes, proyectos, infraestructura, automatización y decisiones operativas.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <a href="/login" className="primary-button !px-8 !py-4 ambient-cyan">
                Enter Mission Control <ArrowRight size={14} />
              </a>
              <a href="#capabilities" className="secondary-button !px-8 !py-4">
                Explore the Platform
              </a>
            </div>
          </motion.div>
        </div>

        <div className="relative z-10 mt-20 max-w-6xl w-full px-2">
          <div className="glass-panel rounded-xl ghost-border ambient-cyan overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 bg-surface-lowest/80 border-b border-outline-variant/10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">Live Interface Preview</span>
              </div>
              <span className="font-label text-[10px] uppercase tracking-widest text-primary">Bridge Online</span>
            </div>
            <div className="aspect-[21/9] bg-gradient-to-br from-surface-lowest via-surface-low to-surface-container flex items-center justify-center">
              <div className="text-center space-y-4 px-6">
                <TerminalSquare className="mx-auto text-primary" size={34} />
                <p className="font-headline text-2xl font-bold text-white">Mission Control Preview</p>
                <p className="text-sm text-outline max-w-xl">Dashboard privado, bridge health, agent lab, strategic canvas, live preview, projects y knowledge base en una sola capa de comando.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="susan" className="py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
          <div>
            <span className="label-kicker mb-4 block">Executive Entity</span>
            <h2 className="section-title mb-8">Who is Susan?</h2>
            <p className="text-xl text-outline leading-relaxed mb-5">
              Susan no es un chatbot. Es una <span className="text-white font-semibold">CEO digital</span>, una entidad operativa creada para traducir intención estratégica en ejecución técnica, orquestación y visibilidad.
            </p>
            <p className="text-lg text-outline/80 leading-relaxed mb-10">
              Mission Control es su mesa de operaciones: un lugar donde convergen agentes, eventos, arquitectura, decisiones y control privado para un solo operador: Boss.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="font-label text-secondary text-2xl font-bold block mb-1">24/7</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">Operational Awareness</span>
              </div>
              <div>
                <span className="font-label text-secondary text-2xl font-bold block mb-1">2FA</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">Private Access Model</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-primary/20 p-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-primary/5 rounded-[2rem] blur-3xl" />
              <div className="relative z-10 w-full aspect-square rounded-[1.5rem] bg-gradient-to-br from-surface-container to-surface-highest border border-outline-variant/15 flex items-center justify-center">
                <Sparkles size={44} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-28 bg-surface-low">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="mb-16">
            <span className="label-kicker mb-4 block">Tactical Suite</span>
            <h2 className="section-title">Capabilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {capabilities.map(item => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="surface-elevated p-8 rounded-sm hover:bg-surface-container transition-all duration-300 min-h-[240px] flex flex-col justify-between">
                  <div className={`w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center mb-8 ${item.accent}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-headline text-2xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-outline">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="architecture" className="py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <span className="label-kicker mb-4 block">System Design</span>
            <h2 className="section-title mb-8">The Architecture</h2>
            <div className="space-y-8 text-outline">
              <div>
                <h4 className="font-headline text-xl text-white font-bold mb-2">OpenClaw</h4>
                <p>La capa de orquestación personal, ejecución, skills, agentes y coordinación operativa.</p>
              </div>
              <div>
                <h4 className="font-headline text-xl text-white font-bold mb-2">OpenGravity</h4>
                <p>El núcleo complementario para automatización, lógica, integraciones y contexto más amplio.</p>
              </div>
              <div>
                <h4 className="font-headline text-xl text-white font-bold mb-2">Susan Bridge</h4>
                <p>La capa de eventos en vivo que conecta señales, panel, runtime, feedback y visibilidad operativa.</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl ghost-border p-6 ambient-cyan">
            <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-surface-lowest via-surface-low to-surface-container flex items-center justify-center">
              <div className="text-center space-y-4 px-6">
                <Network className="mx-auto text-secondary" size={36} />
                <p className="font-headline text-2xl font-bold text-white">Operational Topology</p>
                <p className="text-sm text-outline">OpenClaw · OpenGravity · Susan Bridge · Projects · Knowledge · Live Ops</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-8">
        <div className="max-w-5xl mx-auto glass-panel rounded-xl ghost-border p-12 text-center ambient-cyan">
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">Ready to assume command?</h2>
          <p className="text-lg text-outline mb-10 max-w-2xl mx-auto">Mission Control opera como una plataforma privada, diseñada para foco, seguridad y ejecución real.</p>
          <a href="/login" className="primary-button !px-10 !py-4">Enter Platform Gateway</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
