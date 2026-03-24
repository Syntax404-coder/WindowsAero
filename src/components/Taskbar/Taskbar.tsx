"use client";

import React, { useState, useEffect } from 'react';
import styles from './Taskbar.module.css';
import aeroStyles from '../../styles/AeroGlass.module.css';
import StartOrb from './StartOrb';

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
}

export default function Taskbar({ windows, onWindowClick, onStartClick, isStartOpen }: TaskbarProps) {
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
