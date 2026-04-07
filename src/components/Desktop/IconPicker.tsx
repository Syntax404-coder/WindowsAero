/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import styles from './IconPicker.module.css';

import { ALL_ICONS } from './AllIcons';

const ICONS = ALL_ICONS;


interface IconPickerProps {
  currentIcon: string;
  onSelect: (newSrc: string) => void;
  onClose: () => void;
}

export default function IconPicker({ currentIcon, onSelect, onClose }: IconPickerProps) {
  const [selected, setSelected] = useState<string>(currentIcon);

  const handleOk = () => {
    onSelect(selected);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleBar}>
          <span>Change Icon</span>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div className={styles.body}>
          <p className={styles.instruction}>
            Select an icon from the list below:
          </p>

          <div className={styles.iconGrid}>
            {ICONS.map((icon) => (
              <button
                key={icon.name}
                className={`${styles.iconBtn} ${selected === icon.src ? styles.iconSelected : ''}`}
                onClick={() => setSelected(icon.src)}
                title={icon.name}
              >
                <img src={icon.src} alt={icon.name} width={32} height={32} />
              </button>
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.dialogBtn} onClick={handleOk}>OK</button>
          <button className={styles.dialogBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
