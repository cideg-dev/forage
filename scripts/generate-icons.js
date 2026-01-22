// scripts/generate-icons.js
import fs from 'fs';
import path from 'path';
import { createCanvas, loadImage } from 'canvas';

// Créer un logo simple pour les icônes
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Créer les icônes
const generateIcons = async () => {
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');
  
  // Fond avec la couleur principale
  ctx.fillStyle = '#0e7490'; // cyan-600
  ctx.fillRect(0, 0, 512, 512);
  
  // Ajouter un symbole d'eau stylisé
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 300px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('💧', 256, 256);
  
  // Sauvegarder l'image originale
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(process.cwd(), 'public/android-chrome-512x512.png'), buffer);
  
  // Générer les autres tailles
  for (const size of sizes) {
    const resizedCanvas = createCanvas(size, size);
    const resizedCtx = resizedCanvas.getContext('2d');
    
    // Redimensionner l'image
    resizedCtx.drawImage(canvas, 0, 0, size, size);
    
    const resizedBuffer = resizedCanvas.toBuffer('image/png');
    fs.writeFileSync(path.join(process.cwd(), `public/android-chrome-${size}x${size}.png`), resizedBuffer);
  }
  
  console.log('Icônes générées avec succès!');
};

generateIcons().catch(console.error);