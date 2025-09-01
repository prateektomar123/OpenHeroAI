// OpenHero AI - Mask Image Database
// This file contains actual superhero images from reliable sources
// Images are optimized for the application with fallback emoji support

export const maskImages = {
  "batman": {
    "maskImage": "/heroes/batman.svg",
    "maskReference": "/heroes/batman.svg",
    "description": "Dark cowl with pointed ears",
    "fallbackIcon": "🦇"
  },
  "spiderman": {
    "maskImage": "/heroes/spider-man.svg",
    "maskReference": "/heroes/spider-man.svg",
    "description": "Red mask with web pattern",
    "fallbackIcon": "🕷️"
  },
  "superman": {
    "maskImage": "/heroes/superman.svg",
    "maskReference": "/heroes/superman.svg",
    "description": "Blue suit with red S symbol",
    "fallbackIcon": "🦸"
  },
  "ironman": {
    "maskImage": "/heroes/iron-man.svg",
    "maskReference": "/heroes/iron-man.svg",
    "description": "Red and gold metallic helmet",
    "fallbackIcon": "🤖"
  },
  "captain": {
    "maskImage": "/heroes/captain-america.svg",
    "maskReference": "/heroes/captain-america.svg",
    "description": "Blue mask with white star",
    "fallbackIcon": "⭐"
  },
  "wonderwoman": {
    "maskImage": "/heroes/wonder-woman.svg",
    "maskReference": "/heroes/wonder-woman.svg",
    "description": "Golden tiara with star",
    "fallbackIcon": "👑"
  },
  "thor": {
    "maskImage": "/heroes/thor.svg",
    "maskReference": "/heroes/thor.svg",
    "description": "Silver helmet with wings",
    "fallbackIcon": "⚡"
  },
  "hulk": {
    "maskImage": "/heroes/hulk.svg",
    "maskReference": "/heroes/hulk.svg",
    "description": "Green skin transformation",
    "fallbackIcon": "💚"
  },
  "blackwidow": {
    "maskImage": "/heroes/black-widow.svg",
    "maskReference": "/heroes/black-widow.svg",
    "description": "Black tactical suit",
    "fallbackIcon": "🕷️"
  },
  "flash": {
    "maskImage": "/heroes/the-flash.svg",
    "maskReference": "/heroes/the-flash.svg",
    "description": "Red suit with lightning bolts",
    "fallbackIcon": "⚡"
  },
  "aquaman": {
    "maskImage": "/heroes/aquaman.svg",
    "maskReference": "/heroes/aquaman.svg",
    "description": "Orange and green suit",
    "fallbackIcon": "🌊"
  },
  "greenlantern": {
    "maskImage": "/heroes/green-lantern.svg",
    "maskReference": "/heroes/green-lantern.svg",
    "description": "Green suit with lantern symbol",
    "fallbackIcon": "💚"
  },
  "blackpanther": {
    "maskImage": "/heroes/black-panther.svg",
    "maskReference": "/heroes/black-panther.svg",
    "description": "Black suit with silver accents",
    "fallbackIcon": "🐆"
  },
  "doctorstrange": {
    "maskImage": "/heroes/doctor-strange.svg",
    "maskReference": "/heroes/doctor-strange.svg",
    "description": "Blue suit with red cape",
    "fallbackIcon": "🔮"
  },
  "antman": {
    "maskImage": "/heroes/ant-man.svg",
    "maskReference": "/heroes/ant-man.svg",
    "description": "Red suit with silver helmet",
    "fallbackIcon": "🐜"
  },
  "wasp": {
    "maskImage": "/heroes/the-wasp.svg",
    "maskReference": "/heroes/the-wasp.svg",
    "description": "Yellow and black suit",
    "fallbackIcon": "🐝"
  },
  "scarletwitch": {
    "maskImage": "/heroes/scarlet-witch.svg",
    "maskReference": "/heroes/scarlet-witch.svg",
    "description": "Red suit with headpiece",
    "fallbackIcon": "🔮"
  },
  "vision": {
    "maskImage": "/heroes/vision.svg",
    "maskReference": "/heroes/vision.svg",
    "description": "Purple suit with mind stone",
    "fallbackIcon": "💎"
  },
  "falcon": {
    "maskImage": "/heroes/falcon.svg",
    "maskReference": "/heroes/falcon.svg",
    "description": "Red and white suit with wings",
    "fallbackIcon": "🦅"
  },
  "wintersoldier": {
    "maskImage": "/heroes/winter-soldier.svg",
    "maskReference": "/heroes/winter-soldier.svg",
    "description": "Black tactical suit",
    "fallbackIcon": "❄️"
  }
};

export const getMaskImage = (heroId) => {
  return maskImages[heroId] || null;
};

export const getAllMaskImages = () => {
  return maskImages;
};

export const updateMaskImage = (heroId, newImageData) => {
  if (maskImages[heroId]) {
    maskImages[heroId] = { ...maskImages[heroId], ...newImageData };
    return true;
  }
  return false;
};

export const placeholderImages = {
  male: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  female: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
  neutral: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'
};