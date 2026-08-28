import { useEffect, useMemo, useState } from 'react';
import { AtSign, Bell, ChevronLeft, ChevronRight, CircleAlert, Facebook, Github, Instagram, Menu, MoveUpRight, X, Youtube } from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams } from 'wouter';
import brandMark from '@assets/SOMU_GAME_ROBIN_1787932494606.jpg';
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
  creator: string;
  price: string;
  edition: string;
  cover: string;
  source: string;
  eyebrow: string;
};

const games: Game[] = [
  { slug: 'escape-road', name: 'Escape Road', category: 'Action', creator: '1Games', price: '0.08', edition: 'RUN 041', cover: 'cover-escape', source: escapeRoadSource, eyebrow: 'GETAWAY DRIVER' },
  { slug: 'stick-hero', name: 'Stick Hero', category: 'Arcade', creator: 'CodePen Arcade', price: '0.05', edition: 'RUN 118', cover: 'cover-stick', source: stickHeroSource, eyebrow: 'BRIDGE BUILDER' },
  { slug: 'drift-hunters', name: 'Drift Hunters', category: 'Racing', creator: 'Drift Lab', price: '0.12', edition: 'RUN 207', cover: 'cover-drift', source: driftHuntersSource, eyebrow: 'SIDEWAYS ONLY' },
  { slug: 'gorillas', name: 'Gorillas', category: 'Strategy', creator: 'Hunor Borbely', price: '0.06', edition: 'RUN 064', cover: 'cover-gorillas', source: gorillasSource, eyebrow: 'THROW FIRST' },
  { slug: 'the-cube', name: 'The Cube', category: 'Puzzle', creator: 'Bsehovac', price: '0.09', edition: 'RUN 333', cover: 'cover-cube', source: cubeSource, eyebrow: 'SOLVE THE GRID' },
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
    return end > start ? source.slice(start, end + 7) : source.slice(start);
  }
  const htmlMatch = source.match(/\bHTML\s*\n([\s\S]*?)\n={5,}\s*\nCSS\b/);
  const cssMatch = source.match(/\bCSS\s*\n([\s\S]*?)\n={5,}\s*\nJS\b/);
  const jsMatch = source.match(/\bJS\s*\n([\s\S]*)$/);
  const html = htmlMatch?.[1] ?? '';
  const css = cssMatch?.[1] ?? '';
  const js = jsMatch?.[1] ?? '';
  return `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`;
}

function Toast({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[80] flex w-[min(360px,calc(100vw-40px))] items-start gap-3 border border-lime bg-[#c6ff33] p-4 text-[#080808] shadow-[6px_6px_0_#fff] toast-in" role="status" data-testid="toast-wallet-error">
      <CircleAlert size={20} strokeWidth={2.5} />
      <div className="flex-1">
        <p className="mono text-[10px] font-medium uppercase tracking-[.16em]">Wallet unavailable</p>
        <p className="mt-1 text-sm font-semibold leading-snug">Connect your Robinhood wallet to collect this game.</p>
      </div>
      <button onClick={onClose} aria-label="Close notification" data-testid="button-close-toast"><X size={17} /></button>
    </div>
  );
}

function NotificationPanel({ onToast }: { onToast: () => void }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { id: 1, text: 'Your <b>Escape Road</b> bid expires soon' },
    { id: 2, text: 'Someone liked your <b>Stick Hero</b> pass' },
    { id: 3, text: 'Your <b>Gorillas</b> purchase was successful' },
  ]);
  return (
    <div className="relative hidden min-[845px]:block">
      <button className="relative flex items-center gap-2 text-white/80 transition hover:text-lime" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Open notifications" data-testid="button-notifications">
        <Bell size={19} strokeWidth={1.8} />
        {items.length > 0 && <span className="mono flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-lime px-1 text-[10px] font-medium text-[#080808]" data-testid="text-notification-count">{items.length}</span>}
      </button>
      {open && (
        <div className="absolute right-0 top-9 z-50 w-[280px] border border-[#d9d9d9] bg-[#f8f8f4] text-[#080808] shadow-[6px_6px_0_#c6ff33]" data-testid="panel-notifications">
          <div className="flex items-center justify-between border-b border-black/15 px-4 py-3">
            <span className="mono text-[10px] uppercase tracking-[.15em]">Activity feed</span>
            <button className="text-black/40 hover:text-black" onClick={() => setItems([])} data-testid="button-clear-notifications">Clear all</button>
          </div>
          {items.length === 0 ? <p className="px-4 py-5 text-sm text-black/50">No new activity.</p> : items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 border-b border-black/10 px-4 py-3 text-xs last:border-0">
              <span dangerouslySetInnerHTML={{ __html: item.text }} />
              <button className="text-black/20 transition hover:text-black" onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))} aria-label="Dismiss notification" data-testid={`button-dismiss-notification-${item.id}`}><X size={15} /></button>
            </div>
          ))}
          <button className="w-full border-t border-black/10 px-4 py-2 text-left text-xs font-semibold hover:bg-lime" onClick={onToast} data-testid="button-notification-action">Open wallet</button>
        </div>
      )}
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return <Link href="/" className="flex items-center" data-testid="link-brand"><img src={wordmark} alt="SOMU GAME" className={compact ? 'h-8 w-auto' : 'h-10 w-auto'} /></Link>;
}

function Navigation({ onToast }: { onToast: () => void }) {
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
            <button onClick={onToast} className="group relative flex h-11 min-w-[164px] items-center justify-center overflow-hidden border border-lime text-sm font-semibold text-lime transition hover:bg-lime hover:text-[#080808]" data-testid="button-connect-wallet"><span>Connect wallet</span><MoveUpRight size={15} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
            <NotificationPanel onToast={onToast} />
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
          <button onClick={onToast} className="mt-10 flex w-full items-center justify-center gap-2 border border-lime px-4 py-3 font-semibold text-lime" data-testid="button-mobile-connect-wallet">Connect wallet <MoveUpRight size={16} /></button>
          <div className="mono absolute bottom-6 text-[10px] uppercase tracking-[.16em] text-white/35">Robinhood chain / 2024</div>
        </aside>
      </div>}
    </>
  );
}

function OrbitalShowcase({ onToast }: { onToast: () => void }) {
  const featured = [games[2], games[1], games[4]];
  return (
    <div className="orbit-stage relative mx-auto flex h-[540px] w-full max-w-[600px] items-center justify-center lg:h-[600px]" data-testid="orbital-showcase">
      <div className="orbit-ring h-[420px] w-[420px] sm:h-[500px] sm:w-[500px]" />
      <div className="orbit-ring h-[300px] w-[300px] sm:h-[362px] sm:w-[362px]" />
      <div className="absolute h-32 w-32 rounded-full border border-lime/30 bg-lime/10 blur-2xl" />
      <div className="absolute z-10 flex h-[140px] w-[140px] items-center justify-center rounded-full border-2 border-lime bg-[#101010] p-7 shadow-[0_0_0_9px_#080808,0_0_0_10px_#c6ff33]">
        <img src={brandMark} alt="" className="h-full w-full rounded-full object-cover" />
      </div>
      <Link href={`/play/${featured[0].slug}`} className="absolute left-[2%] top-[32%] z-20" data-testid={`link-featured-${featured[0].slug}`}>
        <FeaturedMini game={featured[0]} float="float" />
      </Link>
      <Link href={`/play/${featured[1].slug}`} className="absolute right-[1%] top-[13%] z-20" data-testid={`link-featured-${featured[1].slug}`}>
        <FeaturedMini game={featured[1]} float="float-reverse" />
      </Link>
      <Link href={`/play/${featured[2].slug}`} className="absolute bottom-[7%] right-[17%] z-20" data-testid={`link-featured-${featured[2].slug}`}>
        <FeaturedMini game={featured[2]} float="float" />
      </Link>
      <button onClick={onToast} className="absolute bottom-[8%] left-[10%] z-20 border border-white/25 px-3 py-2 text-[10px] font-semibold uppercase tracking-[.16em] text-white/60 transition hover:border-lime hover:text-lime" data-testid="button-orbit-bid">Collect a pass</button>
    </div>
  );
}

function FeaturedMini({ game, float }: { game: Game; float: string }) {
  return <div className="w-[138px] overflow-hidden border border-white/30 bg-[#f7f7f4] text-[#080808] shadow-[5px_5px_0_#c6ff33] transition hover:scale-105 sm:w-[174px]" style={{ animation: `${float} 6s ease-in-out infinite` }}>
    <div className={`game-cover ${game.cover} h-[130px] sm:h-[155px]`}><span className="cover-mark">{game.edition}</span></div>
    <div className="p-3"><p className="truncate text-[11px] font-bold">{game.name}</p><div className="mt-2 flex items-end justify-between"><div><p className="mono text-[8px] uppercase text-black/50">Floor pass</p><p className="mono text-[10px] font-medium">{game.price} RH</p></div><ChevronRight size={15} /></div></div>
  </div>;
}

function Hero({ onToast }: { onToast: () => void }) {
  return <header className="relative pt-20 lg:pt-40 xl:pt-60" data-testid="hero">
    <div className="market-grid pointer-events-none absolute inset-x-0 top-0 h-[680px] opacity-50" />
    <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-0 lg:pl-8 lg:pr-20">
      <div className="reveal max-w-2xl">
        <button onClick={onToast} className="flex items-center gap-3 border border-white/30 px-4 py-2 text-xs font-semibold text-white transition hover:border-lime hover:bg-lime hover:text-[#080808]" data-testid="button-update"><span className="h-2 w-2 rounded-full bg-lime" /> New games just dropped <ChevronRight size={15} /></button>
        <h1 className="display mt-9 max-w-[620px] text-[3.65rem] font-bold uppercase leading-[.89] text-white sm:text-[6.7rem] lg:text-[5.5rem] xl:text-[7.3rem]" data-testid="text-hero-title">Play the<br /><span className="text-lime">arcade</span><br />again.</h1>
        <p className="mt-7 max-w-[500px] text-base leading-7 text-white/65 sm:text-lg">Five legendary browser games, collected on-chain. No loading screen. No joystick required. Just press play and chase a high score.</p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#marketplace" className="flex w-36 items-center justify-center gap-2 bg-lime py-3 text-sm font-bold text-[#080808] transition hover:-translate-y-1 hover:bg-white" data-testid="link-find-game">Find a game <MoveUpRight size={16} /></a>
          <button onClick={onToast} className="flex w-36 items-center justify-center border border-lime py-3 text-sm font-bold text-lime transition hover:bg-lime hover:text-[#080808]" data-testid="button-create-collection">Create pass</button>
        </div>
        <div className="mono mt-12 flex gap-7 text-[10px] uppercase tracking-[.18em] text-white/35"><span><b className="text-white">05</b> live games</span><span><b className="text-white">01</b> chain</span><span><b className="text-white">∞</b> replays</span></div>
      </div>
      <div className="reveal reveal-delay-2"><OrbitalShowcase onToast={onToast} /></div>
    </div>
  </header>;
}

function GameCard({ game, onToast }: { game: Game; onToast: () => void }) {
  return <div className="game-card group flex h-[315px] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#111111] 2xl:rounded-3xl" data-testid={`card-game-${game.slug}`}>
    <Link href={`/play/${game.slug}`} className="block" data-testid={`link-game-${game.slug}`}>
      <div className={`game-cover ${game.cover} h-[220px]`}>
        <img src={wordmark} alt="" className="absolute left-[-18px] top-[-8px] w-[165px] opacity-95 mix-blend-screen" />
        <div className="absolute inset-x-4 top-4 flex items-center justify-between"><span className="mono bg-[#080808] px-2 py-1 text-[9px] uppercase tracking-[.14em] text-lime">{game.eyebrow}</span><span className="mono text-[10px] font-medium text-[#080808]">{game.edition}</span></div>
        <span className="cover-mark">{game.category}</span>
        <div className="absolute bottom-5 left-5 max-w-[80%]"><h3 className="display text-4xl font-bold uppercase leading-[.86] text-[#080808] mix-blend-multiply">{game.name}</h3></div>
      </div>
    </Link>
    <div className="flex h-[95px] items-center justify-between bg-[#f7f7f4] px-4 text-[#080808]">
      <div><p className="mono text-[9px] uppercase tracking-[.13em] text-black/50">Floor pass</p><p className="mt-1 text-sm font-semibold">{game.price} RH <span className="text-black/35">/</span> {game.creator}</p></div>
      <button onClick={onToast} className="flex items-center gap-1 rounded-full border border-[#080808] px-3 py-1.5 text-xs font-semibold transition hover:border-lime hover:bg-lime" data-testid={`button-bid-${game.slug}`}>Bid <MoveUpRight size={13} /></button>
    </div>
  </div>;
}

function Marketplace({ onToast }: { onToast: () => void }) {
  const [tab, setTab] = useState('All');
  const tabs = ['All', 'Action', 'Arcade', 'Racing', 'Strategy', 'Puzzle'];
  const filtered = useMemo(() => tab === 'All' ? games : games.filter((game) => game.category === tab), [tab]);
  return <main id="marketplace" className="mx-auto max-w-[1240px] px-6 pb-32 lg:px-8" data-testid="marketplace">
    <section id="collections" className="my-20 sm:my-60" data-testid="section-collections">
      <div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-5 sm:gap-x-10">
        {games.map((game, index) => <div key={game.slug} className="flex items-center justify-center gap-2 text-center text-sm font-bold uppercase tracking-[-.06em] text-white/55 transition hover:text-lime sm:text-base" data-testid={`collection-logo-${game.slug}`}><span className={`h-2 w-2 ${index % 2 === 0 ? 'bg-lime' : 'bg-white'}`} />{game.name}</div>)}
      </div>
    </section>
    <section aria-labelledby="hot-drops">
      <h2 id="hot-drops" className="my-10 text-2xl font-semibold tracking-tight sm:text-[2.5rem]" data-testid="text-hot-drops">Hot Drops <span className="text-lime">For You!</span></h2>
      <div className="mb-6 flex flex-wrap gap-x-8 gap-y-2" role="tablist" aria-label="Game categories">
        {tabs.map((item) => <button key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)} className={`rounded-xl border px-4 py-2 text-xs font-semibold transition sm:text-sm ${tab === item ? 'border-lime bg-lime text-[#080808]' : 'border-lime text-lime hover:bg-lime hover:text-[#080808]'}`} data-testid={`button-tab-${item.toLowerCase()}`}>{item}</button>)}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" role="tabpanel">
        {filtered.map((game, index) => <div key={game.slug} className={`reveal reveal-delay-${Math.min(index + 1, 3)}`}><GameCard game={game} onToast={onToast} /></div>)}
      </div>
    </section>
  </main>;
}

function Footer({ onToast }: { onToast: () => void }) {
  const footerLinks = ['Home', 'Marketplace', 'Collections', 'Community', 'Connect Wallet'];
  return <footer className="border-t border-white/10 bg-[#0d0d0d]" data-testid="footer"><div className="mx-auto max-w-7xl overflow-hidden px-6 py-10 sm:py-12 lg:px-8">
    <div className="flex justify-center"><Brand compact /></div>
    <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-4 sm:gap-x-12" aria-label="Footer">{footerLinks.map((label) => label === 'Connect Wallet' ? <button key={label} onClick={onToast} className="text-sm text-white/45 transition hover:text-lime" data-testid="button-footer-connect">Connect Wallet</button> : <a key={label} href={label === 'Home' ? '/' : label === 'Marketplace' ? '#marketplace' : label === 'Collections' ? '#collections' : '#top'} className="text-sm text-white/45 transition hover:text-lime" data-testid={`link-footer-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</a>)}</nav>
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
  const [toast, setToast] = useState(false);
  const showToast = () => { setToast(true); window.setTimeout(() => setToast(false), 4200); };
  return <div id="top" className="market-shell"><Navigation onToast={showToast} /><Hero onToast={showToast} /><Marketplace onToast={showToast} /><Footer onToast={showToast} /><Toast visible={toast} onClose={() => setToast(false)} /></div>;
}

function PlaySurface() {
  const params = useParams<{ slug: string }>();
  const game = getGame(params.slug);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setLoaded(false); }, [game.slug]);
  return <div className="flex min-h-[100dvh] flex-col bg-[#080808] text-white" data-testid="play-surface">
    <div className="flex min-h-16 items-center justify-between border-b border-white/15 bg-[#101010] px-4 py-3 sm:px-7">
      <div className="flex items-center gap-5"><Link href="/" className="flex items-center gap-2 text-sm text-white/65 transition hover:text-lime" data-testid="link-back-marketplace"><ChevronLeft size={18} /> Marketplace</Link><span className="hidden h-5 w-px bg-white/20 sm:block" /><div><p className="mono text-[9px] uppercase tracking-[.18em] text-lime">{game.category} / {game.edition}</p><h1 className="text-sm font-bold sm:text-base" data-testid="text-playing-game">{game.name}</h1></div></div>
      <div className="flex items-center gap-3"><span className="mono hidden text-[9px] uppercase tracking-[.16em] text-white/35 sm:block">Original source / playable</span><img src={wordmark} alt="SOMU GAME" className="h-7 w-auto" /></div>
    </div>
    <div className="relative flex-1 p-2 sm:p-5">
      {!loaded && <div className="absolute inset-2 z-10 flex items-center justify-center bg-[#111] sm:inset-5"><div className="text-center"><div className="mx-auto mb-4 h-2 w-28 overflow-hidden bg-white/10"><div className="h-full w-1/2 bg-lime animate-pulse" /></div><p className="mono text-[10px] uppercase tracking-[.18em] text-white/45">Loading cartridge</p></div></div>}
      <iframe title={`${game.name} playable game`} srcDoc={sourceToDocument(game.source)} className="game-iframe min-h-[calc(100dvh-96px)] border border-white/10" sandbox="allow-scripts allow-same-origin allow-forms allow-pointer-lock" onLoad={() => setLoaded(true)} data-testid={`iframe-game-${game.slug}`} />
    </div>
  </div>;
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route path="/play/:slug" component={PlaySurface} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <Router />;
}