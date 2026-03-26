"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './StartMenu.module.css';
import aeroStyles from '../../styles/AeroGlass.module.css';
import MatchPointIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON130_1.ico';
import KaonTaIcon from '../../assets/Icons/Windows Vista/ico/imageres.dll/ICON25_1.ico';

interface StartMenuProps {
  isOpen: boolean;
  onProgramClick: (programId: string) => void;
  onSystemClick: (systemId: string) => void;
}

export default function StartMenu({ isOpen, onProgramClick, onSystemClick }: StartMenuProps) {
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
          className={`${styles.startMenu} ${aeroStyles.glassStrong}`}
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}
        >
          {/* Profile Header */}
          <div className={styles.profileHeader}>
            <div className={styles.profileAvatar}>
              <div className={styles.avatarInner}></div>
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>Nico</div>
              <div className={styles.profileTitle}>AI Major, WVSU 2026</div>
            </div>
          </div>

          <div className={styles.panesContainer}>
            {/* Left Pane - Programs */}
            <div className={styles.leftPane}>
              <div className={styles.programsList}>
                <button className={styles.programItem} onClick={() => onProgramClick('matchpoint')}>
                  <div className={styles.programIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={MatchPointIcon.src} width={32} height={32} alt="" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.programText}>
                    <div className={styles.programName}>MatchPoint</div>
                    <div className={styles.programDesc}>Desktop App</div>
                  </div>
                </button>
                <button className={styles.programItem} onClick={() => onProgramClick('kaonta')}>
                  <div className={styles.programIcon}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={KaonTaIcon.src} width={32} height={32} alt="" style={{ objectFit: 'contain' }} />
                  </div>
                  <div className={styles.programText}>
                    <div className={styles.programName}>Kaon Ta!</div>
                    <div className={styles.programDesc}>Web Service</div>
                  </div>
                </button>
              </div>
              <div className={styles.allPrograms}>
                <button className={styles.allProgramsBtn}>
                  ▶ All Programs
                </button>
              </div>
            </div>

            {/* Right Pane - System Links */}
            <div className={styles.rightPane}>
              <button className={styles.systemLink} onClick={() => onSystemClick('resume')}>
                <span>Documents</span>
                <span className={styles.systemDesc}>Resume</span>
              </button>
              <button className={styles.systemLink} onClick={() => onSystemClick('portfolio')}>
                <span>Pictures</span>
                <span className={styles.systemDesc}>Portfolio Gallery</span>
              </button>
              <div className={styles.separator}></div>
              <button className={styles.systemLink} onClick={() => onSystemClick('skills')}>
                <span>Control Panel</span>
                <span className={styles.systemDesc}>Technical Skills</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
