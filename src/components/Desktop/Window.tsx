"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Window.module.css';
import aeroStyles from '../../styles/AeroGlass.module.css';
import { X, Square, Minus } from 'lucide-react'; // Wait, let's use exact SVGs if preferred, but lucide-react works

interface WindowProps {
  id: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isFocused: boolean;
  isMinimized: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  defaultPosition?: { x: number; y: number };
}

export default function Window({
  id,
  title,
  icon,
  children,
  isFocused,
  isMinimized,
  onFocus,
  onClose,
  onMinimize,
  defaultPosition = { x: 100, y: 100 }
}: WindowProps) {
  const [isMaximized, setIsMaximized] = useState(false);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const variants = {
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 25 }
    },
    minimized: {
      opacity: 0,
      scale: 0.8,
      y: 300,
      transition: { duration: 0.2 }
    },
    closed: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.15 }
    }
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <motion.div
          data-id={id}
          drag={!isMaximized}
          dragMomentum={false}
          initial={{ ...variants.closed, x: defaultPosition.x, y: defaultPosition.y }}
          animate={{ ...variants.open, x: isMaximized ? 0 : undefined, y: isMaximized ? 0 : undefined }}
          exit="closed"
          variants={variants}
          onMouseDown={onFocus}
          className={`${styles.windowContainer} ${aeroStyles.glass} ${isFocused ? styles.focused : ''} ${isMaximized ? styles.maximized : ''}`}
          style={{
            zIndex: isFocused ? 100 : 10,
            width: isMaximized ? '100vw' : '800px',
            height: isMaximized ? 'calc(100vh - 40px)' : '500px'
          }}
        >
          {/* Title Bar */}
          <div className={`${aeroStyles.titleBar} ${!isFocused ? aeroStyles.titleBarInactive : ''}`}>
            <div className={styles.titleInfo}>
              {icon && <span className={styles.icon}>{icon}</span>}
              <span className={styles.titleText}>{title}</span>
            </div>
            
            {/* Window Controls */}
            <div className={styles.controls}>
              <button 
                className={`${styles.controlBtn} ${styles.minimizeBtn}`} 
                onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Minus size={14} />
              </button>
              <button 
                className={`${styles.controlBtn} ${styles.maximizeBtn}`} 
                onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <Square size={12} />
              </button>
              <button 
                className={`${styles.controlBtn} ${styles.closeBtn}`} 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          {/* Content Area */}
          <div className={styles.contentArea} onPointerDownCapture={(e) => e.stopPropagation()}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
