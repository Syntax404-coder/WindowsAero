"use client";

import React, { useState } from 'react';
import styles from './Shortcut.module.css';
import { Briefcase, Utensils, Hammer, FileText, GraduationCap } from 'lucide-react';

interface ShortcutProps {
  id: string;
  name: string;
  iconSrc?: string;
  fallbackText: string;
  onDoubleClick: (id: string) => void;
}

/* Maps shortcut IDs to glossy icon configs */
const iconConfig: Record<string, { icon: React.ComponentType<{size: number; color?: string; strokeWidth?: number}>; gradient: string }> = {
  matchpoint: {
    icon: Briefcase,
    gradient: 'linear-gradient(135deg, #1e88e5 0%, #0d47a1 40%, #1565c0 60%, #42a5f5 100%)',
  },
  kaonta: {
    icon: Utensils,
    gradient: 'linear-gradient(135deg, #ff9800 0%, #e65100 40%, #f57c00 60%, #ffb74d 100%)',
  },
  skills: {
    icon: Hammer,
    gradient: 'linear-gradient(135deg, #7b1fa2 0%, #4a148c 40%, #6a1b9a 60%, #ba68c8 100%)',
  },
  resume: {
    icon: FileText,
    gradient: 'linear-gradient(135deg, #43a047 0%, #1b5e20 40%, #2e7d32 60%, #66bb6a 100%)',
  },
  portfolio: {
    icon: GraduationCap,
    gradient: 'linear-gradient(135deg, #e53935 0%, #b71c1c 40%, #c62828 60%, #ef5350 100%)',
  },
};

export default function DesktopShortcut({ id, name, iconSrc, fallbackText, onDoubleClick }: ShortcutProps) {
  const [isSelected, setIsSelected] = useState(false);

  const config = iconConfig[id];
  const IconComponent = config?.icon;

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
          <div 
            className={styles.glossyIcon}
            style={{ background: config?.gradient || 'linear-gradient(135deg, #1560b8, #6dd5f5)' }}
          >
            {/* Glass reflection overlay */}
            <div className={styles.iconReflection} />
            {/* Icon */}
            {IconComponent ? (
              <IconComponent size={24} color="#fff" strokeWidth={1.8} />
            ) : (
              <span className={styles.fallbackLetter}>{fallbackText}</span>
            )}
          </div>
        )}
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
