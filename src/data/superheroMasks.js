import { getMaskImage } from './maskImages.js';

export const superheroMasks = {
  batman: {
    id: 'batman',
    name: 'Batman',
    maskImage: getMaskImage('batman')?.maskImage,
    maskReference: getMaskImage('batman')?.maskReference,
    fallbackIcon: getMaskImage('batman')?.fallbackIcon || '🦇',
    transformationPrompt: 'Transform ONLY the person in this image into Batman. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Batman.'
  },

  spiderman: {
    id: 'spiderman',
    name: 'Spider-Man',
    maskImage: getMaskImage('spiderman')?.maskImage,
    maskReference: getMaskImage('spiderman')?.maskReference,
    fallbackIcon: getMaskImage('spiderman')?.fallbackIcon || '🕷️',
    transformationPrompt: 'Transform ONLY the person in this image into Spider-Man. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Spider-Man.'
  },

  superman: {
    id: 'superman',
    name: 'Superman',
    maskImage: getMaskImage('superman')?.maskImage,
    maskReference: getMaskImage('superman')?.maskReference,
    fallbackIcon: getMaskImage('superman')?.fallbackIcon || '🦸',
    transformationPrompt: 'Transform ONLY the person in this image into Superman. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Superman.'
  },

  ironman: {
    id: 'ironman',
    name: 'Iron Man',
    maskImage: getMaskImage('ironman')?.maskImage,
    maskReference: getMaskImage('ironman')?.maskReference,
    fallbackIcon: getMaskImage('ironman')?.fallbackIcon || '🤖',
    transformationPrompt: 'Transform ONLY the person in this image into Iron Man. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Iron Man.'
  },

  captain: {
    id: 'captain',
    name: 'Captain America',
    maskImage: getMaskImage('captain')?.maskImage,
    maskReference: getMaskImage('captain')?.maskReference,
    fallbackIcon: getMaskImage('captain')?.fallbackIcon || '⭐',
    transformationPrompt: 'Transform ONLY the person in this image into Captain America. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Captain America.'
  },

  wonderwoman: {
    id: 'wonderwoman',
    name: 'Wonder Woman',
    maskImage: getMaskImage('wonderwoman')?.maskImage,
    maskReference: getMaskImage('wonderwoman')?.maskReference,
    fallbackIcon: getMaskImage('wonderwoman')?.fallbackIcon || '👑',
    transformationPrompt: 'Transform ONLY the person in this image into Wonder Woman. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Wonder Woman.'
  },

  thor: {
    id: 'thor',
    name: 'Thor',
    maskImage: getMaskImage('thor')?.maskImage,
    maskReference: getMaskImage('thor')?.maskReference,
    fallbackIcon: getMaskImage('thor')?.fallbackIcon || '⚡',
    transformationPrompt: 'Transform ONLY the person in this image into Thor. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Thor.'
  },

  hulk: {
    id: 'hulk',
    name: 'Hulk',
    maskImage: getMaskImage('hulk')?.maskImage,
    maskReference: getMaskImage('hulk')?.maskReference,
    fallbackIcon: getMaskImage('hulk')?.fallbackIcon || '💚',
    transformationPrompt: 'Transform ONLY the person in this image into Hulk. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Hulk.'
  },

  blackwidow: {
    id: 'blackwidow',
    name: 'Black Widow',
    maskImage: getMaskImage('blackwidow')?.maskImage,
    maskReference: getMaskImage('blackwidow')?.maskReference,
    fallbackIcon: getMaskImage('blackwidow')?.fallbackIcon || '🕷️',
    transformationPrompt: 'Transform ONLY the person in this image into Black Widow. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Black Widow.'
  },

  flash: {
    id: 'flash',
    name: 'The Flash',
    maskImage: getMaskImage('flash')?.maskImage,
    maskReference: getMaskImage('flash')?.maskReference,
    fallbackIcon: getMaskImage('flash')?.fallbackIcon || '⚡',
    transformationPrompt: 'Transform ONLY the person in this image into Flash. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Flash.'
  },

  aquaman: {
    id: 'aquaman',
    name: 'Aquaman',
    maskImage: getMaskImage('aquaman')?.maskImage,
    maskReference: getMaskImage('aquaman')?.maskReference,
    fallbackIcon: getMaskImage('aquaman')?.fallbackIcon || '🌊',
    transformationPrompt: 'Transform ONLY the person in this image into Aquaman. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Aquaman.'
  },

  greenlantern: {
    id: 'greenlantern',
    name: 'Green Lantern',
    maskImage: getMaskImage('greenlantern')?.maskImage,
    maskReference: getMaskImage('greenlantern')?.maskReference,
    fallbackIcon: getMaskImage('greenlantern')?.fallbackIcon || '💚',
    transformationPrompt: 'Transform ONLY the person in this image into Green Lantern. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Green Lantern.'
  },

  blackpanther: {
    id: 'blackpanther',
    name: 'Black Panther',
    maskImage: getMaskImage('blackpanther')?.maskImage,
    maskReference: getMaskImage('blackpanther')?.maskReference,
    fallbackIcon: getMaskImage('blackpanther')?.fallbackIcon || '🐆',
    transformationPrompt: 'Transform ONLY the person in this image into Black Panther. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Black Panther.'
  },

  doctorstrange: {
    id: 'doctorstrange',
    name: 'Doctor Strange',
    maskImage: getMaskImage('doctorstrange')?.maskImage,
    maskReference: getMaskImage('doctorstrange')?.maskReference,
    fallbackIcon: getMaskImage('doctorstrange')?.fallbackIcon || '🔮',
    transformationPrompt: 'Transform ONLY the person in this image into Doctor Strange. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Doctor Strange.'
  },

  antman: {
    id: 'antman',
    name: 'Ant-Man',
    maskImage: getMaskImage('antman')?.maskImage,
    maskReference: getMaskImage('antman')?.maskReference,
    fallbackIcon: getMaskImage('antman')?.fallbackIcon || '🐜',
    transformationPrompt: 'Transform ONLY the person in this image into Ant-Man. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Ant-Man.'
  },

  wasp: {
    id: 'wasp',
    name: 'The Wasp',
    maskImage: getMaskImage('wasp')?.maskImage,
    maskReference: getMaskImage('wasp')?.maskReference,
    fallbackIcon: getMaskImage('wasp')?.fallbackIcon || '🐝',
    transformationPrompt: 'Transform ONLY the person in this image into Wasp. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Wasp.'
  },

  scarletwitch: {
    id: 'scarletwitch',
    name: 'Scarlet Witch',
    maskImage: getMaskImage('scarletwitch')?.maskImage,
    maskReference: getMaskImage('scarletwitch')?.maskReference,
    fallbackIcon: getMaskImage('scarletwitch')?.fallbackIcon || '🔮',
    transformationPrompt: 'Transform ONLY the person in this image into Scarlet Witch. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Scarlet Witch.'
  },

  vision: {
    id: 'vision',
    name: 'Vision',
    maskImage: getMaskImage('vision')?.maskImage,
    maskReference: getMaskImage('vision')?.maskReference,
    fallbackIcon: getMaskImage('vision')?.fallbackIcon || '💎',
    transformationPrompt: 'Transform ONLY the person in this image into Vision. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Vision.'
  },

  falcon: {
    id: 'falcon',
    name: 'Falcon',
    maskImage: getMaskImage('falcon')?.maskImage,
    maskReference: getMaskImage('falcon')?.maskReference,
    fallbackIcon: getMaskImage('falcon')?.fallbackIcon || '🦅',
    transformationPrompt: 'Transform ONLY the person in this image into Falcon. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Falcon.'
  },

  wintersoldier: {
    id: 'wintersoldier',
    name: 'Winter Soldier',
    maskImage: getMaskImage('wintersoldier')?.maskImage,
    maskReference: getMaskImage('wintersoldier')?.maskReference,
    fallbackIcon: getMaskImage('wintersoldier')?.fallbackIcon || '❄️',
    transformationPrompt: 'Transform ONLY the person in this image into Winter Soldier. Keep the EXACT same background, lighting, and environment. Do NOT change anything except the person\'s appearance - keep their face and body structure identical but change their costume to Winter Soldier.'
  }
};

export const getSuperheroMask = (id) => superheroMasks[id] || null;
export const getAllSuperheroMasks = () => Object.values(superheroMasks);
