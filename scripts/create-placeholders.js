const fs = require('fs');
const path = require('path');

const placeholders = [
  { name: 'hero-outdoor.jpg', bg1: '#2A3830', bg2: '#0C1616', label: 'Terrace Outdoor', color: '#5BA4A4' },
  { name: 'hero-marble.jpg',  bg1: '#1E2428', bg2: '#0E1416', label: 'Cool Elegance',   color: '#A8A8A8' },
  { name: 'hero-chevron.jpg', bg1: '#1C1A10', bg2: '#0A0A06', label: 'Chevron Pattern', color: '#B8956A' },
  { name: 'hero-gold.jpg',    bg1: '#2A1C10', bg2: '#120C04', label: 'Golden Ambra',    color: '#C8A060' },
];

const dir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

placeholders.forEach(function(p) {
  var svg = "<svg xmlns='http://www.w3.org/2000/svg' width='1400' height='900'>"
    + "<defs>"
    + "<linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>"
    + "<stop offset='0%' stop-color='" + p.bg1 + "'/>"
    + "<stop offset='100%' stop-color='" + p.bg2 + "'/>"
    + "</linearGradient>"
    + "<pattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'>"
    + "<path d='M 60 0 L 0 0 0 60' fill='none' stroke='" + p.color + "' stroke-width='0.5' opacity='0.25'/>"
    + "</pattern>"
    + "</defs>"
    + "<rect width='1400' height='900' fill='url(#g)'/>"
    + "<rect width='1400' height='900' fill='url(#grid)'/>"
    + "<text x='700' y='440' font-family='Georgia,serif' font-size='64' fill='" + p.color + "' text-anchor='middle' opacity='0.35'>" + p.label + "</text>"
    + "<text x='700' y='510' font-family='Georgia,serif' font-size='22' fill='white' text-anchor='middle' opacity='0.2'>Euroceram 2002 — Arzano, Napoli</text>"
    + "</svg>";
  fs.writeFileSync(path.join(dir, p.name), svg);
  console.log('Creato:', p.name);
});

console.log('Fatto! 4 placeholder creati in public/images/');
