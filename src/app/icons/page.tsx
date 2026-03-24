import fs from 'fs';
import path from 'path';
import Image from 'next/image';

export default function IconsGallery() {
  const publicDir = path.join(process.cwd(), 'public');
  const imageresDir = path.join(publicDir, 'assets/Icons/Windows Vista/ico/imageres.dll');
  const shell32Dir = path.join(publicDir, 'assets/Icons/Windows Vista/ico/shell32.dll');

  const imageresIcons = fs.existsSync(imageresDir) ? fs.readdirSync(imageresDir).filter(f => f.endsWith('.ico')) : [];
  const shell32Icons = fs.existsSync(shell32Dir) ? fs.readdirSync(shell32Dir).filter(f => f.endsWith('.ico')) : [];

  return (
    <div style={{ padding: 20, background: '#fff', color: '#000', fontFamily: 'sans-serif' }}>
      <h1>Imageres.dll Icons ({imageresIcons.length})</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {imageresIcons.map(icon => (
          <div key={icon} style={{ width: 100, textAlign: 'center', border: '1px solid #ccc', padding: 5 }}>
            <img src={`/assets/Icons/Windows Vista/ico/imageres.dll/${icon}`} style={{ width: 48, height: 48 }} alt={icon} />
            <div style={{ fontSize: 10, wordBreak: 'break-all' }}>{icon}</div>
          </div>
        ))}
      </div>

      <h1 style={{ marginTop: 40 }}>Shell32.dll Icons ({shell32Icons.length})</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {shell32Icons.map(icon => (
          <div key={icon} style={{ width: 100, textAlign: 'center', border: '1px solid #ccc', padding: 5 }}>
            <img src={`/assets/Icons/Windows Vista/ico/shell32.dll/${icon}`} style={{ width: 48, height: 48 }} alt={icon} />
            <div style={{ fontSize: 10, wordBreak: 'break-all' }}>{icon}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
