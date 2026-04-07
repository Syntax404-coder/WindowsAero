"use client";

import React, { useState } from 'react';

interface PhotoViewerProps {
  initialImageId: string;
}

export default function PhotoViewer({ initialImageId }: PhotoViewerProps) {
  const initialIndex = parseInt(initialImageId.replace('img', ''), 10);
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 1);
  const [showInfo, setShowInfo] = useState(true);

  const TOTAL_IMAGES = 41;

  const handlePrev = () => {
    setCurrentIndex(prev => prev > 1 ? prev - 1 : TOTAL_IMAGES);
  };

  const handleNext = () => {
    setCurrentIndex(prev => prev < TOTAL_IMAGES ? prev + 1 : 1);
  };

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const currentImgSrc = require(`../../assets/Wallpapers/Windows Vista/Desktop/img${currentIndex}.jpg`).default.src;

  const toolbarBtnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '4px',
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#dde4ec', fontSize: '11px', fontFamily: '"Segoe UI", sans-serif',
    padding: '4px 8px', borderRadius: '3px',
    transition: 'background 0.15s',
  };

  const controlBtnStyle: React.CSSProperties = {
    width: '28px', height: '28px', borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.08)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#c8d8e8', fontSize: '13px',
    transition: 'all 0.15s',
    fontFamily: '"Segoe UI", sans-serif',
  };

  const playBtnStyle: React.CSSProperties = {
    ...controlBtnStyle,
    width: '36px', height: '36px',
    background: 'linear-gradient(180deg, rgba(60,142,232,0.9) 0%, rgba(30,90,180,0.9) 100%)',
    border: '1px solid rgba(100,170,255,0.5)',
    color: '#fff', fontSize: '14px',
    boxShadow: '0 0 8px rgba(60,140,230,0.4)',
  };

  const dividerStyle: React.CSSProperties = {
    width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)', margin: '0 4px',
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      backgroundColor: '#1b2838',
      fontFamily: '"Segoe UI", Tahoma, sans-serif',
    }}>

      {/* ── Top Toolbar ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px 6px',
        background: 'linear-gradient(180deg, #3a4a5e 0%, #2a3a4e 40%, #1e2e42 100%)',
        borderBottom: '1px solid #0d1a2a',
        gap: '2px',
        minHeight: '32px',
        flexShrink: 0,
      }}>
        <button
          style={{ ...toolbarBtnStyle, fontWeight: 600, marginRight: '8px' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >
          ← Back To Gallery
        </button>

        <div style={dividerStyle} />

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >File ▾</button>

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >Fix</button>

        <button style={{...toolbarBtnStyle, ...(showInfo ? { background: 'rgba(255,255,255,0.12)' } : {})}}
          onClick={() => setShowInfo(!showInfo)}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          onMouseLeave={e => (e.currentTarget.style.background = showInfo ? 'rgba(255,255,255,0.12)' : 'none')}
        >Info</button>

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >Print ▾</button>

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >E-mail</button>

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >Burn ▾</button>

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >Make a Movie</button>

        <button style={toolbarBtnStyle}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >Open ▾</button>

        <div style={{ flex: 1 }} />

        <button style={{
          ...toolbarBtnStyle,
          width: '20px', height: '20px', borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          padding: 0, justifyContent: 'center',
          fontWeight: 'bold', color: '#8ab4e0',
        }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'none')}
        >?</button>
      </div>

      {/* ── Main Content Area ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden',
        minHeight: 0,
      }}>

        {/* Image Display */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#111a26',
          overflow: 'hidden',
          padding: '16px',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImgSrc}
            alt={`img${currentIndex}.jpg`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: '2px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
            }}
          />
        </div>

        {/* ── Right Info Panel ── */}
        {showInfo && (
          <div style={{
            width: '180px',
            backgroundColor: '#1e2d40',
            borderLeft: '1px solid #0d1a2a',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            overflowY: 'auto',
            flexShrink: 0,
          }}>
            <div style={{ alignSelf: 'flex-end' }}>
              <button
                onClick={() => setShowInfo(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#8899aa', fontSize: '14px', padding: '2px 4px',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8899aa')}
              >×</button>
            </div>

            {/* Thumbnail */}
            <div style={{
              width: '100px', height: '75px',
              border: '2px solid #4488cc',
              borderRadius: '2px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImgSrc}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ color: '#6aacf0', fontSize: '11px', textAlign: 'center', fontWeight: 500 }}>
              img{currentIndex}.jpg
            </div>

            <div style={{ color: '#6aacf0', fontSize: '10px', textAlign: 'center', lineHeight: 1.6 }}>
              01.01.2026&nbsp;&nbsp;12:00<br />
              1920 × 1200
            </div>

            <div style={{ color: '#d4a020', fontSize: '13px', letterSpacing: '2px' }}>
              ★★★☆☆
            </div>

            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)', margin: '4px 0' }} />

            <div style={{ width: '100%' }}>
              <div style={{ color: '#8899aa', fontSize: '10px', marginBottom: '6px' }}>
                Add Tags
              </div>
              <div style={{
                color: '#b0c4da', fontSize: '11px',
                display: 'flex', flexDirection: 'column', gap: '4px',
              }}>
                <div>Wallpapers</div>
                <div>Windows Vista</div>
              </div>
            </div>

            <div style={{ flex: 1 }} />

            <div style={{
              color: '#7a8ea0', fontSize: '10px', textAlign: 'center',
              fontStyle: 'italic', paddingTop: '8px',
            }}>
              Windows Vista Desktop
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Control Strip ── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        background: 'linear-gradient(180deg, #2a3a50 0%, #1a2a3e 100%)',
        borderTop: '1px solid #0d1a2a',
        gap: '8px',
        flexShrink: 0,
        minHeight: '48px',
      }}>
        <button style={controlBtnStyle} title="Zoom"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >+</button>

        <button style={controlBtnStyle} title="Fit to Window"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >⊡</button>

        <div style={{ width: '12px' }} />

        <button onClick={handlePrev} style={controlBtnStyle} title="Previous"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >◁</button>

        <button style={playBtnStyle} title="Play Slide Show"
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 12px rgba(60,140,230,0.6)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 8px rgba(60,140,230,0.4)'; }}
        >▷</button>

        <button onClick={handleNext} style={controlBtnStyle} title="Next"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >▷</button>

        <div style={{ width: '12px' }} />

        <button style={controlBtnStyle} title="Rotate Counter-clockwise"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >↶</button>

        <button style={controlBtnStyle} title="Rotate Clockwise"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >↷</button>

        <button style={{ ...controlBtnStyle, color: '#e06060' }} title="Delete"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,80,80,0.15)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
        >×</button>
      </div>

    </div>
  );
}
