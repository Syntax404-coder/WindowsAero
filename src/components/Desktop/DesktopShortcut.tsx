"use client";

import React, { useState } from 'react';
import styles from './Shortcut.module.css';

interface ShortcutProps {
  id: string;
  name: string;
  iconSrc?: string;
  onDoubleClick: (id: string) => void;
}

export default function DesktopShortcut({ id, name, iconSrc, onDoubleClick }: ShortcutProps) {
  const [isSelected, setIsSelected] = useState(false);

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt={name} className={styles.iconImage} />
        {/* Shortcut arrow overlay */}
        <div className={styles.shortcutArrow}>
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1,1 L1,9 L9,9 L9,5 L5,5 L5,1 Z" fill="#fff" stroke="#333" strokeWidth="0.8" />
            <path d="M5,1 L9,1 L9,5" fill="none" stroke="#333" strokeWidth="1" />
            <path d="M5,5 L9,1" fill="none" stroke="#00f" strokeWidth="0.8" />
          </svg>
        </div>
      </div>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{name}</span>
      </div>
    </div>
  );
}
