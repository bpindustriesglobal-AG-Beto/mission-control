import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Globe2,
  Lock,
  Network,
  Shield,
  Sparkles,
  TerminalSquare,
  UserSquare2,
  Workflow,
  FileText,
  Languages,
} from 'lucide-react';
import { IS_PUBLIC_MODE, PUBLIC_ACCESS_LABEL } from '../../config/runtime';

type Lang = 'es' | 'en';

const copy = {
  es: {
    navSusan: 'Susan',
    navAgents: 'Agentes',
    navPortfolio: 'Portafolio',
    navArchitecture: 'Arquitectura',
    secureAccess: 'Acceso Privado',
    privateInfra: 'Infraestructura Privada',
    explorePlatform: 'Explorar Plataforma',
    heroKicker: 'Founder + Executive AI Operating System',
    heroTitle1: 'El centro de mando para',
    heroTitle2: 'un fundador y su IA',
    heroBody:
      'Mission Control es la plataforma donde Carlos Barrios y Susan, su CEO digital, coordinan agentes, proyectos, infraestructura, automatización y decisiones operativas desde una sola capa privada de control.',
    previewLabel: 'Vista previa del sistema',
    previewStatus: 'Arquitectura viva',
    previewTitle: 'Mission Control Preview',
    previewBody:
      'Panel privado con health del bridge, laboratorio de agentes, canvas estratégico, live preview, proyectos y knowledge base conectados a runtime real.',
    susanKicker: 'Entidad Ejecutiva',
    susanTitle: 'Quién es Susan',
    susanBody1:
      'Susan no es un chatbot. Es una CEO digital: una entidad operativa diseñada para traducir intención estratégica en ejecución técnica, visibilidad y coordinación de sistemas.',
    susanBody2:
      'Su rol no es “responder preguntas”, sino ayudar a dirigir infraestructura, agentes, research, operaciones y decisiones con criterio ejecutivo.',
    opsAwareness: 'Conciencia operativa',
    privateModel: 'Acceso privado',
    agentsKicker: 'Digital Agents',
    agentsTitle: 'Qué son los agentes digitales',
    agentsBody:
      'Los agentes digitales son sistemas de IA con contexto, herramientas y capacidad de ejecutar tareas reales. A diferencia de un chat aislado, un agente puede observar estado, usar herramientas, guardar contexto, orquestar pasos y operar como capa de trabajo persistente.',
    agentsPoints: [
      'Ejecutan tareas con herramientas, no solo texto.',
      'Mantienen contexto operativo y memoria estructurada.',
      'Pueden monitorear sistemas, proyectos, eventos y backlog.',
      'Funcionan como workforce digital para automatización y dirección.',
    ],
    capabilitiesKicker: 'Tactical Suite',
    capabilitiesTitle: 'Capacidades del sistema',
    architectureKicker: 'System Design',
    architectureTitle: 'Arquitectura operativa',
    architectureBody:
      'Mission Control no es una landing decorativa. Es la cara visible de un stack real: OpenClaw para orquestación, OpenGravity como capa de agentes e integraciones, Susan Bridge para eventos y observabilidad, y dashboards privados para ejecución.',
    portfolioKicker: 'Founder Profile',
    portfolioTitle: 'Carlos Barrios — Builder Profile',
    portfolioBody:
      'Ingeniero Industrial, MBA y constructor de sistemas con foco en IA, automatización, fintech, infraestructura y negocios globales. Mission Control también funciona como una extensión de su portafolio estratégico y operativo.',
    portfolioBullets: [
      'Industrial Engineering — UCAB',
      'MBA — EUDE Business School (Spain)',
      'React, Node.js, TailwindCSS, Vite, FastAPI, Docker',
      'AI infrastructure, fintech systems, automation and growth',
    ],
    viewCv: 'Ver CV / Perfil',
    finalTitle: 'Listo para entrar al sistema',
    finalBody:
      'La capa pública cuenta la historia. La capa privada ejecuta. Mission Control está diseñado como un centro de operaciones personal, premium y seguro.',
    finalPrivate: 'Acceso privado · solo Boss',
    finalEnter: 'Entrar a Mission Control',
  },
  en: {
    navSusan: 'Susan',
    navAgents: 'Agents',
    navPortfolio: 'Portfolio',
    navArchitecture: 'Architecture',
    secureAccess: 'Secure Access',
    privateInfra: 'Private Infrastructure',
    explorePlatform: 'Explore Platform',
    heroKicker: 'Founder + Executive AI Operating System',
    heroTitle1: 'The command center for',
    heroTitle2: 'one founder and his AI',
    heroBody:
      'Mission Control is the platform where Carlos Barrios and Susan, his digital CEO, coordinate agents, projects, infrastructure, automation and operational decisions from a single private control layer.',
    previewLabel: 'Live interface preview',
    previewStatus: 'Live architecture',
    previewTitle: 'Mission Control Preview',
    previewBody:
      'Private dashboard with bridge health, agent lab, strategic canvas, live preview, projects and knowledge base connected to real runtime telemetry.',
    susanKicker: 'Executive Entity',
    susanTitle: 'Who is Susan',
    susanBody1:
      'Susan is not a chatbot. She is a digital CEO: an operational AI entity designed to turn strategic intent into technical execution, visibility and system coordination.',
    susanBody2:
      'Her role is not just to answer questions, but to help direct infrastructure, agents, research, operations and decisions with executive judgment.',
    opsAwareness: 'Operational awareness',
    privateModel: 'Private access model',
    agentsKicker: 'Digital Agents',
    agentsTitle: 'What digital agents actually are',
    agentsBody:
      'Digital agents are AI systems with context, tools and the ability to execute real tasks. Unlike a standalone chat, an agent can observe state, use tools, retain structured context, orchestrate steps and operate as a persistent work layer.',
    agentsPoints: [
      'They execute tasks with tools, not just text.',
      'They retain operational context and structured memory.',
      'They can monitor systems, projects, events and backlog.',
      'They act as a digital workforce for automation and execution.',
    ],
    capabilitiesKicker: 'Tactical Suite',
    capabilitiesTitle: 'System capabilities',
    architectureKicker: 'System Design',
    architectureTitle: 'Operational architecture',
    architectureBody:
      'Mission Control is not a decorative landing page. It is the visible layer of a real stack: OpenClaw for orchestration, OpenGravity as the complementary agent layer, Susan Bridge for events and observability, and private dashboards for execution.',
    portfolioKicker: 'Founder Profile',
    portfolioTitle: 'Carlos Barrios — Builder Profile',
    portfolioBody:
      'Industrial Engineer, MBA and systems builder focused on AI, automation, fintech, infrastructure and global business. Mission Control also acts as an extension of his strategic and operational portfolio.',
    portfolioBullets: [
      'Industrial Engineering — UCAB',
      'MBA — EUDE Business School (Spain)',
      'React, Node.js, TailwindCSS, Vite, FastAPI, Docker',
      'AI infrastructure, fintech systems, automation and growth',
    ],
    viewCv: 'View CV / Profile',
    finalTitle: 'Ready to enter the system?',
    finalBody:
      'The public layer tells the story. The private layer executes. Mission Control is designed as a premium, secure and personal operations center.',
    finalPrivate: 'Private access · Boss only',
    finalEnter: 'Enter Mission Control',
  },
} as const;

const capabilities = (lang: Lang) => [
  {
    title: lang === 'es' ? 'Agentes IA' : 'AI Agents',
    desc:
      lang === 'es'
        ? 'Operación de agentes, orquestación y ejecución estratégica desde un único centro de mando.'
        : 'Agent operations, orchestration and strategic execution from a single command center.',
    icon: BrainCircuit,
    accent: 'text-primary',
  },
  {
    title: lang === 'es' ? 'Automatización' : 'Automation',
    desc:
      lang === 'es'
        ? 'Workflows ejecutivos conectados a sistemas, eventos, datos y decisiones reales.'
        : 'Executive workflows connected to systems, events, data and real decisions.',
    icon: Workflow,
    accent: 'text-secondary',
  },
  {
    title: lang === 'es' ? 'Bridge Intel' : 'Bridge Intel',
    desc:
      lang === 'es'
        ? 'Eventos, health del sistema, telemetry y visibilidad del runtime privado.'
        : 'Events, system health, telemetry and private runtime visibility.',
    icon: Network,
    accent: 'text-primary',
  },
  {
    title: lang === 'es' ? 'Acceso Seguro' : 'Secure Access',
    desc:
      lang === 'es'
        ? 'Login privado + 2FA para un sistema diseñado con control total.'
        : 'Private login + 2FA for a system built around total control.',
    icon: Shield,
    accent: 'text-secondary',
  },
];

const Home: React.FC = () => {
  const [lang, setLang] = useState<Lang>('es');
  const t = copy[lang];
  const cards = useMemo(() => capabilities(lang), [lang]);

  return (
    <div className="min-h-screen bg-surface text-[#e5e2e1] selection:bg-primary/20 selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 inset-x-0 z-50 h-20 px-6 md:px-8 bg-[#131313]/70 backdrop-blur-3xl border-b border-white/5">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <span className="font-headline text-lg font-bold text-white tracking-tighter">Mission Control</span>
            <div className="h-4 w-px bg-surface-highest hidden md:block" />
            <span className="hidden md:block font-label uppercase tracking-[0.22em] text-[10px] text-primary">Susania Platform</span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <a href="#susan" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">{t.navSusan}</a>
            <a href="#agents" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">{t.navAgents}</a>
            <a href="#portfolio" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">{t.navPortfolio}</a>
            <a href="#architecture" className="font-label uppercase tracking-widest text-xs text-outline hover:text-primary transition-colors">{t.navArchitecture}</a>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-sm bg-surface-highest p-1 border border-outline-variant/10">
              <button onClick={() => setLang('es')} className={`px-3 py-2 text-[10px] font-label uppercase tracking-widest rounded-sm transition-colors ${lang === 'es' ? 'bg-primary/10 text-primary' : 'text-outline hover:text-white'}`}>ES</button>
              <button onClick={() => setLang('en')} className={`px-3 py-2 text-[10px] font-label uppercase tracking-widest rounded-sm transition-colors ${lang === 'en' ? 'bg-primary/10 text-primary' : 'text-outline hover:text-white'}`}>EN</button>
            </div>
            {IS_PUBLIC_MODE ? (
              <button className="secondary-button !px-4 !py-2.5 cursor-default">
                <Lock size={13} /> {PUBLIC_ACCESS_LABEL}
              </button>
            ) : (
              <a href="/login" className="secondary-button !px-4 !py-2.5">
                <Lock size={13} /> {t.secureAccess}
              </a>
            )}
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-faint opacity-70" />
        <div className="absolute top-[-10%] left-[-10%] w-[55%] h-[55%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-surface-low border border-outline-variant/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">{t.heroKicker}</span>
            </div>

            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white mb-6">
              {t.heroTitle1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">{t.heroTitle2}</span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-outline leading-relaxed mb-10">
              {t.heroBody}
            </p>

            <div className="flex flex-col md:flex-row items-center gap-4">
              {IS_PUBLIC_MODE ? (
                <button className="primary-button !px-8 !py-4 ambient-cyan cursor-default">
                  {t.privateInfra} <ArrowRight size={14} />
                </button>
              ) : (
                <a href="/login" className="primary-button !px-8 !py-4 ambient-cyan">
                  {t.finalEnter} <ArrowRight size={14} />
                </a>
              )}
              <a href="#portfolio" className="secondary-button !px-8 !py-4">
                <FileText size={14} /> {t.viewCv}
              </a>
              <a href="#capabilities" className="secondary-button !px-8 !py-4">
                {t.explorePlatform}
              </a>
            </div>
          </motion.div>

          <div className="relative z-10">
            <div className="glass-panel rounded-xl ghost-border ambient-cyan overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 bg-surface-lowest/80 border-b border-outline-variant/10">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-label text-[10px] uppercase tracking-widest text-outline">{t.previewLabel}</span>
                </div>
                <span className="font-label text-[10px] uppercase tracking-widest text-primary">{t.previewStatus}</span>
              </div>
              <div className="aspect-[4/3] bg-gradient-to-br from-surface-lowest via-surface-low to-surface-container overflow-hidden">
                <img src="/assets/susan-dashboard-mockup.jpg" alt="Mission Control mockup" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -bottom-8 -left-6 hidden md:block w-44 h-44 rounded-xl overflow-hidden border border-primary/15 shadow-ambient">
              <img src="/assets/susan-avatar.jpg" alt="Susan avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section id="susan" className="py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <div>
            <span className="label-kicker mb-4 block">{t.susanKicker}</span>
            <h2 className="section-title mb-8">{t.susanTitle}</h2>
            <p className="text-xl text-outline leading-relaxed mb-5">{t.susanBody1}</p>
            <p className="text-lg text-outline/80 leading-relaxed mb-10">{t.susanBody2}</p>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <span className="font-label text-secondary text-2xl font-bold block mb-1">24/7</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">{t.opsAwareness}</span>
              </div>
              <div>
                <span className="font-label text-secondary text-2xl font-bold block mb-1">2FA</span>
                <span className="font-label text-[10px] uppercase tracking-widest text-outline">{t.privateModel}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl overflow-hidden border border-outline-variant/15"><img src="/assets/susan-city-portrait.jpg" alt="Susan portrait" className="w-full h-full object-cover" /></div>
            <div className="rounded-xl overflow-hidden border border-outline-variant/15"><img src="/assets/susan-closeup-portrait.jpg" alt="Susan close portrait" className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </section>

      <section id="agents" className="py-28 bg-surface-low px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1fr] gap-12 items-center">
          <div>
            <span className="label-kicker mb-4 block">{t.agentsKicker}</span>
            <h2 className="section-title mb-8">{t.agentsTitle}</h2>
            <p className="text-lg text-outline leading-relaxed mb-8">{t.agentsBody}</p>
            <div className="space-y-4">
              {t.agentsPoints.map(point => (
                <div key={point} className="flex items-start gap-3 surface-elevated rounded-sm p-4">
                  <BrainCircuit className="text-primary mt-0.5" size={16} />
                  <span className="text-sm text-white leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-outline-variant/15 shadow-ambient">
            <img src="/assets/susan-mission-control-room.jpg" alt="Mission Control room" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section id="capabilities" className="py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="label-kicker mb-4 block">{t.capabilitiesKicker}</span>
            <h2 className="section-title">{t.capabilitiesTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {cards.map(item => {
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

      <section id="portfolio" className="py-28 px-6 md:px-8 bg-surface-low">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.95fr_1.05fr] gap-12 items-center">
          <div className="rounded-xl overflow-hidden border border-outline-variant/15 shadow-ambient">
            <img src="/assets/susan-diagnostics.jpg" alt="System diagnostics" className="w-full h-full object-cover" />
          </div>

          <div>
            <span className="label-kicker mb-4 block">{t.portfolioKicker}</span>
            <h2 className="section-title mb-8">{t.portfolioTitle}</h2>
            <p className="text-lg text-outline leading-relaxed mb-8">{t.portfolioBody}</p>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {t.portfolioBullets.map(item => (
                <div key={item} className="surface-panel rounded-sm p-4 flex items-start gap-3">
                  <UserSquare2 className="text-secondary mt-0.5" size={16} />
                  <span className="text-sm text-white leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/docs/Carlos_Barrios_Profile.pdf" target="_blank" rel="noreferrer" className="primary-button !px-8 !py-4">
                <FileText size={14} /> {t.viewCv}
              </a>
              <a href="#architecture" className="secondary-button !px-8 !py-4">
                <Globe2 size={14} /> {t.navArchitecture}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="py-28 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1fr] gap-16 items-center">
          <div>
            <span className="label-kicker mb-4 block">{t.architectureKicker}</span>
            <h2 className="section-title mb-8">{t.architectureTitle}</h2>
            <p className="text-lg text-outline leading-relaxed mb-10">{t.architectureBody}</p>
            <div className="space-y-6 text-outline">
              <div>
                <h4 className="font-headline text-xl text-white font-bold mb-2">OpenClaw</h4>
                <p>{lang === 'es' ? 'Capa de orquestación personal, ejecución, skills y control operativo.' : 'Personal orchestration layer for skills, execution and control.'}</p>
              </div>
              <div>
                <h4 className="font-headline text-xl text-white font-bold mb-2">OpenGravity</h4>
                <p>{lang === 'es' ? 'Capa complementaria de agentes, automatización e integraciones.' : 'Complementary layer for agents, automation and integrations.'}</p>
              </div>
              <div>
                <h4 className="font-headline text-xl text-white font-bold mb-2">Susan Bridge</h4>
                <p>{lang === 'es' ? 'Canal de eventos en vivo, observabilidad, health y sincronización del dashboard.' : 'Live event channel for observability, health and dashboard synchronization.'}</p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-xl ghost-border p-6 ambient-cyan">
            <div className="aspect-[16/10] rounded-lg bg-gradient-to-br from-surface-lowest via-surface-low to-surface-container flex items-center justify-center overflow-hidden">
              <img src="/assets/susan-dashboard-mockup.jpg" alt="Mission Control architecture" className="w-full h-full object-cover opacity-85" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 md:px-8">
        <div className="max-w-5xl mx-auto glass-panel rounded-xl ghost-border p-12 text-center ambient-cyan">
          <div className="flex justify-center mb-5">
            <div className="flex items-center gap-2 px-3 py-2 bg-surface-low rounded-sm border border-outline-variant/10">
              <Languages size={14} className="text-primary" />
              <span className="font-label text-[10px] uppercase tracking-widest text-outline">ES / EN ready</span>
            </div>
          </div>
          <h2 className="font-headline text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">{t.finalTitle}</h2>
          <p className="text-lg text-outline mb-10 max-w-2xl mx-auto">{t.finalBody}</p>
          {IS_PUBLIC_MODE ? (
            <button className="primary-button !px-10 !py-4 cursor-default">{t.finalPrivate}</button>
          ) : (
            <a href="/login" className="primary-button !px-10 !py-4">{t.finalEnter}</a>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
