import { ImageResponse } from 'next/og';

export const alt = 'Esteban Hernández. Ingeniería de datos e IA aplicada';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Portada del boletín en 1200 x 630: campo azul, titular y una franja de casillas. */
export default function OgImage() {
  const cells = Array.from({ length: 59 * 4 });
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#12233F',
        color: '#FFFFFF',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30, fontWeight: 700 }}>Esteban Hernández</div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.04, letterSpacing: -2 }}>
          Ingeniería de datos e IA aplicada
        </div>
        <div style={{ fontSize: 34, color: '#B4C2DA', marginTop: 20 }}>
          Python, SQL, Apache Airflow, AWS
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', width: 1062 }}>
          {cells.map((_, i) => (
            <div
              key={i}
              style={{
                width: 14,
                height: 14,
                margin: 2,
                backgroundColor: i === 83 || i === 150 ? '#FF6B81' : '#F4F7FB',
              }}
            />
          ))}
        </div>
        <div style={{ display: 'flex', fontSize: 24, color: '#B4C2DA', marginTop: 16 }}>
          1.121 municipios procesados en menos de 17 minutos
        </div>
      </div>
    </div>,
    { ...size },
  );
}
