/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useCallback, useEffect, memo } from 'react';
import styles from './Shortcut.module.css';
import ShortcutOverlayIcon from '../../assets/Icons/shortcut.png';

interface ShortcutProps {
  id: string;
  name: string;
  iconSrc?: string;
  x: number;
  y: number;
  isSelected: boolean;
  onSelect: (id: string, multiple: boolean) => void;
  onDoubleClick: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onIconContextMenu: (id: string, iconSrc: string, mouseX: number, mouseY: number) => void;
}

function DesktopShortcut({ id, name, iconSrc, x, y, isSelected, onSelect, onDoubleClick, onMove, onIconContextMenu }: ShortcutProps) {
  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x, y });
  const elRef = useRef<HTMLDivElement>(null);

  // Sync posRef when props update
  useEffect(() => {
    posRef.current = { x, y };
  }, [x, y]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return; // left click only
    e.stopPropagation();
    e.preventDefault();

    // Select on mouse down to instantly show selection when dragging
    if (!isSelected || e.ctrlKey || e.shiftKey) {
      onSelect(id, e.ctrlKey || e.shiftKey);
    }

    draggingRef.current = true;
    hasDraggedRef.current = false;
    offsetRef.current = {
      x: e.clientX - x,
      y: e.clientY - y,
    };

    const handleMouseMove = (moveE: MouseEvent) => {
      if (!draggingRef.current) return;

      const newX = moveE.clientX - offsetRef.current.x;
      const newY = moveE.clientY - offsetRef.current.y;

      // Check if we've moved enough to count as a drag
      if (Math.abs(newX - x) > 3 || Math.abs(newY - y) > 3) {
        hasDraggedRef.current = true;
      }

      // Clamp to viewport bounds
      const clampedX = Math.max(0, Math.min(newX, window.innerWidth - 74));
      const clampedY = Math.max(0, Math.min(newY, window.innerHeight - 100));

      posRef.current = { x: clampedX, y: clampedY };

      if (elRef.current) {
        elRef.current.style.left = `${clampedX}px`;
        elRef.current.style.top = `${clampedY}px`;
      }
    };

    const handleMouseUp = () => {
      draggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (hasDraggedRef.current) {
        // Snap to grid (80px wide × 90px tall cells, 10px padding)
        const GRID_W = 80;
        const GRID_H = 90;
        const PADDING = 10;
        const snappedX = Math.round((posRef.current.x - PADDING) / GRID_W) * GRID_W + PADDING;
        const snappedY = Math.round((posRef.current.y - PADDING) / GRID_H) * GRID_H + PADDING;
        const finalX = Math.max(PADDING, Math.min(snappedX, window.innerWidth - GRID_W));
        const finalY = Math.max(PADDING, Math.min(snappedY, window.innerHeight - GRID_H - 40));

        posRef.current = { x: finalX, y: finalY };
        if (elRef.current) {
          elRef.current.style.left = `${finalX}px`;
          elRef.current.style.top = `${finalY}px`;
        }
        onMove(id, finalX, finalY);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [id, x, y, onMove, isSelected, onSelect]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasDraggedRef.current && isSelected && !e.ctrlKey) {
      // Re-trigger select if already selected to clear other selections
      onSelect(id, false);
    }
  }, [id, isSelected, onSelect]);

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasDraggedRef.current) {
      onDoubleClick(id);
    }
  }, [id, onDoubleClick]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSelected) {
      onSelect(id, false);
    }
    onIconContextMenu(id, iconSrc || '', e.clientX, e.clientY);
  }, [id, iconSrc, onIconContextMenu, isSelected, onSelect]);

  return (
    <div
      ref={elRef}
      className={`${styles.shortcutContainer} ${isSelected ? styles.selected : ''}`}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        zIndex: 1,
        cursor: draggingRef.current ? 'grabbing' : 'pointer',
      }}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <div className={styles.iconWrapper}>
        <img src={iconSrc} alt={name} className={styles.iconImage} />
        <div className={styles.shortcutArrow}>
          <img src={ShortcutOverlayIcon.src} width={48} height={48} alt="" className={styles.shortcutImg} />
        </div>
      </div>
      <div className={styles.labelWrapper}>
        <span className={styles.label}>{name}</span>
      </div>
    </div>
  );
}

export default memo(DesktopShortcut);
