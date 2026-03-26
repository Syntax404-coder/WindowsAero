"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Taskbar.module.css';
import StartLogo from '../../assets/Icons/start_orb.ico';

interface StartOrbProps {
  onClick: (e: React.MouseEvent) => void;
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
      {/* Authentic Windows Shield orb from .ico */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={StartLogo.src} 
        alt="Start" 
        style={{ 
          width: '52px', 
          height: '52px', 
          objectFit: 'contain',
          filter: isOpen ? 'drop-shadow(0 0 8px rgba(100,200,255,0.8))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' 
        }}
        draggable={false}
      />
    </motion.button>
  );
}
