import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDeg = (hours * 30) + (minutes * 0.5);
  const minuteDeg = (minutes * 6) + (seconds * 0.1);
  const secondDeg = seconds * 6;

  return (
    <div className={styles.sidebar}>
      {/* Clock Gadget */}
      <div className={styles.gadget}>
        <div className={styles.clock}>
          <div className={styles.clockFace}>
            <div className={`${styles.hand} ${styles.hourHand}`} style={{ transform: `rotate(${hourDeg}deg)` }} />
            <div className={`${styles.hand} ${styles.minuteHand}`} style={{ transform: `rotate(${minuteDeg}deg)` }} />
            <div className={`${styles.hand} ${styles.secondHand}`} style={{ transform: `rotate(${secondDeg}deg)` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
