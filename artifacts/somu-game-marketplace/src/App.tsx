import { useEffect, useMemo, useState } from 'react';
import { AtSign, ChevronLeft, ChevronRight, Facebook, Github, Instagram, Menu, MoveUpRight, X, Youtube } from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import wordmark from '@assets/SOMU_GAME_22_1787932502081.png';
import escapeRoadSource from '@assets/Pasted-Escape-Road-Game-HTML-html-lang-en-us-head-scri-1787932_1787932850674.txt?raw';
import stickHeroSource from '@assets/Pasted-STICK-HERO-GAME-HTML-div-class-container-div-id--178793_1787933186685.txt?raw';
import driftHuntersSource from '@assets/Pasted-DRIFT-HUNTERS-GANE-HTML-html-lang-en-us-base-href-https_1787933247612.txt?raw';
import gorillasSource from '@assets/Pasted-GORILLAS-GAME-HTML-Learn-how-to-code-this-game-step-by-_1787933336863.txt?raw';
import cubeSource from '@assets/Pasted-The-Cube-Game-HTML-PWA-https-bsehovac-github-io-the-cu-_1787933494849.txt?raw';
import NotFound from '@/pages/not-found';

type Game = {
  slug: string;
  name: string;
  category: string;
  cover: string;
  description: string;
  source?: string;
  playUrl?: string;
};

const games: Game[] = [
  { slug: 'escape-road', name: 'Escape Road', category: 'Action', cover: '/game-covers/escape-road.png', source: escapeRoadSource, description: 'Escape the city, dodge the chase, and keep your wheels moving.' },
  { slug: 'stick-hero', name: 'Stick Hero', category: 'Arcade', cover: '/game-covers/stick-hero.png', source: stickHeroSource, description: 'Stretch the stick, cross every gap, and keep your hero standing.' },
  { slug: 'drift-hunters', name: 'Drift Hunters', category: 'Racing', cover: '/game-covers/drift-hunters.png', source: driftHuntersSource, description: 'Tune your car, take the corner sideways, and chase the perfect drift.' },
  { slug: 'gorillas', name: 'Gorillas', category: 'Strategy', cover: '/game-covers/gorillas.png', source: gorillasSource, description: 'Aim the bomb, read the wind, and outsmart your opponent.' },
  { slug: 'the-cube', name: 'The Cube', category: 'Puzzle', cover: '/game-covers/the-cube.png', source: cubeSource, playUrl: 'https://bsehovac.github.io/the-cube/', description: 'Solve the cube, match every face, and beat the clock.' },
  { slug: 'coming-soon-1', name: 'Coming Soon', category: 'Coming Soon', cover: '', description: 'A new Somu Game is being prepared for the arcade.' },
  { slug: 'coming-soon-2', name: 'Coming Soon', category: 'Coming Soon', cover: '', description: 'A new Somu Game is being prepared for the arcade.' },
  { slug: 'coming-soon-3', name: 'Coming Soon', category: 'Coming Soon', cover: '', description: 'A new Somu Game is being prepared for the arcade.' },
];

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Marketplace', href: '/#marketplace' },
  { label: 'Collections', href: '/#collections' },
  { label: 'Community', href: '/#community' },
];

function getGame(slug?: string) {
  return games.find((game) => game.slug === slug) ?? games[0];
}

function sourceToDocument(source: string) {
  if (source.includes('<html')) {
    const start = source.indexOf('<html');
    const end = source.indexOf('</html>');
    const document = end > start ? source.slice(start, end + 7) : source.slice(start);
    const trailingJs = source.match(/={5,}\s*JS\s*([\s\S]*)$/i)?.[1]?.trim();
    const normalizedDocument = document
      .replaceAll('data:@file/javascript;base64', 'data:application/javascript;base64')
      .replace(/<script\b[^>]*src=["']blob:[^"']+["'][^>]*>\s*<\/script>/gi, '');
    return trailingJs ? `${normalizedDocument}<script>${trailingJs}</script>` : normalizedDocument;
  }
  const htmlMatch = source.match(/\bHTML\s*\n([\s\S]*?)\n={5,}\s*\nCSS\b/);
  const cssMatch = source.match(/\bCSS\s*\n([\s\S]*?)\n={5,}\s*\nJS\b/);
  const jsMatch = source.match(/\bJS\s*\n([\s\S]*)$/);
  const html = htmlMatch?.[1] ?? '';
  const css = cssMatch?.[1] ?? '';
  const js = jsMatch?.[1] ?? '';
  return `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="flex items-center" data-testid="link-brand"><img src={wordmark} alt="SOMU GAME" className={compact ? 'h-8 w-auto' : 'h-10 w-auto'} /></Link>;
}

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const active = location === '/' ? 'Home' : 'Marketplace';
  return (
    <>
      <nav className="relative z-40 mx-auto max-w-[1240px] px-4 pt-5 min-[845px]:pt-9" data-testid="navigation">
        <div className="flex items-center justify-between">
          <Brand />
          <div className="desktop-nav flex items-center gap-8">
            <div className="flex gap-8">
              {navItems.map((item) => <Link key={item.label} href={item.href} className={`relative inline-flex items-center py-3 text-sm font-semibold transition-colors ${active === item.label ? 'text-lime' : 'text-white hover:text-lime'}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>{item.label}<span className={`absolute bottom-1 left-0 h-px bg-lime transition-all ${active === item.label ? 'w-full' : 'w-0 group-hover:w-full'}`} /></Link>)}
            </div>
            <a href="#marketplace" className="group relative flex h-11 min-w-[164px] items-center justify-center overflow-hidden border border-lime text-sm font-semibold text-lime transition hover:bg-lime hover:text-[#080808]" data-testid="link-nav-find-a-game"><span>Find a Game</span><MoveUpRight size={15} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
          </div>
          <button className="hidden max-[844px]:block text-white" onClick={() => setMobileOpen(true)} aria-label="Open main menu" data-testid="button-open-menu"><Menu size={29} /></button>
        </div>
      </nav>
      {mobileOpen && <div className="fixed inset-0 z-[70] bg-[#080808]/80 backdrop-blur-sm min-[845px]:hidden" onClick={() => setMobileOpen(false)} data-testid="mobile-menu-overlay">
        <aside className="h-full w-[min(330px,88vw)] border-r border-lime bg-[#101010] p-6 shadow-[8px_0_0_#c6ff33]" onClick={(event) => event.stopPropagation()} data-testid="mobile-menu">
          <div className="flex items-center justify-between"><Brand compact /><button className="text-white" onClick={() => setMobileOpen(false)} aria-label="Close main menu" data-testid="button-close-menu"><X size={24} /></button></div>
          <div className="mt-14 flex flex-col gap-2">
            {navItems.map((item) => <Link href={item.href} key={item.label} onClick={() => setMobileOpen(false)} className={`border-b border-white/10 px-2 py-4 text-lg font-semibold ${active === item.label ? 'text-lime' : 'text-white'}`} data-testid={`link-mobile-${item.label.toLowerCase()}`}>{item.label}</Link>)}
          </div>
           <a href="#marketplace" onClick={() => setMobileOpen(false)} className="mt-10 flex w-full items-center justify-center gap-2 border border-lime px-4 py-3 font-semibold text-lime" data-testid="link-mobile-find-a-game">Find a Game <MoveUpRight size={16} /></a>
          <div className="mono absolute bottom-6 text-[10px] uppercase tracking-[.16em] text-white/35">Robinhood chain / 2024</div>
        </aside>
      </div>}
    </>
  );
}

function Hero() {
  return <header className="relative pb-24 pt-20 lg:pb-36 lg:pt-40 xl:pt-60" data-testid="hero">
    <div className="market-grid pointer-events-none absolute inset-x-0 top-0 h-[680px] opacity-50" />
    <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
      <div className="reveal max-w-3xl">
        <div className="flex w-fit items-center gap-3 border border-white/30 px-4 py-2 text-xs font-semibold text-white" data-testid="text-update"><span className="h-2 w-2 rounded-full bg-lime" /> New games just dropped <ChevronRight size={15} /></div>
        <h1 className="display mt-9 max-w-[620px] text-[3.65rem] font-bold uppercase leading-[.89] text-white sm:text-[6.7rem] lg:text-[5.5rem] xl:text-[7.3rem]" data-testid="text-hero-title">Play the<br /><span className="text-lime">arcade</span><br />again.</h1>
        <p className="mt-7 max-w-[560px] text-base leading-7 text-white/65 sm:text-lg">Five legendary browser games, collected in one place. No loading screen. No joystick required. Just press play and chase a high score.</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#marketplace" className="flex w-36 items-center justify-center gap-2 bg-lime py-3 text-sm font-bold text-[#080808] transition hover:-translate-y-1 hover:bg-white" data-testid="link-find-game">Find a game <MoveUpRight size={16} /></a>
          <a href="#collections" className="flex w-36 items-center justify-center border border-lime py-3 text-sm font-bold text-lime transition hover:bg-lime hover:text-[#080808]" data-testid="link-view-collections">Collections</a>
        </div>
        <div className="mono mt-12 flex gap-7 text-[10px] uppercase tracking-[.18em] text-white/35"><span><b className="text-white">05</b> live games</span><span><b className="text-white">08</b> total cards</span><span><b className="text-white">∞</b> replays</span></div>
      </div>
    </div>
  </header>;
}

function GameCard({ game }: { game: Game }) {
  const cover = <div className={`game-cover ${game.source ? '' : 'coming-soon-cover'} relative h-[220px] overflow-hidden`}>
    {game.source ? <img src={game.cover} alt={`${game.name} cover`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center"><span className="display text-4xl font-bold uppercase text-lime">Coming Soon</span></div>}
    <span className="absolute left-4 top-4 bg-[#080808] px-2 py-1 font-mono text-[9px] uppercase tracking-[.14em] text-lime">{game.category}</span>
  </div>;
  return <div className="game-card group flex h-[315px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111111] 2xl:rounded-3xl" data-testid={`card-game-${game.slug}`}>
    {game.source ? <Link href={`/play/${game.slug}`} className="block" data-testid={`link-game-${game.slug}`}>{cover}</Link> : <div data-testid={`card-coming-soon-${game.slug}`}>{cover}</div>}
    <div className="flex h-[95px] items-center justify-between gap-3 bg-[#f7f7f4] px-4 text-[#080808]">
      <div className="min-w-0"><p className="mono text-[9px] uppercase tracking-[.13em] text-black/50">{game.name}</p><p className="mt-1 text-xs font-medium leading-4">{game.description}</p></div>
      {game.source ? <Link href={`/play/${game.slug}`} className="shrink-0 text-black/60 transition hover:text-black" aria-label={`Play ${game.name}`} data-testid={`link-play-${game.slug}`}><MoveUpRight size={17} /></Link> : <span className="mono shrink-0 text-[8px] uppercase tracking-[.1em] text-black/45">Soon</span>}
    </div>
  </div>;
}

function Marketplace() {
  const [tab, setTab] = useState('All');
  const tabs = ['All', 'Action', 'Arcade', 'Racing', 'Strategy', 'Puzzle'];
  const filtered = useMemo(() => tab === 'All' ? games : games.filter((game) => game.category === tab), [tab]);
  return <main id="marketplace" className="mx-auto max-w-[1240px] px-6 pb-32 lg:px-8" data-testid="marketplace">
    <section id="collections" className="my-20 sm:my-60" data-testid="section-collections">
      <div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-5 sm:gap-x-10">
        {games.filter((game) => game.source).map((game, index) => <div key={game.slug} className="flex items-center justify-center gap-2 text-center text-sm font-bold uppercase tracking-[-.06em] text-white/55 transition hover:text-lime sm:text-base" data-testid={`collection-logo-${game.slug}`}><span className={`h-2 w-2 ${index % 2 === 0 ? 'bg-lime' : 'bg-white'}`} />{game.name}</div>)}
      </div>
    </section>
    <section aria-labelledby="hot-drops">
      <h2 id="hot-drops" className="my-10 text-2xl font-semibold tracking-tight sm:text-[2.5rem]" data-testid="text-hot-drops">Hot Drops <span className="text-lime">For You!</span></h2>
      <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2" role="tablist" aria-label="Game categories">
        {tabs.map((item) => <button key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`rounded-xl border px-4 py-2 text-xs font-semibold transition sm:text-sm ${tab === item ? 'border-lime bg-lime text-[#080808]' : 'border-lime text-lime hover:bg-lime hover:text-[#080808]'}`} data-testid={`button-tab-${item.toLowerCase()}`}>{item}</button>)}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="tabpanel">
        {filtered.map((game, index) => <div key={game.slug} className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}><GameCard game={game} /></div>)}
      </div>
    </section>
  </main>;
}

function Footer() {
  const footerLinks = ['Home', 'Marketplace', 'Collections', 'Community', 'Find a Game'];
  return <footer className="border-t border-white/10 bg-[#0d0d0d]" data-testid="footer"><div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-8">
    <div className="flex justify-center"><Brand compact /></div>
    <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 sm:gap-x-12" aria-label="Footer">{footerLinks.map((label) => <a key={label} href={label === 'Home' ? '/' : label === 'Marketplace' || label === 'Find a Game' ? '#marketplace' : label === 'Collections' ? '#collections' : '#top'} className="text-sm text-white/45 transition hover:text-lime" data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}</nav>
    <div className="mt-10 flex justify-center gap-8 text-white/35">
      <a href="#top" aria-label="Facebook" className="transition hover:text-lime" data-testid="link-social-facebook"><Facebook size={20} /></a>
      <a href="#top" aria-label="Instagram" className="transition hover:text-lime" data-testid="link-social-instagram"><Instagram size={20} /></a>
      <a href="#top" aria-label="X" className="transition hover:text-lime" data-testid="link-social-x"><AtSign size={20} /></a>
      <a href="#top" aria-label="Github" className="transition hover:text-lime" data-testid="link-social-github"><Github size={20} /></a>
      <a href="#top" aria-label="Youtube" className="transition hover:text-lime" data-testid="link-social-youtube"><Youtube size={20} /></a>
    </div>
    <p className="mt-10 text-center text-xs leading-5 text-white/30">© 2024 Somu Game. All rights reserved.</p>
  </div></footer>;
}

function Home() {
  return <div id="top" className="market-shell"><Navigation /><Hero /><Marketplace /><Footer /></div>;
}

function PlaySurface() {
  const params = useParams<{ slug: string }>();
  const game = getGame(params.slug);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(false); }, [game.slug]);
  return <div className="flex min-h-[100dvh] flex-col bg-[#080808] text-white" data-testid="play-surface">
    <div className="flex min-h-16 items-center justify-between border-b border-white/15 bg-[#101010] px-4 py-3 sm:px-7">
       <div className="flex items-center gap-5"><Link href="/" className="flex items-center gap-2 text-sm text-white/65 transition hover:text-lime" data-testid="link-back-marketplace"><ChevronLeft size={18} /> Marketplace</Link><span className="hidden h-5 w-px bg-white/20 sm:block" /><div><p className="mono text-[9px] uppercase tracking-[.18em] text-lime">{game.category}</p><h1 className="text-sm font-bold sm:text-base" data-testid="text-playing-game">{game.name}</h1></div></div>
      <div className="flex items-center gap-3"><span className="mono hidden text-[9px] uppercase tracking-[.16em] text-white/35 sm:block">Original source / playable</span><img src={wordmark} alt="SOMU GAME" className="h-7 w-auto" /></div>
    </div>
    <div className="relative flex-1 p-2 sm:p-5">
      {!loaded && <div className="absolute inset-2 z-10 flex items-center justify-center bg-[#111] sm:inset-5"><div className="text-center"><div className="mx-auto mb-4 h-2 w-28 overflow-hidden bg-white/10"><div className="h-full w-1/2 bg-lime animate-pulse" /></div><p className="mono text-[10px] uppercase tracking-[.18em] text-white/45">Loading cartridge</p></div></div>}
       <iframe title={`${game.name} playable game`} {...(game.playUrl ? { src: game.playUrl } : { srcDoc: sourceToDocument(game.source ?? '') })} className="game-iframe min-h-[calc(100dvh-96px)] border border-white/10" allow="autoplay; fullscreen; gamepad" onLoad={() => setLoaded(true)} data-testid={`iframe-game-${game.slug}`} />
    </div>
  </div>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/play/:slug" component={PlaySurface} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <Router />;
}