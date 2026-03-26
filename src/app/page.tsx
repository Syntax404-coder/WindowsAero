/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useCallback } from 'react';
import styles from './page.module.css';
import Window from '../components/Desktop/Window';
import Taskbar from '../components/Taskbar/Taskbar';
import StartMenu from '../components/StartMenu/StartMenu';
import DesktopShortcut from '../components/Desktop/DesktopShortcut';
import ContextMenu from '../components/Desktop/ContextMenu';
import SystemProperties from '../components/Desktop/SystemProperties';
import FileManager from '../components/Desktop/FileManager';

import MatchPointIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import ComputerIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import KaonTaIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import SystemIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON114_1.ico';
import ResumeIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON19_1.ico';
import PortfolioIcon from '../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';

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

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0 });

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

  const handleAppLaunch = (id: string) => {
    switch(id) {
      case 'explorer':
        openApp('explorer', 'This PC', (
          <FileManager onAppLaunch={handleAppLaunch} />
        ), <img src={ComputerIcon.src} width={16} height={16} alt="" />);
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
        ), <img src={MatchPointIcon.src} width={16} height={16} alt="" />);
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
        ), <img src={KaonTaIcon.src} width={16} height={16} alt="" />);
        break;
      case 'skills':
        openApp('skills', 'System Properties', (
          <SystemProperties onClose={() => closeWindow('skills')} />
        ), <img src={SystemIcon.src} width={16} height={16} alt="" />);
        break;
      case 'resume':
        openApp('resume', 'Resume - Nico (2026)', (
          <div style={{padding: 20}}>
            <h2 style={{margin: '0 0 8px', color: '#2e7d32'}}>Nico</h2>
            <p style={{color: '#777', fontSize: 13, marginBottom: 16}}>Software Engineer — AI Major, WVSU 2026</p>
            <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
              <div style={{padding: 12, background: '#f0f5fa', borderRadius: 4, border: '1px solid #c8d6e5'}}>
                <strong>Education:</strong> West Visayas State University — BS in Computer Science, AI Major
              </div>
              <div style={{padding: 12, background: '#f0f5fa', borderRadius: 4, border: '1px solid #c8d6e5'}}>
                <strong>Focus Areas:</strong> Full Stack Development, DevOps, AI/ML Engineering
              </div>
              <div style={{padding: 12, background: '#f0f5fa', borderRadius: 4, border: '1px solid #c8d6e5'}}>
                <strong>Tools:</strong> React, Next.js, TypeScript, Python, Docker, GitHub Actions
              </div>
            </div>
          </div>
        ), <img src={ResumeIcon.src} width={16} height={16} alt="" />);
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
        ), <img src={PortfolioIcon.src} width={16} height={16} alt="" />);
        break;
    }
  };

  /* ── Right-click handler ── */
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setStartOpen(false);
    setContextMenu({ visible: true, x: e.clientX, y: e.clientY });
  }, []);

  const handleContextAction = useCallback((action: string) => {
    switch (action) {
      case 'refresh':
        window.location.reload();
        break;
      case 'personalize':
        handleAppLaunch('skills');
        break;
      default:
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDesktopClick = () => {
    setStartOpen(false);
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  return (
    <main 
      className={styles.desktop}
      onClick={handleDesktopClick}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons Area */}
      <div className={styles.iconGrid}>
        <DesktopShortcut 
          id="explorer" 
          name="This PC" 
          iconSrc={ComputerIcon.src}
          onDoubleClick={handleAppLaunch} 
        />
        <DesktopShortcut 
          id="skills" 
          name="System Properties" 
          iconSrc={SystemIcon.src}
          onDoubleClick={handleAppLaunch} 
        />
        <DesktopShortcut 
          id="resume" 
          name="Resume" 
          iconSrc={ResumeIcon.src}
          onDoubleClick={handleAppLaunch} 
        />
      </div>

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
        />
      </div>
    </main>
  );
}
