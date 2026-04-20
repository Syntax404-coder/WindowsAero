import React from 'react';
import styles from './UACPrompt.module.css';

interface UACPromptProps {
  programName: string;
  actionName: string;
  onContinue: () => void;
  onCancel: () => void;
}

export default function UACPrompt({ programName, actionName, onContinue, onCancel }: UACPromptProps) {
  // Trap all clicks to prevent interacting with the desktop
  const trapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.secureDesktop} onClick={trapClick} onContextMenu={trapClick}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <span>User Account Control</span>
          <button className={styles.closeBtn} onClick={onCancel}>✕</button>
        </div>
        <div className={styles.content}>
          <div className={styles.hero}>
            <div className={styles.shield} />
            <div>
              <p className={styles.mainText}>Windows needs your permission to continue</p>
              <p className={styles.subText}>If you started this action, continue.</p>
            </div>
          </div>
        </div>
        <div className={styles.actionArea}>
          <div className={styles.programDetails}>
            <div><strong>Action:</strong> {actionName}</div>
            <div><strong>Program:</strong> {programName}</div>
          </div>
          <div className={styles.buttons}>
            <button className={styles.btn} onClick={onContinue}>
              <div className={styles.shield} style={{ width: 14, height: 14 }} /> Continue
            </button>
            <button className={styles.btn} onClick={onCancel}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}
