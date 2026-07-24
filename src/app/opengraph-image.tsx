import { ImageResponse } from 'next/og';

export const alt = 'Esteban Hernandez - Ingenieria de sistemas, machine learning e IA';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F4F0E6',
        color: '#1A1712',
        padding: '72px',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 14, height: 14, backgroundColor: '#B8862F' }} />
        <div style={{ fontSize: 26, letterSpacing: 2, color: '#6B6355', fontFamily: 'monospace' }}>
          EstebanHerna
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 58, lineHeight: 1.12, maxWidth: 1000 }}>
          Productos de software con machine learning e inteligencia artificial.
        </div>
        <div
          style={{
            fontSize: 26,
            color: '#6B6355',
            fontFamily: 'monospace',
            marginTop: 22,
          }}
        >
          Salud y biomedicina - Movil - Cloud - Robotica
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 24,
          color: '#6B6355',
          fontFamily: 'monospace',
          borderTop: '2px solid #D8D0BE',
          paddingTop: 20,
        }}
      >
        <span>Esteban Alejandro Hernandez Sulvara</span>
        <span>Uniandes</span>
      </div>
    </div>,
    { ...size },
  );
}
