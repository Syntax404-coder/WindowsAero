/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import React, { useState } from 'react';
import styles from './Personalization.module.css';

// Color presets matching Windows Vista's 16 color swatches
const COLOR_PRESETS = [
  { name: 'Default', hue: 210, sat: 60, light: 60, hex: '#4a90d9' },
  { name: 'Twilight', hue: 225, sat: 55, light: 50, hex: '#3b5fb0' },
  { name: 'Sky', hue: 195, sat: 70, light: 55, hex: '#2aaecc' },
  { name: 'Sea', hue: 170, sat: 55, light: 45, hex: '#34997d' },
  { name: 'Leaf', hue: 140, sat: 50, light: 45, hex: '#39995c' },
  { name: 'Lime', hue: 80, sat: 55, light: 50, hex: '#70a636' },
  { name: 'Sun', hue: 45, sat: 75, light: 55, hex: '#d9a825' },
  { name: 'Pumpkin', hue: 25, sat: 75, light: 55, hex: '#d97825' },
  { name: 'Red', hue: 0, sat: 65, light: 55, hex: '#cc4444' },
  { name: 'Rose', hue: 330, sat: 55, light: 60, hex: '#cc5599' },
  { name: 'Magenta', hue: 300, sat: 40, light: 55, hex: '#b066b0' },
  { name: 'Violet', hue: 270, sat: 45, light: 55, hex: '#8855bb' },
  { name: 'Indigo', hue: 240, sat: 50, light: 50, hex: '#4040bf' },
  { name: 'Cocoa', hue: 20, sat: 30, light: 40, hex: '#856652' },
  { name: 'Slate', hue: 210, sat: 10, light: 55, hex: '#808899' },
  { name: 'Frost', hue: 0, sat: 0, light: 80, hex: '#cccccc' },
];

// Wallpaper list (all 36 images)
const WALLPAPERS = Array.from({ length: 36 }, (_, i) => ({
  id: `img${i + 1}`,
  src: `/assets/Wallpapers/Windows Vista/Desktop/img${i + 1}.jpg`,
}));

interface PersonalizationProps {
  currentWallpaper: string;
  currentColorIndex: number;
  transparency: boolean;
  colorIntensity: number;
  onWallpaperChange: (wallpaper: string) => void;
  onColorChange: (index: number, hue: number, sat: number, light: number) => void;
  onTransparencyChange: (enabled: boolean) => void;
  onIntensityChange: (value: number) => void;
  onClose: () => void;
}

type Tab = 'themes' | 'color';

export default function Personalization({
  currentWallpaper,
  currentColorIndex,
  transparency,
  colorIntensity,
  onWallpaperChange,
  onColorChange,
  onTransparencyChange,
  onIntensityChange,
}: PersonalizationProps) {
  const [activeTab, setActiveTab] = useState<Tab>('themes');
  const [selectedColor, setSelectedColor] = useState(currentColorIndex);
  const [showColorMixer, setShowColorMixer] = useState(false);
  const [customHue, setCustomHue] = useState(COLOR_PRESETS[currentColorIndex]?.hue ?? 210);
  const [customSat, setCustomSat] = useState(COLOR_PRESETS[currentColorIndex]?.sat ?? 60);
  const [customLight, setCustomLight] = useState(COLOR_PRESETS[currentColorIndex]?.light ?? 60);

  const handleColorSelect = (index: number) => {
    setSelectedColor(index);
    const preset = COLOR_PRESETS[index];
    setCustomHue(preset.hue);
    setCustomSat(preset.sat);
    setCustomLight(preset.light);
    onColorChange(index, preset.hue, preset.sat, preset.light);
  };

  const handleCustomColor = (hue: number, sat: number, light: number) => {
    setCustomHue(hue);
    setCustomSat(sat);
    setCustomLight(light);
    onColorChange(-1, hue, sat, light);
  };

  return (
    <div className={styles.personalization}>
      {/* Left sidebar nav */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarHeader}>Control Panel Home</div>
          <button
            className={`${styles.sidebarLink} ${activeTab === 'themes' ? styles.sidebarActive : ''}`}
            onClick={() => setActiveTab('themes')}
          >
            Change desktop background
          </button>
          <button
            className={`${styles.sidebarLink} ${activeTab === 'color' ? styles.sidebarActive : ''}`}
            onClick={() => setActiveTab('color')}
          >
            Window Color and Appearance
          </button>
        </div>

        <div className={styles.sidebarSection}>
          <div className={styles.sidebarHeader}>See also</div>
          <button className={styles.sidebarLink}>Display</button>
          <button className={styles.sidebarLink}>Taskbar and Start Menu</button>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        {activeTab === 'themes' && (
          <div className={styles.themesTab}>
            <h2 className={styles.pageTitle}>
              Change the visuals and sounds on your computer
            </h2>
            <p className={styles.pageSubtitle}>
              Click a wallpaper to change the desktop background.
            </p>

            <div className={styles.wallpaperGroupLabel}>
              Desktop Backgrounds ({WALLPAPERS.length})
            </div>
            <div className={styles.wallpaperGrid}>
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  className={`${styles.wallpaperThumb} ${currentWallpaper === wp.id ? styles.wallpaperActive : ''}`}
                  onClick={() => onWallpaperChange(wp.id)}
                >
                  {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
                  <img
                    src={require(`../../assets/Wallpapers/Windows Vista/Desktop/${wp.id}.jpg`).default.src}
                    alt={wp.id}
                    className={styles.wallpaperImg}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'color' && (
          <div className={styles.colorTab}>
            <h2 className={styles.colorTitle}>
              Change the color of your window borders, Start menu, and taskbar
            </h2>

            <div className={styles.colorGrid}>
              {COLOR_PRESETS.map((color, i) => (
                <button
                  key={color.name}
                  className={`${styles.colorSwatch} ${selectedColor === i ? styles.colorSelected : ''}`}
                  style={{
                    background: `linear-gradient(135deg, 
                      hsl(${color.hue}, ${color.sat}%, ${color.light + 20}%) 0%, 
                      hsl(${color.hue}, ${color.sat}%, ${color.light}%) 50%, 
                      hsl(${color.hue}, ${color.sat}%, ${color.light - 10}%) 100%)`
                  }}
                  onClick={() => handleColorSelect(i)}
                  title={color.name}
                >
                  <div className={styles.swatchGloss} />
                </button>
              ))}
            </div>

            <div className={styles.currentColorLabel}>
              Current color: <strong>{COLOR_PRESETS[selectedColor]?.name ?? 'Custom'}</strong>
            </div>

            {/* Transparency toggle */}
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={transparency}
                onChange={(e) => onTransparencyChange(e.target.checked)}
              />
              <span>Enable transparency</span>
            </label>

            {/* Color intensity slider */}
            <div className={styles.sliderRow}>
              <span className={styles.sliderLabel}>Color intensity:</span>
              <input
                type="range"
                min={10}
                max={90}
                value={colorIntensity}
                onChange={(e) => onIntensityChange(parseInt(e.target.value))}
                className={styles.slider}
              />
            </div>

            {/* Show/Hide color mixer */}
            <button
              className={styles.mixerToggle}
              onClick={() => setShowColorMixer(!showColorMixer)}
            >
              <span className={styles.mixerArrow}>{showColorMixer ? '▿' : '▹'}</span>
              {showColorMixer ? 'Hide color mixer' : 'Show color mixer'}
            </button>

            {showColorMixer && (
              <div className={styles.colorMixer}>
                <div className={styles.sliderRow}>
                  <span className={styles.sliderLabel}>Hue:</span>
                  <div className={styles.hueTrack}>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={customHue}
                      onChange={(e) => handleCustomColor(parseInt(e.target.value), customSat, customLight)}
                      className={`${styles.slider} ${styles.hueSlider}`}
                    />
                  </div>
                </div>
                <div className={styles.sliderRow}>
                  <span className={styles.sliderLabel}>Saturation:</span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={customSat}
                    onChange={(e) => handleCustomColor(customHue, parseInt(e.target.value), customLight)}
                    className={styles.slider}
                  />
                </div>
                <div className={styles.sliderRow}>
                  <span className={styles.sliderLabel}>Brightness:</span>
                  <input
                    type="range"
                    min={20}
                    max={90}
                    value={customLight}
                    onChange={(e) => handleCustomColor(customHue, customSat, parseInt(e.target.value))}
                    className={styles.slider}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
