"use client";

import React, { useState } from 'react';
import styles from './SystemProperties.module.css';
import {
  Container,
  Brain,
  Code2,
  Shield,
  Cpu,
  HardDrive,
  Monitor
} from 'lucide-react';

interface SystemPropertiesProps {
  onClose?: () => void;
}

const tabs = ['General', 'Certifications', 'Skills'];

const certifications = [
  {
    title: 'DevOps Engineering',
    desc: 'Proficient in containerization, CI/CD pipelines, and infrastructure automation.',
    tags: ['Docker', 'CI/CD', 'GitHub Actions', 'Linux'],
    iconClass: 'certIconDevops',
    icon: Container,
  },
  {
    title: 'AI Specialization',
    desc: 'Experience with LLM integration, prompt engineering, and agentic AI workflows.',
    tags: ['GPT', 'Prompt Engineering', 'Agentic Mode', 'RAG'],
    iconClass: 'certIconAi',
    icon: Brain,
  },
  {
    title: 'Full Stack Development',
    desc: 'End-to-end web application development with modern frameworks.',
    tags: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
    iconClass: 'certIconFullstack',
    icon: Code2,
  },
];

const skills = [
  { name: 'React / Next.js', percent: 92 },
  { name: 'TypeScript', percent: 88 },
  { name: 'Python', percent: 85 },
  { name: 'Docker & DevOps', percent: 80 },
  { name: 'AI / Prompt Engineering', percent: 90 },
  { name: 'Database Design', percent: 78 },
  { name: 'UI/UX Design', percent: 75 },
];

export default function SystemProperties({ onClose }: SystemPropertiesProps) {
  const [activeTab, setActiveTab] = useState(1); // Certifications by default

  return (
    <div className={styles.systemProperties}>
      {/* Tab Bar */}
      <div className={styles.tabBar}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === i ? styles.activeTab : ''}`}
            onClick={() => setActiveTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {activeTab === 0 && (
          <div className={styles.generalTab}>
            {/* Windows Logo + Edition */}
            <div className={styles.windowsLogo}>
              <div className={styles.logoIcon}>
                <Shield size={32} color="#fff" />
              </div>
              <div className={styles.logoText}>
                <p className={styles.edition}>WindowsAero</p>
                <p>Portfolio Edition © 2026</p>
              </div>
            </div>

            {/* System Info */}
            <div className={styles.systemInfo}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}><Cpu size={12} style={{marginRight: 4, verticalAlign: 'middle'}} />Processor:</span>
                <span className={styles.infoValue}>AI Major — WVSU 2026</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}><HardDrive size={12} style={{marginRight: 4, verticalAlign: 'middle'}} />Memory:</span>
                <span className={styles.infoValue}>Infinite Curiosity</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}><Monitor size={12} style={{marginRight: 4, verticalAlign: 'middle'}} />Display:</span>
                <span className={styles.infoValue}>Frutiger Aero — 1920×1080</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>System type:</span>
                <span className={styles.infoValue}>Software Engineer, Full Stack</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Computer name:</span>
                <span className={styles.infoValue}>NICO-PORTFOLIO</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Product ID:</span>
                <span className={styles.infoValue}>WVSU-2026-AI-MAJOR</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && (
          <div className={styles.certTab}>
            {certifications.map((cert) => (
              <div key={cert.title} className={styles.certCard}>
                <div className={`${styles.certIconWrapper} ${styles[cert.iconClass]}`}>
                  <cert.icon size={20} />
                </div>
                <div className={styles.certInfo}>
                  <div className={styles.certTitle}>{cert.title}</div>
                  <div className={styles.certDesc}>{cert.desc}</div>
                  <div className={styles.certTags}>
                    {cert.tags.map((tag) => (
                      <span key={tag} className={styles.certTag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 2 && (
          <div className={styles.skillsTab}>
            {skills.map((skill) => (
              <div key={skill.name} className={styles.skillRow}>
                <div className={styles.skillHeader}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillPercent}>{skill.percent}%</span>
                </div>
                <div className={styles.skillBarOuter}>
                  <div
                    className={styles.skillBarInner}
                    style={{ width: `${skill.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dialog Footer */}
      <div className={styles.dialogFooter}>
        <button className={styles.dialogBtn} onClick={onClose}>OK</button>
        <button className={styles.dialogBtn} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
