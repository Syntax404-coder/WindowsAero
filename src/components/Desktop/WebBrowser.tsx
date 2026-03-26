"use client";

import React, { useState } from 'react';

interface WebBrowserProps {
  initialUrl?: string;
}

export default function WebBrowser({ initialUrl = 'https://www.wikipedia.org' }: WebBrowserProps) {
  const [url, setUrl] = useState(initialUrl);
  const [inputUrl, setInputUrl] = useState(initialUrl);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let site = inputUrl;
    if (!site.startsWith('http')) {
      site = 'https://' + site;
    }
    setUrl(site);
    setInputUrl(site);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff', overflow: 'hidden' }}>
      {/* Vista Address Bar Area */}
      <div style={{ padding: '6px 8px', background: 'linear-gradient(180deg, #f0f0f0 0%, #dcdcdc 100%)', borderBottom: '1px solid #999', display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 4 }}>
          <button style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #777', background: '#eee', cursor: 'pointer' }}>←</button>
          <button style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #777', background: '#eee', cursor: 'pointer' }}>→</button>
        </div>
        
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex' }}>
          <input 
            type="text" 
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            style={{ 
              flex: 1, 
              height: 24, 
              border: '1px solid #999', 
              paddingLeft: 8, 
              fontSize: 12, 
              fontFamily: 'Segoe UI, sans-serif',
              outline: 'none',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
            }} 
          />
          <button type="submit" style={{ marginLeft: 4, height: 24, padding: '0 8px', fontSize: 11 }}>Go</button>
        </form>
      </div>

      {/* Main Iframe Content */}
      <div style={{ flex: 1, position: 'relative', background: '#eee' }}>
        <iframe 
          src={url} 
          style={{ width: '100%', height: '100%', border: 'none' }} 
          title="Web Browser Content"
        />
        {/* Help tooltip for blocked sites */}
        <div style={{ 
          position: 'absolute', 
          bottom: 10, 
          right: 10, 
          background: 'rgba(0,0,0,0.6)', 
          color: '#fff', 
          padding: '4px 10px', 
          borderRadius: 20, 
          fontSize: 10,
          pointerEvents: 'none'
        }}>
          Note: Some sites like Google/YouTube block embedding in apps.
        </div>
      </div>
    </div>
  );
}
