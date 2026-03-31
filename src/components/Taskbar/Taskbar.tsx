"use client";

import React, { useState, useEffect } from 'react';
import styles from './Taskbar.module.css';
import aeroStyles from '../../styles/AeroGlass.module.css';
import StartOrb from './StartOrb';
import ExplorerIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON73_1.ico';
import IEIcon from '../../assets/Icons/Windows Vista/ico/shell32.dll/ICON16744_1.ico';

interface WindowState {
  id: string;
  title: string;
  isFocused: boolean;
  isMinimized: boolean;
  icon?: React.ReactNode;
}

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string, e: React.MouseEvent) => void;
  onStartClick: (e: React.MouseEvent) => void;
  isStartOpen: boolean;
  onQuickLaunch?: (id: string, e: React.MouseEvent) => void;
}

export default function Taskbar({ windows, onWindowClick, onStartClick, isStartOpen, onQuickLaunch }: TaskbarProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${styles.taskbar} ${aeroStyles.glassStrong}`}>
      {/* Start Button Area */}
      <div className={styles.startArea}>
        <StartOrb onClick={onStartClick} isOpen={isStartOpen} />
      </div>

      {/* Quick Launch Area */}
      {onQuickLaunch && (
        <div className={styles.quickLaunchArea}>
          <button 
            className={styles.quickLaunchBtn} 
            onClick={(e) => onQuickLaunch('explorer', e)}
            title="File Explorer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ExplorerIcon.src} width={24} height={24} alt="File Explorer" style={{ objectFit: 'contain' }} />
          </button>
          <button 
            className={styles.quickLaunchBtn} 
            onClick={(e) => onQuickLaunch('internet', e)}
            title="Internet Explorer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IEIcon.src} width={24} height={24} alt="Internet Explorer" style={{ objectFit: 'contain' }} />
          </button>
        </div>
      )}

      {/* Center Programs Area */}
      <div className={styles.programsArea}>
        {windows.map((win) => (
          <button
            key={win.id}
            onClick={(e) => onWindowClick(win.id, e)}
            className={`${styles.taskbarItem} ${win.isFocused && !win.isMinimized ? styles.activeItem : ''}`}
          >
            {win.icon && <span className={styles.itemIcon}>{win.icon}</span>}
            <span className={styles.itemTitle}>{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray Area */}
      <div className={styles.systemTray}>
        <div className={styles.trayIcons}>
          {/* Network */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7}}>
            <path d="M5 12.55a11 11 0 0114.08 0" />
            <path d="M1.42 9a16 16 0 0121.16 0" />
            <path d="M8.53 16.11a6 6 0 016.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
          {/* Volume */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{opacity: 0.7}}>
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(255,255,255,0.3)" />
            <path d="M19.07 4.93a10 10 0 010 14.14" />
            <path d="M15.54 8.46a5 5 0 010 7.07" />
          </svg>
        </div>
        <div className={styles.clock}>
          {time}
        </div>
      </div>
    </div>
  );
}
