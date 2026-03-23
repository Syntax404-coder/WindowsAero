"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Taskbar.module.css';

interface StartOrbProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function StartOrb({ onClick, isOpen }: StartOrbProps) {
  return (
    <motion.button
      className={styles.startOrbBtn}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className={`${styles.startOrb} ${isOpen ? styles.orbOpen : ''}`}
        animate={{
          boxShadow: isOpen 
            ? '0 0 15px 5px rgba(100, 200, 255, 0.8), inset 0 0 10px rgba(255,255,255,0.8)' 
            : '0 0 5px 1px rgba(100, 200, 255, 0.4), inset 0 0 8px rgba(255,255,255,0.4)'
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Glossy inner reflection */}
        <div className={styles.orbReflection} />
        
        {/* Placeholder SVG for Vista Windows Logo - stylized 4-pane flag */}
        <svg viewBox="0 0 100 100" className={styles.orbLogo}>
          <path d="M20,25 C35,20 45,22 48,24 L48,47 C45,46 35,44 20,47 Z" fill="#ff6b4a" />
          <path d="M52,24 C65,22 75,20 80,25 L80,47 C75,44 65,46 52,47 Z" fill="#88c540" />
          <path d="M20,53 C35,50 45,52 48,53 L48,76 C45,74 35,76 20,79 Z" fill="#00a1f1" />
          <path d="M52,53 C65,52 75,50 80,53 L80,79 C75,76 65,74 52,76 Z" fill="#ffb900" />
        </svg>
      </motion.div>
    </motion.button>
  );
}
