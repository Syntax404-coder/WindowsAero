/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import styles from './IconPicker.module.css';

// Static imports — ONLY icons that exist in imageres.dll
import I25 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import I10 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON10_1.ico';
import I100 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON100_1.ico';
import I101 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON101_1.ico';
import I102 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON102_1.ico';
import I103 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON103_1.ico';
import I104 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON104_1.ico';
import I105 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON105_1.ico';
import I106 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON106_1.ico';
import I107 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON107_1.ico';
import I108 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON108_1.ico';
import I109 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON109_1.ico';
import I110 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON110_1.ico';
import I111 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON111_1.ico';
import I112 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON112_1.ico';
import I113 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON113_1.ico';
import I114 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON114_1.ico';
import I115 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON115_1.ico';
import I116 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON116_1.ico';
import I117 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON117_1.ico';
import I119 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON119_1.ico';
import I120 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON120_1.ico';
import I121 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON121_1.ico';
import I122 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON122_1.ico';
import I123 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON123_1.ico';
import I124 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON124_1.ico';
import I125 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON125_1.ico';
import I126 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON126_1.ico';
import I127 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON127_1.ico';
import I128 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON128_1.ico';
import I129 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON129_1.ico';
import I130 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import I131 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON131_1.ico';
import I132 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON132_1.ico';
import I133 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON133_1.ico';
import I134 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON134_1.ico';
import I135 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON135_1.ico';
import I136 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON136_1.ico';
import I137 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON137_1.ico';
import I138 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON138_1.ico';
import I139 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON139_1.ico';
import I140 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON140_1.ico';
import I141 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON141_1.ico';
import I142 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON142_1.ico';
import I143 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON143_1.ico';
import I144 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON144_1.ico';
import I145 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON145_1.ico';
import I146 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON146_1.ico';
import I147 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON147_1.ico';
import I148 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON148_1.ico';
import I149 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON149_1.ico';
import I150 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON150_1.ico';
import I151 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';
import I152 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON152_1.ico';
import I155 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON155_1.ico';
import I158 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON158_1.ico';
import I159 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON159_1.ico';
import I160 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON160_1.ico';
import I161 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON161_1.ico';
import I162 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON162_1.ico';
import I163 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON163_1.ico';
import I164 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON164_1.ico';
import I165 from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON165_1.ico';

const ICONS: { name: string; src: string }[] = [
  { name: 'Computer', src: I25.src }, { name: 'Folder', src: I10.src },
  { name: 'Globe', src: I100.src }, { name: 'Shield', src: I101.src },
  { name: 'Lock', src: I102.src }, { name: 'Key', src: I103.src },
  { name: 'Users', src: I104.src }, { name: 'User', src: I105.src },
  { name: 'Star', src: I106.src }, { name: 'Heart', src: I107.src },
  { name: 'Camera', src: I108.src }, { name: 'Music', src: I109.src },
  { name: 'Monitor', src: I110.src }, { name: 'Printer', src: I111.src },
  { name: 'Network', src: I112.src }, { name: 'Phone', src: I113.src },
  { name: 'System', src: I114.src }, { name: 'Settings', src: I115.src },
  { name: 'Clipboard', src: I116.src }, { name: 'Document', src: I117.src },
  { name: 'Search', src: I119.src }, { name: 'Mail', src: I120.src },
  { name: 'Calendar', src: I121.src }, { name: 'Clock', src: I122.src },
  { name: 'Power', src: I123.src }, { name: 'Disk', src: I124.src },
  { name: 'CD', src: I125.src }, { name: 'USB', src: I126.src },
  { name: 'Wireless', src: I127.src }, { name: 'Bluetooth', src: I128.src },
  { name: 'Battery', src: I129.src }, { name: 'App', src: I130.src },
  { name: 'Game', src: I131.src }, { name: 'Movie', src: I132.src },
  { name: 'Image', src: I133.src }, { name: 'Audio', src: I134.src },
  { name: 'Text', src: I135.src }, { name: 'Chart', src: I136.src },
  { name: 'Database', src: I137.src }, { name: 'Server', src: I138.src },
  { name: 'Security', src: I139.src }, { name: 'Warning', src: I140.src },
  { name: 'Error', src: I141.src }, { name: 'Info', src: I142.src },
  { name: 'Help', src: I143.src }, { name: 'Tools', src: I144.src },
  { name: 'Wrench', src: I145.src }, { name: 'Paintbrush', src: I146.src },
  { name: 'Refresh', src: I147.src }, { name: 'Download', src: I148.src },
  { name: 'Upload', src: I149.src }, { name: 'Terminal', src: I150.src },
  { name: 'Control', src: I151.src }, { name: 'Admin', src: I152.src },
  { name: 'Restore', src: I155.src }, { name: 'Share', src: I158.src },
  { name: 'Link', src: I159.src }, { name: 'Bookmark', src: I160.src },
  { name: 'Flag', src: I161.src }, { name: 'Folder2', src: I162.src },
  { name: 'Archive', src: I163.src }, { name: 'Trash', src: I164.src },
  { name: 'Sort', src: I165.src },
];

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
