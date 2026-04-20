import React from 'react';
import styles from './WelcomeCenter.module.css';

interface WelcomeCenterProps {
  onLaunch: (appId: string) => void;
}

export default function WelcomeCenter({ onLaunch }: WelcomeCenterProps) {
  const osName = "Windows Vista™ Ultimate";
  const cpu = "Intel(R) Core(TM) i5-7200U CPU @ 2.50GHz";
  const ram = "4.00 GB RAM";
  const gpu = "VMware SVGA 3D";
  const pcName = "WIN-VISTA2026";

  const gridItems = [
    { text: 'View computer details', action: 'skills', color: '#166eb8' },
    { text: 'Transfer files and settings', action: 'explorer', color: '#4CAF50' },
    { text: 'Add new users', action: 'personalize', color: '#FF9800' },
    { text: 'Personalize Windows', action: 'personalize', color: '#9C27B0' },
    { text: 'Connect to the Internet', action: 'internet', color: '#1db5a8' },
    { text: 'View Portfolio', action: 'portfolio', color: '#c62828' }
  ];

  return (
    <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '"Segoe UI", Arial, sans-serif', background: '#fff' }}>
      <div className={styles.hero} style={{ background: 'linear-gradient(135deg, rgba(82, 168, 185, 0.1) 0%, rgba(100, 190, 210, 0.3) 50%, rgba(82, 168, 185, 0.1) 100%)', padding: '20px', display: 'flex', borderBottom: '1px solid #d4e7f3' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ margin: '0 0 15px 0', fontSize: '24px', fontWeight: 400, color: '#003366' }}>Client User</h1>
          <div style={{ display: 'flex', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '4px', background: 'linear-gradient(135deg, #005599 0%, #002244 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '32px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
              💻
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', fontSize: '11px', color: '#333' }}>
              <strong style={{fontSize: 12}}>{osName}</strong>
              <span>{cpu}</span>
              <span>{ram}</span>
              <span>{gpu}</span>
              <span>Computer Name: {pcName}</span>
            </div>
          </div>
        </div>
        <div style={{ width: '200px', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <div className={styles.detailsLink} onClick={() => onLaunch('skills')} style={{ color: '#0066cc', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}>
             Show more details
          </div>
        </div>
      </div>
      
      <div className={styles.grid} style={{ flex: 1, background: '#fdfdfd', padding: '20px 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridAutoRows: '60px', rowGap: '15px', columnGap: '40px', overflowY: 'auto' }}>
        {gridItems.map((item, idx) => (
          <div key={idx} className={styles.item} onClick={() => onLaunch(item.action)} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '8px', cursor: 'pointer' }}>
            <div className={styles.itemIcon} style={{ width: '32px', height: '32px', borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${item.color} 0%, #000 150%)`, boxShadow: '0 2px 5px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', flexShrink: 0 }}>
              ✦
            </div>
            <div className={styles.itemText} style={{ color: '#003399', fontSize: '13px' }}>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
