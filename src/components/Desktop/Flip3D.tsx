import React, { useEffect, useState } from 'react';
import styles from './Flip3D.module.css';

interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface Flip3DProps {
  windows: WindowData[];
  onSelect: (id: string) => void;
  onClose: () => void;
}

export default function Flip3D({ windows, onSelect, onClose }: Flip3DProps) {
  const [activeIndex, setActiveIndex] = useState(windows.length - 1);

  // Handle scroll or arrow keys to cycle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        setActiveIndex(prev => Math.min(prev + 1, windows.length - 1));
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter') {
        if (windows[activeIndex]) {
          onSelect(windows[activeIndex].id);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY < 0) {
        setActiveIndex(prev => Math.min(prev + 1, windows.length - 1));
      } else {
        setActiveIndex(prev => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [windows, activeIndex, onClose, onSelect]);

  if (windows.length === 0) {
    return (
      <div className={styles.overlay} onClick={onClose}>
        <div style={{color: 'white', fontSize: 24, textShadow: '0 2px 10px black'}}>No open windows</div>
      </div>
    );
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      {windows.map((win, i) => {
        // Calculate 3D position relative to the active index
        const offset = activeIndex - i;
        
        let transform = '';
        let opacity = 1;
        
        if (offset < 0) {
          // Cards that have passed immediately vanish or go behind the camera
          transform = `translateZ(800px) rotateY(-45deg) translateX(-400px)`;
          opacity = 0;
        } else {
          // Standard cascaded cards
          const zOffset = offset * -250;
          const xOffset = offset * -150 + 200;
          transform = `translateZ(${zOffset}px) rotateY(-45deg) translateX(${xOffset}px)`;
          opacity = Math.max(1 - (offset * 0.15), 0);
        }

        return (
          <div 
            key={win.id} 
            className={styles.windowWrapper}
            style={{ 
              transform, 
              opacity,
              zIndex: 1000 - offset,
              pointerEvents: offset === 0 ? 'auto' : 'none'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(win.id);
            }}
          >
            <div className={styles.glassFrame}>
              <div className={styles.titleBar}>
                {win.icon && <span style={{marginRight: 8, display: 'flex'}}>{win.icon}</span>}
                {win.title}
              </div>
              <div className={styles.content}>
                 {/* Blocker prevents iframe/click interceptions from mapped content */}
                <div className={styles.contentBlocker} />
                <div style={{ transform: 'scale(0.8)', transformOrigin: 'top left', width: '125%', height: '125%' }}>
                   {win.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
