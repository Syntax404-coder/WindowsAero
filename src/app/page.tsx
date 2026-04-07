/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import styles from './page.module.css';
import Window from '../components/Desktop/Window';
import Taskbar from '../components/Taskbar/Taskbar';
import StartMenu from '../components/StartMenu/StartMenu';
import DesktopShortcut from '../components/Desktop/DesktopShortcut';
import ContextMenu from '../components/Desktop/ContextMenu';
import SystemProperties from '../components/Desktop/SystemProperties';
import FileManager from '../components/Desktop/FileManager';
import WebBrowser from '../components/Desktop/WebBrowser';
import BubblesScreensaver from '../components/Desktop/BubblesScreensaver';
import Personalization from '../components/Desktop/Personalization';
import IconPicker from '../components/Desktop/IconPicker';

import MatchPointIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import ComputerIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import ExplorerIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON10_1.ico';
import KaonTaIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import SystemIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON114_1.ico';
import ResumeIcon from '../assets/Icons/Windows Vista/ico/shell32.dll/ICON324_1.ico';
import PortfolioIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';
import IEIcon from '../assets/Icons/Windows Vista/ico/shell32.dll/ICON16744_1.ico';
import SettingsIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';

// Import all wallpapers statically
import wp1 from '../assets/Wallpapers/Windows Vista/Desktop/img1.jpg';
import wp2 from '../assets/Wallpapers/Windows Vista/Desktop/img2.jpg';
import wp3 from '../assets/Wallpapers/Windows Vista/Desktop/img3.jpg';
import wp4 from '../assets/Wallpapers/Windows Vista/Desktop/img4.jpg';
import wp5 from '../assets/Wallpapers/Windows Vista/Desktop/img5.jpg';
import wp6 from '../assets/Wallpapers/Windows Vista/Desktop/img6.jpg';
import wp7 from '../assets/Wallpapers/Windows Vista/Desktop/img7.jpg';
import wp8 from '../assets/Wallpapers/Windows Vista/Desktop/img8.jpg';
import wp9 from '../assets/Wallpapers/Windows Vista/Desktop/img9.jpg';
import wp10 from '../assets/Wallpapers/Windows Vista/Desktop/img10.jpg';
import wp11 from '../assets/Wallpapers/Windows Vista/Desktop/img11.jpg';
import wp12 from '../assets/Wallpapers/Windows Vista/Desktop/img12.jpg';
import wp13 from '../assets/Wallpapers/Windows Vista/Desktop/img13.jpg';
import wp14 from '../assets/Wallpapers/Windows Vista/Desktop/img14.jpg';
import wp15 from '../assets/Wallpapers/Windows Vista/Desktop/img15.jpg';
import wp16 from '../assets/Wallpapers/Windows Vista/Desktop/img16.jpg';
import wp17 from '../assets/Wallpapers/Windows Vista/Desktop/img17.jpg';
import wp18 from '../assets/Wallpapers/Windows Vista/Desktop/img18.jpg';
import wp19 from '../assets/Wallpapers/Windows Vista/Desktop/img19.jpg';
import wp20 from '../assets/Wallpapers/Windows Vista/Desktop/img20.jpg';
import wp21 from '../assets/Wallpapers/Windows Vista/Desktop/img21.jpg';
import wp22 from '../assets/Wallpapers/Windows Vista/Desktop/img22.jpg';
import wp23 from '../assets/Wallpapers/Windows Vista/Desktop/img23.jpg';
import wp24 from '../assets/Wallpapers/Windows Vista/Desktop/img24.jpg';
import wp25 from '../assets/Wallpapers/Windows Vista/Desktop/img25.jpg';
import wp26 from '../assets/Wallpapers/Windows Vista/Desktop/img26.jpg';
import wp27 from '../assets/Wallpapers/Windows Vista/Desktop/img27.jpg';
import wp28 from '../assets/Wallpapers/Windows Vista/Desktop/img28.jpg';
import wp29 from '../assets/Wallpapers/Windows Vista/Desktop/img29.jpg';
import wp30 from '../assets/Wallpapers/Windows Vista/Desktop/img30.jpg';
import wp31 from '../assets/Wallpapers/Windows Vista/Desktop/img31.jpg';
import wp32 from '../assets/Wallpapers/Windows Vista/Desktop/img32.jpg';
import wp33 from '../assets/Wallpapers/Windows Vista/Desktop/img33.jpg';
import wp34 from '../assets/Wallpapers/Windows Vista/Desktop/img34.jpg';
import wp35 from '../assets/Wallpapers/Windows Vista/Desktop/img35.jpg';
import wp36 from '../assets/Wallpapers/Windows Vista/Desktop/img36.jpg';
import wp37 from '../assets/Wallpapers/Windows Vista/Desktop/img37.jpg';
import wp38 from '../assets/Wallpapers/Windows Vista/Desktop/img38.jpg';
import wp39 from '../assets/Wallpapers/Windows Vista/Desktop/img39.jpg';
import wp40 from '../assets/Wallpapers/Windows Vista/Desktop/img40.jpg';
import wp41 from '../assets/Wallpapers/Windows Vista/Desktop/img41.jpg';

const wallpaperMap: Record<string, string> = {
  img1: wp1.src, img2: wp2.src, img3: wp3.src, img4: wp4.src,
  img5: wp5.src, img6: wp6.src, img7: wp7.src, img8: wp8.src,
  img9: wp9.src, img10: wp10.src, img11: wp11.src, img12: wp12.src,
  img13: wp13.src, img14: wp14.src, img15: wp15.src, img16: wp16.src,
  img17: wp17.src, img18: wp18.src, img19: wp19.src, img20: wp20.src,
  img21: wp21.src, img22: wp22.src, img23: wp23.src, img24: wp24.src,
  img25: wp25.src, img26: wp26.src, img27: wp27.src, img28: wp28.src,
  img29: wp29.src, img30: wp30.src, img31: wp31.src, img32: wp32.src,
  img33: wp33.src, img34: wp34.src, img35: wp35.src, img36: wp36.src,
  img37: wp37.src, img38: wp38.src, img39: wp39.src, img40: wp40.src,
  img41: wp41.src,
};

interface WindowState {
  id: string;
  title: string;
  isFocused: boolean;
  isMinimized: boolean;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

interface DesktopIcon {
  id: string;
  name: string;
  iconSrc: string;
  x: number;
  y: number;
}

interface IconContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  iconId: string;
  iconSrc: string;
}

const DEFAULT_ICONS: DesktopIcon[] = [
  { id: 'computer', name: 'This PC', iconSrc: '__ComputerIcon__', x: 10, y: 10 },
  { id: 'skills', name: 'System\nProperties', iconSrc: '__SystemIcon__', x: 10, y: 100 },
  { id: 'resume', name: 'Resume', iconSrc: '__ResumeIcon__', x: 10, y: 195 },
];

/* ── Helper: Apply Aero color to CSS custom properties ── */
function applyAeroColor(hue: number, sat: number, light: number, intensity: number, transparent: boolean) {
  const root = document.documentElement;
  const alpha = transparent ? (intensity / 100) * 0.35 + 0.08 : 0.85;
  const alphaStrong = transparent ? (intensity / 100) * 0.40 + 0.15 : 0.90;

  root.style.setProperty('--aero-glass-bg', `hsla(${hue}, ${sat}%, ${light}%, ${alpha.toFixed(2)})`);
  root.style.setProperty('--aero-glass-bg-strong', `hsla(${hue}, ${sat}%, ${Math.max(light - 10, 15)}%, ${alphaStrong.toFixed(2)})`);
  root.style.setProperty('--aero-title-gradient',
    `linear-gradient(180deg, hsla(${hue}, ${sat}%, ${light + 15}%, 0.50) 0%, hsla(${hue}, ${sat}%, ${light + 5}%, 0.40) 40%, hsla(${hue}, ${sat}%, ${light}%, 0.30) 50%, hsla(${hue}, ${sat}%, ${light + 5}%, 0.35) 100%)`
  );
  root.style.setProperty('--aero-taskbar-bg', `hsla(${hue}, ${sat + 10}%, ${Math.max(light - 45, 5)}%, 0.78)`);
  root.style.setProperty('--aero-start-gradient',
    `radial-gradient(circle at 35% 30%, hsl(${hue}, ${sat}%, ${light + 25}%) 0%, hsl(${hue}, ${sat}%, ${light}%) 30%, hsl(${hue}, ${sat}%, ${light - 15}%) 55%, hsl(${hue}, ${sat + 10}%, ${Math.max(light - 30, 5)}%) 80%, hsl(${hue}, ${sat + 10}%, ${Math.max(light - 45, 2)}%) 100%)`
  );
}

const DEFAULT_ICONS_RESOLVED: DesktopIcon[] = DEFAULT_ICONS.map(icon => ({
  ...icon,
  iconSrc: icon.iconSrc === '__ComputerIcon__' ? ComputerIcon.src
    : icon.iconSrc === '__SystemIcon__' ? SystemIcon.src
    : icon.iconSrc === '__ResumeIcon__' ? ResumeIcon.src
    : icon.iconSrc
}));

export default function Desktop() {
  const [mounted, setMounted] = useState(false);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });
  const [isIdle, setIsIdle] = useState(false);

  // Desktop icons state
  const [desktopIcons, setDesktopIcons] = useState<DesktopIcon[]>(DEFAULT_ICONS_RESOLVED);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [globalCustomIcons, setGlobalCustomIcons] = useState<Record<string, string>>({});

  // Derived map of appId -> iconSrc for the whole system
  const customIconsMap = useMemo(() => {
    const map: Record<string, string> = { ...globalCustomIcons };
    desktopIcons.forEach(icon => {
      map[icon.id] = icon.iconSrc;
    });
    return map;
  }, [desktopIcons, globalCustomIcons]);

  // Icon context menu & picker state
  const [iconContextMenu, setIconContextMenu] = useState<IconContextMenuState>({ visible: false, x: 0, y: 0, iconId: '', iconSrc: '' });
  const [iconPickerTarget, setIconPickerTarget] = useState<string | null>(null);
  const [iconPickerCurrentSrc, setIconPickerCurrentSrc] = useState('');

  // Personalization state — defaults first, restored from localStorage on mount
  const [currentWallpaper, setCurrentWallpaper] = useState('img24');
  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  const [transparency, setTransparency] = useState(true);
  const [colorIntensity, setColorIntensity] = useState(50);

  /* ── Restore all saved personalization on client mount ── */
  useEffect(() => {
    const savedWp = localStorage.getItem('aero-wallpaper');
    if (savedWp) setCurrentWallpaper(savedWp);

    const savedIdx = localStorage.getItem('aero-colorIndex');
    if (savedIdx) setCurrentColorIndex(parseInt(savedIdx));

    const savedTransp = localStorage.getItem('aero-transparency');
    if (savedTransp !== null) setTransparency(savedTransp !== 'false');

    const savedIntensity = localStorage.getItem('aero-intensity');
    if (savedIntensity) setColorIntensity(parseInt(savedIntensity));

    // Re-apply saved Aero glass color
    const savedHue = localStorage.getItem('aero-hue');
    const savedSat = localStorage.getItem('aero-sat');
    const savedLight = localStorage.getItem('aero-light');
    if (savedHue && savedSat && savedLight) {
      applyAeroColor(
        parseInt(savedHue), parseInt(savedSat), parseInt(savedLight),
        parseInt(savedIntensity || '50'),
        savedTransp !== 'false'
      );
    }

    // Restore desktop icon positions & custom icons
    const savedIcons = localStorage.getItem('aero-desktop-icons');
    if (savedIcons) {
      try {
        const parsed = JSON.parse(savedIcons) as DesktopIcon[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          const migrated = parsed.map(icon => 
            (icon.id === 'explorer' && icon.name === 'This PC') ? { ...icon, id: 'computer' } : icon
          );
          setDesktopIcons(migrated);
        }
      } catch (e) { console.error('Failed to parse desktop icons', e); }
    }

    const savedGlobalIcons = localStorage.getItem('aero-custom-icons');
    if (savedGlobalIcons) {
      try {
        setGlobalCustomIcons(JSON.parse(savedGlobalIcons));
      } catch { /* ignore parse errors */ }
    }

    setMounted(true);
  }, []);


  /* ── Idle Detection (perf-optimized: ref avoids re-renders on every mousemove) ── */
  const isIdleRef = useRef(false);
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;
    const IDLE_TIME = 60000;

    const resetIdle = () => {
      if (isIdleRef.current) {
        isIdleRef.current = false;
        setIsIdle(false);
      }
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isIdleRef.current = true;
        setIsIdle(true);
      }, IDLE_TIME);
    };

    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('mousedown', resetIdle);
    window.addEventListener('keydown', resetIdle);
    window.addEventListener('touchstart', resetIdle);

    idleTimer = setTimeout(() => {
      isIdleRef.current = true;
      setIsIdle(true);
    }, IDLE_TIME);

    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('mousedown', resetIdle);
      window.removeEventListener('keydown', resetIdle);
      window.removeEventListener('touchstart', resetIdle);
      clearTimeout(idleTimer);
    };
  }, []);

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(win => ({
      ...win,
      isFocused: win.id === id,
      isMinimized: win.id === id ? false : win.isMinimized
    })));
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(win => win.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(win => ({
      ...win,
      isMinimized: win.id === id ? true : win.isMinimized,
      isFocused: win.id === id ? false : win.isFocused
    })));
  };

  const toggleStartMenu = () => {
    setStartOpen(!startOpen);
  };

  const openApp = (appId: string, title: string, content: React.ReactNode, icon?: React.ReactNode) => {
    setStartOpen(false);
    
    const existing = windows.find(w => w.id === appId);
    if (existing) {
      focusWindow(appId);
      return;
    }

    setWindows(prev => [
      ...prev.map(w => ({ ...w, isFocused: false })),
      { id: appId, title, isFocused: true, isMinimized: false, content, icon }
    ]);
  };

  /* ── Personalization Handlers (with localStorage persistence) ── */
  const handleWallpaperChange = (wpId: string) => {
    setCurrentWallpaper(wpId);
    localStorage.setItem('aero-wallpaper', wpId);
  };

  const handleColorChange = (index: number, hue: number, sat: number, light: number) => {
    setCurrentColorIndex(index >= 0 ? index : currentColorIndex);
    applyAeroColor(hue, sat, light, colorIntensity, transparency);
    // Persist HSL + index
    localStorage.setItem('aero-colorIndex', String(index >= 0 ? index : currentColorIndex));
    localStorage.setItem('aero-hue', String(hue));
    localStorage.setItem('aero-sat', String(sat));
    localStorage.setItem('aero-light', String(light));
  };

  const handleTransparencyChange = (enabled: boolean) => {
    setTransparency(enabled);
    localStorage.setItem('aero-transparency', String(enabled));
    // Re-apply with saved HSL values
    const h = parseInt(localStorage.getItem('aero-hue') || '210');
    const s = parseInt(localStorage.getItem('aero-sat') || '60');
    const l = parseInt(localStorage.getItem('aero-light') || '60');
    applyAeroColor(h, s, l, colorIntensity, enabled);
  };

  const handleIntensityChange = (value: number) => {
    setColorIntensity(value);
    localStorage.setItem('aero-intensity', String(value));
    // Re-apply with saved HSL values
    const h = parseInt(localStorage.getItem('aero-hue') || '210');
    const s = parseInt(localStorage.getItem('aero-sat') || '60');
    const l = parseInt(localStorage.getItem('aero-light') || '60');
    applyAeroColor(h, s, l, value, transparency);
  };

  const openPersonalize = useCallback(() => {
    openApp('personalize', 'Personalization', (
      <Personalization
        currentWallpaper={currentWallpaper}
        currentColorIndex={currentColorIndex}
        transparency={transparency}
        colorIntensity={colorIntensity}
        onWallpaperChange={handleWallpaperChange}
        onColorChange={handleColorChange}
        onTransparencyChange={handleTransparencyChange}
        onIntensityChange={handleIntensityChange}
        onClose={() => closeWindow('personalize')}
      />
    ), <img src={SettingsIcon.src} width={16} height={16} alt="" />);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallpaper, currentColorIndex, transparency, colorIntensity]);

  const handleAppLaunch = useCallback((id: string) => {
    switch(id) {
      case 'computer':
        openApp('computer', 'This PC', (
          <FileManager onAppLaunch={(appId: string) => handleAppLaunch(appId)} />
        ), <img src={customIconsMap['computer'] || ComputerIcon.src} width={16} height={16} alt="" />);
        break;
      case 'explorer':
        openApp('explorer', 'Windows Explorer', (
          <FileManager onAppLaunch={(appId: string) => handleAppLaunch(appId)} />
        ), <img src={customIconsMap['explorer'] || ExplorerIcon.src} width={16} height={16} alt="" />);
        break;
      case 'matchpoint':
        openApp('matchpoint', 'MatchPoint', (
          <div style={{padding: 20}}>
            <h2 style={{margin: '0 0 12px', color: '#1560b8'}}>MatchPoint</h2>
            <p style={{color: '#555', lineHeight: 1.6}}>
              A Next.js 14 desktop application built for competitive matchmaking and team coordination.
              Features real-time updates, player statistics, and tournament bracket management.
            </p>
            <div style={{marginTop: 16, padding: 12, background: '#f0f5fa', borderRadius: 4, border: '1px solid #c8d6e5'}}>
              <strong>Tech Stack:</strong> Next.js 14, TypeScript, PostgreSQL, WebSocket
            </div>
          </div>
        ), <img src={customIconsMap['matchpoint'] || MatchPointIcon.src} width={16} height={16} alt="" />);
        break;
      case 'kaonta':
        openApp('kaonta', 'Kaon Ta!', (
          <div style={{padding: 20}}>
            <h2 style={{margin: '0 0 12px', color: '#e65100'}}>Kaon Ta!</h2>
            <p style={{color: '#555', lineHeight: 1.6}}>
              A regional food service mapping platform connecting local restaurants and food vendors
              with customers. Features interactive maps, menu listings, and order tracking.
            </p>
            <div style={{marginTop: 16, padding: 12, background: '#fff3e0', borderRadius: 4, border: '1px solid #ffe0b2'}}>
              <strong>Tech Stack:</strong> React, Node.js, Mapbox, Firebase
            </div>
          </div>
        ), <img src={customIconsMap['kaonta'] || KaonTaIcon.src} width={16} height={16} alt="" />);
        break;
      case 'skills':
        openApp('skills', 'System Properties', (
          <SystemProperties onClose={() => closeWindow('skills')} />
        ), <img src={customIconsMap['skills'] || SystemIcon.src} width={16} height={16} alt="" />);
        break;
      case 'resume':
        openApp('resume', 'Resume - Nico (2026)', (
          <WebBrowser initialUrl="https://nicotags.duckdns.org/" />
        ), <img src={customIconsMap['resume'] || ResumeIcon.src} width={16} height={16} alt="" />);
        break;
      case 'portfolio':
        openApp('portfolio', 'Portfolio Gallery', (
          <div style={{padding: 20}}>
            <h2 style={{margin: '0 0 12px', color: '#c62828'}}>Portfolio Gallery</h2>
            <p style={{color: '#555', lineHeight: 1.6}}>
              Visual implementations, case studies, and design explorations showcasing
              full-stack applications and UI/UX work.
            </p>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16}}>
              {['WindowsAero OS', 'MatchPoint App', 'Kaon Ta! Maps', 'AI Tools Suite'].map(item => (
                <div key={item} style={{padding: 24, background: '#f5f5f5', borderRadius: 6, border: '1px solid #ddd', textAlign: 'center', fontWeight: 500, color: '#555'}}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ), <img src={customIconsMap['portfolio'] || PortfolioIcon.src} width={16} height={16} alt="" />);
        break;
      case 'internet':
        openApp('internet', 'Internet Explorer', (
          <WebBrowser />
        ), <img src={customIconsMap['internet'] || IEIcon.src} width={16} height={16} alt="" />);
        break;
      case 'personalize':
        openPersonalize();
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openPersonalize, customIconsMap]);

  /* ── Right-click handler ── */
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setStartOpen(false);
    const clampedX = typeof window !== 'undefined' ? Math.min(e.clientX, window.innerWidth - 200) : e.clientX;
    const clampedY = typeof window !== 'undefined' ? Math.min(e.clientY, window.innerHeight - 250) : e.clientY;
    setContextMenu({ visible: true, x: clampedX, y: clampedY });
  }, []);

  const handleContextAction = useCallback((action: string) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'personalize':
        handleAppLaunch('personalize');
        break;
      default:
        break;
    }
  }, [handleAppLaunch]);

  const handleDesktopClick = () => {
    setStartOpen(false);
    setContextMenu({ visible: false, x: 0, y: 0 });
    setIconContextMenu({ visible: false, x: 0, y: 0, iconId: '', iconSrc: '' });
    setSelectedIcons([]);
  };

  /* ── Desktop Icon Handlers ── */
  const handleIconSelectClick = useCallback((id: string, multiple: boolean) => {
    setSelectedIcons(prev => {
      if (multiple) {
        return prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id];
      }
      return [id];
    });
  }, []);
  const handleIconMove = useCallback((id: string, newX: number, newY: number) => {
    setDesktopIcons(prev => {
      const updated = prev.map(icon => icon.id === id ? { ...icon, x: newX, y: newY } : icon);
      localStorage.setItem('aero-desktop-icons', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const handleIconContextMenu = useCallback((id: string, iconSrc: string, mouseX: number, mouseY: number) => {
    setContextMenu({ visible: false, x: 0, y: 0 });
    const clampedX = typeof window !== 'undefined' ? Math.min(mouseX, window.innerWidth - 200) : mouseX;
    const clampedY = typeof window !== 'undefined' ? Math.min(mouseY, window.innerHeight - 200) : mouseY;
    setIconContextMenu({ visible: true, x: clampedX, y: clampedY, iconId: id, iconSrc });
  }, []);

  const handleChangeIconRequest = useCallback(() => {
    setIconPickerTarget(iconContextMenu.iconId);
    setIconPickerCurrentSrc(iconContextMenu.iconSrc);
    setIconContextMenu({ visible: false, x: 0, y: 0, iconId: '', iconSrc: '' });
  }, [iconContextMenu]);

  const handleIconSelect = useCallback((newSrc: string) => {
    if (!iconPickerTarget) return;

    // Update global mappings across the board
    setGlobalCustomIcons(prev => {
      const next = { ...prev, [iconPickerTarget]: newSrc };
      localStorage.setItem('aero-custom-icons', JSON.stringify(next));
      return next;
    });

    setDesktopIcons(prev => {
      const updated = prev.map(icon => icon.id === iconPickerTarget ? { ...icon, iconSrc: newSrc } : icon);
      localStorage.setItem('aero-desktop-icons', JSON.stringify(updated));
      return updated;
    });
    
    // Also live-update any currently open windows belonging to this app
    setWindows(prev => prev.map(win => {
      if (win.id === iconPickerTarget) {
        return { ...win, icon: <img src={newSrc} width={16} height={16} alt="" /> };
      }
      return win;
    }));
    
    setIconPickerTarget(null);
  }, [iconPickerTarget]);

  // Resolve current wallpaper URL
  const wallpaperUrl = wallpaperMap[currentWallpaper] || wallpaperMap['img24'];

  // Prevent flash of default wallpaper before localStorage is read on the client
  if (!mounted) {
    return <main className={styles.desktop} style={{ backgroundColor: '#000', backgroundImage: 'none' }} />;
  }

  return (
    <main 
      className={styles.desktop}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
      style={{ backgroundImage: `url(${wallpaperUrl})` }}
    >
      {/* Desktop Icons — absolutely positioned, draggable */}
      {desktopIcons.map(icon => (
        <DesktopShortcut
          key={icon.id}
          id={icon.id}
          name={icon.name}
          iconSrc={icon.iconSrc}
          x={icon.x}
          y={icon.y}
          isSelected={selectedIcons.includes(icon.id)}
          onSelect={handleIconSelectClick}
          onDoubleClick={handleAppLaunch}
          onMove={handleIconMove}
          onIconContextMenu={handleIconContextMenu}
        />
      ))}

      {/* Right-Click Context Menu */}
      {contextMenu.visible && (
        <div onClick={(e) => e.stopPropagation()}>
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onClose={() => setContextMenu({ visible: false, x: 0, y: 0 })}
            onAction={handleContextAction}
          />
        </div>
      )}

      {/* Render Open Windows */}
      {windows.map((win, i) => (
        <div key={win.id} onClick={(e) => e.stopPropagation()}>
          <Window
            id={win.id}
            title={win.title}
            icon={win.icon}
            isFocused={win.isFocused}
            isMinimized={win.isMinimized}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => minimizeWindow(win.id)}
            defaultPosition={{ x: 100 + i * 30, y: 50 + i * 30 }}
          >
            {win.content}
          </Window>
        </div>
      ))}

      {/* Taskbar & Start Menu */}
      <div onClick={(e) => e.stopPropagation()}>
        <StartMenu 
          isOpen={startOpen} 
          onProgramClick={handleAppLaunch} 
          onSystemClick={handleAppLaunch}
          customIcons={customIconsMap}
          onContextMenu={handleIconContextMenu}
        />
        
        <Taskbar
          windows={windows}
          isStartOpen={startOpen}
          onWindowClick={(id, e) => {
            e.stopPropagation();
            const win = windows.find(w => w.id === id);
            if (win?.isFocused && !win.isMinimized) {
              minimizeWindow(id);
            } else {
              focusWindow(id);
            }
          }}
          onStartClick={(e) => {
            e.stopPropagation();
            toggleStartMenu();
          }}
          onQuickLaunch={handleAppLaunch}
          customIcons={customIconsMap}
          onContextMenu={handleIconContextMenu}
        />
      </div>

      {/* Screensaver Overlay */}
      {isIdle && <BubblesScreensaver />}

      {/* Icon Right-Click Context Menu */}
      {iconContextMenu.visible && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 10000,
          }}
          onClick={() => setIconContextMenu({ visible: false, x: 0, y: 0, iconId: '', iconSrc: '' })}
          onContextMenu={(e) => { e.preventDefault(); setIconContextMenu({ visible: false, x: 0, y: 0, iconId: '', iconSrc: '' }); }}
        >
          <div
            style={{
              position: 'absolute',
              left: iconContextMenu.x,
              top: iconContextMenu.y,
              background: 'linear-gradient(180deg, #fff 0%, #f0f2f5 100%)',
              border: '1px solid #888',
              borderRadius: 4,
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              minWidth: 160,
              padding: '4px 0',
              fontFamily: "'Segoe UI', sans-serif",
              fontSize: 12,
              zIndex: 10001,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '5px 24px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit', fontWeight: 600 }}
              onClick={() => {
                handleAppLaunch(iconContextMenu.iconId);
                setIconContextMenu({ visible: false, x: 0, y: 0, iconId: '', iconSrc: '' });
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#3399ff'; (e.target as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#000'; }}
            >Open</button>
            <div style={{ height: 1, background: '#ddd', margin: '3px 0' }} />
            <button
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '5px 24px', background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}
              onClick={handleChangeIconRequest}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.background = '#3399ff'; (e.target as HTMLElement).style.color = '#fff'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = '#000'; }}
            >Change Icon...</button>
          </div>
        </div>
      )}

      {/* Icon Picker Dialog */}
      {iconPickerTarget && (
        <IconPicker
          currentIcon={iconPickerCurrentSrc}
          onSelect={handleIconSelect}
          onClose={() => setIconPickerTarget(null)}
        />
      )}
    </main>
  );
}
