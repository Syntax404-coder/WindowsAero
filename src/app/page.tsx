"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import Window from '../components/Desktop/Window';
import Taskbar from '../components/Taskbar/Taskbar';
import StartMenu from '../components/StartMenu/StartMenu';
import DesktopShortcut from '../components/Desktop/DesktopShortcut';
import { Newspaper, Hammer, GraduationCap, Briefcase, FileText } from 'lucide-react';

interface WindowState {
  id: string;
  title: string;
  isFocused: boolean;
  isMinimized: boolean;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

export default function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [startOpen, setStartOpen] = useState(false);

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
    setStartOpen(false); // Close start menu when opening app
    
    // Check if already open
    const existing = windows.find(w => w.id === appId);
    if (existing) {
      focusWindow(appId);
      return;
    }

    // Add new window
    setWindows(prev => [
      ...prev.map(w => ({ ...w, isFocused: false })),
      { id: appId, title, isFocused: true, isMinimized: false, content, icon }
    ]);
  };

  const handleAppLaunch = (id: string) => {
    switch(id) {
      case 'matchpoint':
        openApp('matchpoint', 'MatchPoint', <div style={{padding: 20}}>MatchPoint Desktop Application (Next.js 14)</div>, <Briefcase size={16}/>);
        break;
      case 'kaonta':
        openApp('kaonta', 'Kaon Ta!', <div style={{padding: 20}}>Kaon Ta! Regional Food Service Mapping</div>, <Newspaper size={16}/>);
        break;
      case 'skills':
        openApp('skills', 'System Properties - Skills', (
          <div style={{padding: 20}}>
            <h3>Technical Certifications</h3>
            <ul>
              <li>DevOps Engineering (Docker, CI/CD)</li>
              <li>AI Specialization (GPT, Prompt Engineering, Agentic Mode)</li>
            </ul>
          </div>
        ), <Hammer size={16}/>);
        break;
      case 'resume':
        openApp('resume', 'Resume - Nico (2026)', <div style={{padding: 20}}>Software Engineer - AI Major</div>, <FileText size={16}/>);
        break;
      case 'portfolio':
        openApp('portfolio', 'Portfolio Gallery', <div style={{padding: 20}}>Visual implementations and case studies</div>, <GraduationCap size={16}/>);
        break;
    }
  };

  return (
    <main 
      className={styles.desktop}
      onClick={() => setStartOpen(false)}
    >
      {/* Desktop Icons Area */}
      <div className={styles.iconGrid}>
        <DesktopShortcut 
          id="matchpoint" 
          name="MatchPoint" 
          fallbackText="M" 
          onDoubleClick={handleAppLaunch} 
        />
        <DesktopShortcut 
          id="kaonta" 
          name="Kaon Ta!" 
          fallbackText="K" 
          onDoubleClick={handleAppLaunch} 
        />
      </div>

      {/* Render Open Windows */}
      {windows.map((win, i) => (
        <Window
          key={win.id}
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
      ))}

      {/* Taskbar & Start Menu */}
      <StartMenu 
        isOpen={startOpen} 
        onProgramClick={handleAppLaunch}
        onSystemClick={handleAppLaunch}
      />
      
      <Taskbar
        windows={windows}
        isStartOpen={startOpen}
        onWindowClick={(id) => {
          const win = windows.find(w => w.id === id);
          if (win?.isFocused && !win.isMinimized) {
            minimizeWindow(id);
          } else {
            focusWindow(id);
          }
        }}
        onStartClick={() => {
          toggleStartMenu();
        }}
      />
    </main>
  );
}
