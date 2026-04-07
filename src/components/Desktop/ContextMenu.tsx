"use client";

import React from 'react';
import styles from './ContextMenu.module.css';

import MonitorIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON110_1.ico';
import SettingsIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function ContextMenu({ x, y, onClose, onAction }: ContextMenuProps) {
  // Keep menu within viewport bounds
  const menuWidth = 220;
  const menuHeight = 340;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight - 10);

  const handleItemClick = (action: string) => {
    onAction(action);
    onClose();
  };

  return (
    <div className={styles.contextMenuOverlay} onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }}>
      <div
        className={styles.contextMenu}
        style={{ left: adjustedX, top: adjustedY }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* View */}
        <button className={styles.menuItem} onClick={() => handleItemClick('view')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>View</span>
          <span className={styles.menuShortcut}>▸</span>
        </button>

        {/* Sort By */}
        <button className={styles.menuItem} onClick={() => handleItemClick('sort')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Sort by</span>
          <span className={styles.menuShortcut}>▸</span>
        </button>

        {/* Refresh */}
        <button className={styles.menuItem} onClick={() => handleItemClick('refresh')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Refresh</span>
        </button>

        <div className={styles.separator} />

        {/* Paste */}
        <button className={`${styles.menuItem} ${styles.disabled}`}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Paste</span>
          <span className={styles.menuShortcut}>Ctrl+V</span>
        </button>

        {/* Paste Shortcut */}
        <button className={`${styles.menuItem} ${styles.disabled}`}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Paste shortcut</span>
        </button>

        <div className={styles.separator} />

        {/* New */}
        <button className={styles.menuItem} onClick={() => handleItemClick('new-folder')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>New</span>
          <span className={styles.menuShortcut}>▸</span>
        </button>

        <div className={styles.separator} />

        {/* Open Terminal */}
        <button className={styles.menuItem} onClick={() => handleItemClick('terminal')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Open Terminal</span>
        </button>

        {/* Screen Resolution */}
        <button className={styles.menuItem} onClick={() => handleItemClick('display')}>
          <span className={styles.menuIcon}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={MonitorIcon.src} width={14} height={14} alt="" />
          </span>
          <span className={styles.menuLabel}>Screen Resolution</span>
        </button>

        <div className={styles.separator} />

        {/* Personalize */}
        <button className={styles.menuItem} onClick={() => handleItemClick('personalize')}>
          <span className={styles.menuIcon}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SettingsIcon.src} width={14} height={14} alt="" />
          </span>
          <span className={styles.menuLabel}>Personalize</span>
        </button>
      </div>
    </div>
  );
}
