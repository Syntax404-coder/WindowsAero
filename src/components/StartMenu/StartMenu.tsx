/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StartMenu.module.css';

// Program icons
import IEIcon from '../../assets/Icons/Windows Vista/ico/shell32.dll/ICON16744_1.ico';
import MailIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON131_1.ico';
import MediaIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import PhotoIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON113_1.ico';
import ExplorerIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON162_1.ico';
import NotepadIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON103_1.ico';
import CalcIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON100_1.ico';
import ResumeIcon from '../../assets/Icons/Windows Vista/ico/shell32.dll/ICON324_1.ico';

// System link icons
import DocIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON123_1.ico';
import PicIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON113_1.ico';
import MusicIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON108_1.ico';
import GamesIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON151_1.ico';
import SearchIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON18_1.ico';
import RecentIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON115_1.ico';
import ComputerIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';
import NetworkIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON30_1.ico';
import ControlIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON114_1.ico';
import HelpIcon from '../../assets/Icons/Windows Vista/ico/shell32.dll/ICON324_1.ico';

interface StartMenuProps {
  isOpen: boolean;
  onProgramClick: (programId: string) => void;
  onSystemClick: (systemId: string) => void;
  customIcons: Record<string, string>;
}

export default function StartMenu({ isOpen, onProgramClick, onSystemClick, customIcons }: StartMenuProps) {
  const [showAllPrograms, setShowAllPrograms] = useState(false);

  const variants = {
    closed: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      transition: { duration: 0.15 }
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 400, damping: 30 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.startMenu}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
        >
          {/* Floating Profile Avatar */}
          <div className={styles.profileAvatar}>
            <div className={styles.avatarInner}></div>
          </div>

          <div className={styles.panesContainer}>
            {/* Left Pane - Programs */}
            <div className={styles.leftPane}>
              {!showAllPrograms ? (
                <div className={styles.programsList}>
                  <button className={styles.programItem} onClick={() => onProgramClick('internet')}>
                    <img src={customIcons['internet'] || IEIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Internet</div>
                      <div className={styles.programDesc}>Internet Explorer</div>
                    </div>
                  </button>
                  <button className={styles.programItem} onClick={() => onProgramClick('resume')}>
                    <img src={customIcons['resume'] || MailIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>E-mail</div>
                      <div className={styles.programDesc}>Windows Mail</div>
                    </div>
                  </button>

                  <div className={styles.programSeparator} />

                  <button className={styles.programItem} onClick={() => onProgramClick('resume')}>
                    <img src={customIcons['resume'] || ResumeIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Resume</div>
                      <div className={styles.programDesc}>Online Portfolio</div>
                    </div>
                  </button>
                  <button className={styles.programItem} onClick={() => onProgramClick('matchpoint')}>
                    <img src={customIcons['matchpoint'] || MediaIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>MatchPoint</div>
                      <div className={styles.programDesc}>Desktop App</div>
                    </div>
                  </button>
                  <button className={styles.programItem} onClick={() => onProgramClick('kaonta')}>
                    <img src={customIcons['kaonta'] || ComputerIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Kaon Ta!</div>
                      <div className={styles.programDesc}>Web Service</div>
                    </div>
                  </button>
                  <button className={styles.programItem} onClick={() => onProgramClick('explorer')}>
                    <img src={customIcons['explorer'] || ExplorerIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Windows Explorer</div>
                    </div>
                  </button>
                  <button className={styles.programItem} onClick={() => onProgramClick('skills')}>
                    <img src={customIcons['skills'] || PhotoIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Windows Photo Gallery</div>
                    </div>
                  </button>
                  <button className={styles.programItem}>
                    <img src={NotepadIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Notepad</div>
                    </div>
                  </button>
                  <button className={styles.programItem}>
                    <img src={CalcIcon.src} width={32} height={32} alt="" className={styles.programImg} />
                    <div className={styles.programText}>
                      <div className={styles.programName}>Calculator</div>
                    </div>
                  </button>
                </div>
              ) : (
                <div className={styles.allProgramsContainer}>
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('internet')}>
                    <img src={customIcons['internet'] || IEIcon.src} width={24} height={24} alt="" /> Internet Explorer
                  </button>
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('resume')}>
                    <img src={customIcons['resume'] || MailIcon.src} width={24} height={24} alt="" /> Windows Mail
                  </button>
                  <div className={styles.programSeparator} style={{ margin: '2px 0' }} />
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('explorer')}>
                    <img src={customIcons['explorer'] || ExplorerIcon.src} width={24} height={24} alt="" /> Windows Explorer
                  </button>
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('skills')}>
                    <img src={customIcons['skills'] || PhotoIcon.src} width={24} height={24} alt="" /> Windows Photo Gallery
                  </button>
                  <button className={styles.allProgramsItem}>
                    <img src={NotepadIcon.src} width={24} height={24} alt="" /> Notepad
                  </button>
                  <button className={styles.allProgramsItem}>
                    <img src={CalcIcon.src} width={24} height={24} alt="" /> Calculator
                  </button>
                  <div className={styles.programSeparator} style={{ margin: '2px 0' }} />
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('matchpoint')}>
                    <img src={customIcons['matchpoint'] || MediaIcon.src} width={24} height={24} alt="" /> MatchPoint
                  </button>
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('kaonta')}>
                    <img src={customIcons['kaonta'] || ComputerIcon.src} width={24} height={24} alt="" /> Kaon Ta!
                  </button>
                  <button className={styles.allProgramsItem} onClick={() => onProgramClick('resume')}>
                    <img src={customIcons['resume'] || ResumeIcon.src} width={24} height={24} alt="" /> Resume
                  </button>
                </div>
              )}

              <div className={styles.allPrograms}>
                <button 
                  className={styles.allProgramsBtn} 
                  onClick={() => setShowAllPrograms(!showAllPrograms)}
                >
                  {showAllPrograms ? (
                    <>
                      <span className={styles.allProgramsArrow}>◀</span> Back
                    </>
                  ) : (
                    <>
                      <span className={styles.allProgramsArrow}>▶</span> All Programs
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Pane - System Links */}
            <div className={styles.rightPane}>
              {/* Profile Name */}
              <div className={styles.profileName}>mobusr</div>

              <div className={styles.systemLinksContainer}>
                <button className={styles.systemLink} onClick={() => onSystemClick('resume')}>
                  <img src={customIcons['resume'] || DocIcon.src} width={22} height={22} alt="" />
                  <span>Documents</span>
                </button>
                <button className={styles.systemLink} onClick={() => onSystemClick('portfolio')}>
                  <img src={customIcons['portfolio'] || PicIcon.src} width={22} height={22} alt="" />
                  <span>Pictures</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={MusicIcon.src} width={22} height={22} alt="" />
                  <span>Music</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={GamesIcon.src} width={22} height={22} alt="" />
                  <span>Games</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={SearchIcon.src} width={22} height={22} alt="" />
                  <span>Search</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={RecentIcon.src} width={22} height={22} alt="" />
                  <span>Recent Items</span>
                  <span className={styles.submenuArrow}>▸</span>
                </button>

                <div className={styles.separator} />

                <button className={styles.systemLink} onClick={() => onSystemClick('explorer')}>
                  <img src={customIcons['explorer'] || ComputerIcon.src} width={22} height={22} alt="" />
                  <span>Computer</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={customIcons['network'] || NetworkIcon.src} width={22} height={22} alt="" />
                  <span>Network</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={ComputerIcon.src} width={22} height={22} alt="" />
                  <span>Connect To</span>
                </button>

                <div className={styles.separator} />

                <button className={styles.systemLink} onClick={() => onSystemClick('skills')}>
                  <img src={customIcons['skills'] || ControlIcon.src} width={22} height={22} alt="" />
                  <span>Control Panel</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={ControlIcon.src} width={22} height={22} alt="" />
                  <span>Default Programs</span>
                </button>
                <button className={styles.systemLink}>
                  <img src={HelpIcon.src} width={22} height={22} alt="" />
                  <span>Help and Support</span>
                </button>
              </div>
            </div>
          </div>

          {/* Shutdown Footer */}
          <div className={styles.shutdownFooter}>
            <div className={styles.footerLeft}>
              <button className={styles.footerBtn} title="Start Search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </button>
              <input type="text" className={styles.searchInput} placeholder="Start Search" />
            </div>
            <div className={styles.footerRight}>
              <button className={styles.powerBtn} title="Lock">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </button>
              <button className={styles.shutdownBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18.36 6.64a9 9 0 11-12.73 0" />
                  <line x1="12" y1="2" x2="12" y2="12" />
                </svg>
                <span className={styles.shutdownArrow}>▸</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
