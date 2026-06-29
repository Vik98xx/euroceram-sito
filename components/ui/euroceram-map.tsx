'use client'

import { Map, MapMarker, MarkerContent } from './mapcn-map-controls'

const LNG = 14.2628
const LAT = 40.9165

export default function EuroceramMap() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Map
        center={[LNG, LAT]}
        zoom={15}
        theme="dark"
        className="w-full h-full"
        dragPan={false}
        dragRotate={false}
        scrollZoom={false}
        touchZoomRotate={false}
        touchPitch={false}
        doubleClickZoom={false}
        keyboard={false}
        boxZoom={false}
      >
        <MapMarker longitude={LNG} latitude={LAT}>
          <MarkerContent>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
              {/* Etichetta */}
              <div style={{
                background: 'rgba(16,19,15,0.92)',
                border: '1px solid rgba(111,168,144,0.55)',
                borderRadius: 8,
                padding: '4px 10px',
                marginBottom: 4,
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
              }}>
                <span style={{ color: '#ffffff', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em' }}>Euroceram 2002</span>
                <br />
                <span style={{ color: '#6FA890', fontSize: 9, letterSpacing: '0.06em' }}>Via G. Carducci 3 · Arzano (NA)</span>
              </div>
              {/* Pin SVG */}
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none" style={{ filter: 'drop-shadow(0 4px 8px rgba(111,168,144,0.5))' }}>
                <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0z" fill="#6FA890" />
                <circle cx="16" cy="16" r="6" fill="#10130F" />
                <circle cx="16" cy="16" r="3" fill="#6FA890" />
              </svg>
            </div>
          </MarkerContent>
        </MapMarker>
      </Map>

      {/* Link apri in Maps */}
      <a
        href="https://maps.apple.com/?q=Euroceram+2002&ll=40.9165,14.2628"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: 12,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(16,19,15,0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(111,168,144,0.4)',
          borderRadius: 6,
          padding: '6px 16px',
          color: '#fff',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
          zIndex: 10,
        }}
      >
        Apri in Maps →
      </a>
    </div>
  )
}
