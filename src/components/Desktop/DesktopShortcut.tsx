"use client";

import React, { useState } from 'react';
import styles from './Shortcut.module.css';

interface ShortcutProps {
  id: string;
  name: string;
  iconSrc?: string;
  fallbackText: string;
  onDoubleClick: (id: string) => void;
}

export default function DesktopShortcut({ id, name, iconSrc, fallbackText, onDoubleClick }: ShortcutProps) {
  const [isSelected, setIsSelected] = useState(false);

  // We could use Framer Motion, but basic CSS states are fine for icons
  return (
    <div
      className={`${styles.shortcutContainer} ${isSelected ? styles.selected : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        setIsSelected(true);
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick(id);
      }}
    >
      <div className={styles.iconWrapper}>
        {iconSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={iconSrc} alt={name} className={styles.iconImage} />
        ) : (
          <div className={styles.fallbackIcon}>{fallbackText}</div>
        )}
      </div>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{name}</span>
      </div>
    </div>
  );
}
