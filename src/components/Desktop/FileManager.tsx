"use client";

import React, { useState } from 'react';
import styles from './FileManager.module.css';

// Importing native .ico assets
import ComputerIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import FolderIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON162_1.ico';
import HDDIcon from '../../assets/Icons/Windows Vista/ico/shell32.dll/ICON305_1.ico';
import DocIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON123_1.ico';
import PicIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON113_1.ico';
import MatchPointIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import KaonTaIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import SkillsIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON114_1.ico';
import ResumeIcon from '../../assets/Icons/Windows Vista/ico/shell32.dll/ICON324_1.ico';

import MusicIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON108_1.ico';
import RecentIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON115_1.ico';
import SearchIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON18_1.ico';
import PublicIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON30_1.ico';

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
    { id: 'resume', name: 'Resume', type: 'app', iconSrc: ResumeIcon.src, targetId: 'resume' }
  ],
  'Images': [
    { id: 'portfolio', name: 'Portfolio.jpeg', type: 'app', iconSrc: PicIcon.src, targetId: 'portfolio' }
  ],
  'Music': [],
  'Recently Changed': [],
  'Searches': [],
  'Public': []
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

  const files = fileSystem[currentPath] || [];

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateTo(`${currentPath} > ${item.name}`);
    } else if (item.type === 'app' && item.targetId) {
      onAppLaunch(item.targetId);
    }
  };

  const navigateToLevel = (index: number) => {
    const parts = currentPath.split(' > ');
    const newPath = parts.slice(0, index + 1).join(' > ');
    navigateTo(newPath);
  };

  const getPathIcon = () => {
    if (currentPath === 'Documents') return DocIcon.src;
    if (currentPath === 'Images') return PicIcon.src;
    if (currentPath === 'Music') return MusicIcon.src;
    if (currentPath === 'This PC') return ComputerIcon.src;
    return FolderIcon.src;
  };

  const pathParts = currentPath.split(' > ');

  return (
    <div className={styles.fileManager}>
      {/* Top Address & Navigation Bar */}
      <div className={styles.topBar}>
        <div className={styles.navCluster}>
          <div className={styles.navCapsule} />
          <button 
            className={`${styles.navBtn} ${styles.backBtn} ${historyIndex > 0 ? styles.activeBlue : ''}`} 
            onClick={goBack} 
            disabled={historyIndex === 0}
          >
            <div className={styles.arrowIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </div>
          </button>
          <button 
            className={`${styles.navBtn} ${styles.forwardBtn} ${historyIndex < history.length - 1 ? styles.activeBlue : ''}`} 
            onClick={goForward} 
            disabled={historyIndex === history.length - 1}
          >
            <div className={styles.arrowIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 19l7-7-7-7" />
              </svg>
            </div>
          </button>
          <div className={styles.navDropdown} />
        </div>

        <div className={styles.addressBarWrapper}>
          <div className={styles.addressBarContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={getPathIcon()} width={16} height={16} alt="" className={styles.addressIcon} />
            <div className={styles.breadcrumbList}>
              {pathParts.map((part, index) => (
                <React.Fragment key={index}>
                  <div className={styles.breadcrumbItem} onClick={() => navigateToLevel(index)}>
                    {part}
                  </div>
                  {index < pathParts.length - 1 && (
                    <div className={styles.breadcrumbChevron}>▸</div>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className={styles.addressRefresh}>
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
              </svg>
            </div>
          </div>
          
          <div className={styles.searchBox}>
            <img src={SearchIcon.src} width={14} height={14} alt="" className={styles.searchIcon} />
            <input type="text" className={styles.searchInput} placeholder="Search" />
          </div>
        </div>
      </div>

      {/* Command Bar (Organize, Views, etc.) */}
      <div className={styles.commandBar}>
        <button className={styles.commandBtn}>Organize ▾</button>
        <button className={styles.commandBtn}>Views ▾</button>
        <div style={{flex: 1}} />
        <button className={styles.commandBtn}>?</button>
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
            <button className={`${styles.navItem} ${currentPath === 'Images' ? styles.active : ''}`} onClick={() => navigateTo('Images')}>
              <img src={PicIcon.src} className={styles.navIcon} alt="" />
              Images
            </button>
            <button className={`${styles.navItem} ${currentPath === 'Music' ? styles.active : ''}`} onClick={() => navigateTo('Music')}>
              <img src={MusicIcon.src} className={styles.navIcon} alt="" />
              Music
            </button>
            <button className={`${styles.navItem} ${currentPath === 'Recently Changed' ? styles.active : ''}`} onClick={() => navigateTo('Recently Changed')}>
              <img src={RecentIcon.src} className={styles.navIcon} alt="" />
              Recently Changed
            </button>
            <button className={`${styles.navItem} ${currentPath === 'Searches' ? styles.active : ''}`} onClick={() => navigateTo('Searches')}>
              <img src={SearchIcon.src} className={styles.navIcon} alt="" />
              Searches
            </button>
            <button className={`${styles.navItem} ${currentPath === 'Public' ? styles.active : ''}`} onClick={() => navigateTo('Public')}>
              <img src={PublicIcon.src} className={styles.navIcon} alt="" />
              Public
            </button>
          </div>
          
          <div className={styles.navSection}>
            <div className={styles.navHeader}>Folders</div>
            <button className={`${styles.navItem} ${currentPath === 'This PC' ? styles.active : ''}`} onClick={() => navigateTo('This PC')}>
              <img src={ComputerIcon.src} className={styles.navIcon} alt="" />
              This PC
            </button>
            <button className={`${styles.navItem} ${currentPath.includes('Local Disk (C:)') ? styles.active : ''}`} onClick={() => navigateTo('This PC > Local Disk (C:)')}>
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
              <div style={{color: '#777', fontSize: 13, gridColumn: '1 / -1', textAlign: 'center', marginTop: 40}}>
                <img src={getPathIcon()} width={64} height={64} alt="" style={{opacity: 0.2, marginBottom: 10}} />
                <div>This folder is empty.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Details Pane */}
      <div className={styles.detailsPane}>
        <div className={styles.previewIconContainer}>
          <img src={getPathIcon()} width={32} height={32} alt="" />
        </div>
        <div className={styles.detailsInfo}>
          <div className={styles.itemCount}>{files.length} item{files.length !== 1 ? 's' : ''}</div>
          <div className={styles.pathBreadcrumb}>{currentPath.replace(/ > /g, ' \u203A ')}</div>
        </div>
      </div>
    </div>
  );
}
