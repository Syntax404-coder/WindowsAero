"use client";

import React, { useState } from 'react';
import styles from './ContextMenu.module.css';

import FolderIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON162_1.ico';
import ShortcutIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON165_1.ico';

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onAction: (action: string) => void;
}

export default function ContextMenu({ x, y, onClose, onAction }: ContextMenuProps) {
  const [showNewSubmenu, setShowNewSubmenu] = useState(false);

  const menuWidth = 220;
  const menuHeight = 380;
  const adjustedX = Math.min(x, window.innerWidth - menuWidth - 10);
  const adjustedY = Math.min(y, window.innerHeight - menuHeight - 10);

  const handleItemClick = (action: string) => {
    onAction(action);
    onClose();
  };

  // Position submenu: try to open to the right, flip left if no room
  const subMenuLeft = (adjustedX + menuWidth + 200) < window.innerWidth
    ? menuWidth - 4
    : -(200 - 4);

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

        {/* New — with submenu */}
        <div
          className={styles.submenuParent}
          onMouseEnter={() => setShowNewSubmenu(true)}
          onMouseLeave={() => setShowNewSubmenu(false)}
        >
          <button className={`${styles.menuItem} ${showNewSubmenu ? styles.menuItemActive : ''}`}>
            <span className={styles.menuIcon}></span>
            <span className={styles.menuLabel}>New</span>
            <span className={styles.menuShortcut}>▸</span>
          </button>

          {/* Submenu flyout */}
          {showNewSubmenu && (
            <div
              className={styles.contextMenu}
              style={{
                position: 'absolute',
                left: subMenuLeft,
                top: -3,
                minWidth: '200px',
              }}
            >
              {/* Folder */}
              <button className={styles.menuItem} onClick={() => handleItemClick('new-folder')}>
                <span className={styles.menuIcon}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FolderIcon.src} width={14} height={14} alt="" />
                </span>
                <span className={styles.menuLabel}>Folder</span>
              </button>

              {/* Shortcut */}
              <button className={styles.menuItem} onClick={() => handleItemClick('new-shortcut')}>
                <span className={styles.menuIcon}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ShortcutIcon.src} width={14} height={14} alt="" />
                </span>
                <span className={styles.menuLabel}>Shortcut</span>
              </button>

              <div className={styles.separator} />

              {/* Bitmap image */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Bitmap image</span>
              </button>

              {/* Contact */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Contact</span>
              </button>

              {/* Journal Document */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Journal Document</span>
              </button>

              {/* Rich Text Document */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Rich Text Document</span>
              </button>

              {/* Text Document */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Text Document</span>
              </button>

              {/* Compressed (zipped) Folder */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Compressed (zipped) Folder</span>
              </button>

              {/* Briefcase */}
              <button className={`${styles.menuItem} ${styles.disabled}`}>
                <span className={styles.menuIcon}></span>
                <span className={styles.menuLabel}>Briefcase</span>
              </button>
            </div>
          )}
        </div>

        <div className={styles.separator} />

        {/* Screen resolution */}
        <button className={styles.menuItem} onClick={() => handleItemClick('display')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Screen resolution</span>
        </button>

        {/* Gadgets */}
        <button className={`${styles.menuItem} ${styles.disabled}`}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Gadgets</span>
        </button>

        {/* Personalize */}
        <button className={styles.menuItem} onClick={() => handleItemClick('personalize')}>
          <span className={styles.menuIcon}></span>
          <span className={styles.menuLabel}>Personalize</span>
        </button>
      </div>
    </div>
  );
}
