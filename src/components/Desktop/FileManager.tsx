"use client";

import React, { useState } from 'react';
import styles from './FileManager.module.css';

// Importing native .ico assets
import ComputerIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import FolderIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON162_1.ico';
import HDDIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON55_1.ico';
import DocIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON19_1.ico';
import PicIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';
import MatchPointIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import KaonTaIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import SkillsIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON114_1.ico';

// Define the file system types
type FileType = 'folder' | 'app';

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  iconSrc: string;
  targetId?: string; // App ID for openApp if it's an 'app'
}

type FileSystemDict = {
  [path: string]: FileItem[];
};

// Mock File System
const fileSystem: FileSystemDict = {
  'This PC': [
    { id: 'c-drive', name: 'Local Disk (C:)', type: 'folder', iconSrc: HDDIcon.src }
  ],
  'This PC > Local Disk (C:)': [
    { id: 'projects', name: 'Projects', type: 'folder', iconSrc: FolderIcon.src },
    { id: 'sys-properties', name: 'System Properties', type: 'app', iconSrc: SkillsIcon.src, targetId: 'skills' }
  ],
  'This PC > Local Disk (C:) > Projects': [
    { id: 'matchpoint', name: 'MatchPoint.exe', type: 'app', iconSrc: MatchPointIcon.src, targetId: 'matchpoint' },
    { id: 'kaonta', name: 'Kaon Ta!.exe', type: 'app', iconSrc: KaonTaIcon.src, targetId: 'kaonta' }
  ],
  'Documents': [
    { id: 'resume', name: 'Resume.pdf', type: 'app', iconSrc: DocIcon.src, targetId: 'resume' }
  ],
  'Pictures': [
    { id: 'portfolio', name: 'Portfolio.jpeg', type: 'app', iconSrc: PicIcon.src, targetId: 'portfolio' }
  ]
};

interface FileManagerProps {
  onAppLaunch: (appId: string) => void;
}

export default function FileManager({ onAppLaunch }: FileManagerProps) {
  const [currentPath, setCurrentPath] = useState<string>('This PC');
  const [history, setHistory] = useState<string[]>(['This PC']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  const navigateTo = (path: string) => {
    if (!fileSystem[path]) return; // Path doesn't exist
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(path);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(path);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPath(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPath(history[historyIndex + 1]);
    }
  };

  const traverseUp = () => {
    const parts = currentPath.split(' > ');
    if (parts.length > 1) {
      parts.pop(); // Remove last segment
      navigateTo(parts.join(' > '));
    }
  };

  const files = fileSystem[currentPath] || [];

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(`${currentPath} > ${item.name}`);
    } else if (item.type === 'app' && item.targetId) {
      onAppLaunch(item.targetId);
    }
  };

  return (
    <div className={styles.fileManager}>
      {/* Top Address & Navigation Bar */}
      <div className={styles.topBar}>
        <div className={styles.navButtons}>
          <button className={styles.navBtn} onClick={goBack} disabled={historyIndex === 0}>←</button>
          <button className={styles.navBtn} onClick={goForward} disabled={historyIndex === history.length - 1}>→</button>
          <button className={styles.navBtn} onClick={traverseUp} disabled={!currentPath.includes('>')}>↑</button>
        </div>
        <div className={styles.addressBarContainer}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={FolderIcon.src} width={14} height={14} alt="" className={styles.addressIcon} />
          <span className={styles.addressPath}>{currentPath}</span>
        </div>
      </div>

      {/* Command Bar (Organize, Views, etc.) */}
      <div className={styles.commandBar}>
        <button className={styles.commandBtn}>Organize ▾</button>
        <button className={styles.commandBtn}>Views ▾</button>
      </div>

      {/* Main Content Area */}
      <div className={styles.mainArea}>
        {/* Navigation Pane */}
        <div className={styles.navigationPane}>
          <div className={styles.navSection}>
            <div className={styles.navHeader}>Favorite Links</div>
            <button className={`${styles.navItem} ${currentPath === 'Documents' ? styles.active : ''}`} onClick={() => navigateTo('Documents')}>
              <img src={DocIcon.src} className={styles.navIcon} alt="" />
              Documents
            </button>
            <button className={`${styles.navItem} ${currentPath === 'Pictures' ? styles.active : ''}`} onClick={() => navigateTo('Pictures')}>
              <img src={PicIcon.src} className={styles.navIcon} alt="" />
              Pictures
            </button>
            <button className={`${styles.navItem} ${currentPath === 'This PC' ? styles.active : ''}`} onClick={() => navigateTo('This PC')}>
              <img src={ComputerIcon.src} className={styles.navIcon} alt="" />
              This PC
            </button>
          </div>
          
          <div className={styles.navSection}>
            <div className={styles.navHeader}>Folders</div>
            <button className={styles.navItem} onClick={() => navigateTo('This PC > Local Disk (C:)')}>
              <img src={HDDIcon.src} className={styles.navIcon} alt="" />
              Local Disk (C:)
            </button>
          </div>
        </div>

        {/* Dynamic Content Grid */}
        <div className={styles.contentPane}>
          <div className={styles.gridContainer}>
            {files.map(item => (
              <div 
                key={item.id} 
                className={styles.fileItem} 
                onDoubleClick={() => handleItemDoubleClick(item)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.iconSrc} width={48} height={48} alt="" className={styles.fileIcon} style={{ objectFit: 'contain' }} />
                <span className={styles.fileName}>{item.name}</span>
              </div>
            ))}
            {files.length === 0 && (
              <div style={{color: '#777', fontSize: 13, gridColumn: '1 / -1'}}>This folder is empty.</div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className={styles.statusBar}>
        {files.length} item(s)
      </div>
    </div>
  );
}
