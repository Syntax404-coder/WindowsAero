"use client";

import React, { useState, useEffect } from 'react';
import styles from './Taskbar.module.css';
import aeroStyles from '../../styles/AeroGlass.module.css';
import StartOrb from './StartOrb';
import ExplorerIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON162_1.ico';

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
          {/* Generic Network / Audio icons could go here */}
        </div>
        <div className={styles.clock}>
          {time}
        </div>
      </div>
    </div>
  );
}
