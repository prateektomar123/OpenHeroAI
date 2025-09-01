import { useState } from 'react';
import { superheroMasks } from '../data/superheroMasks';

export default function SuperheroSelector({ selectedHero, onHeroSelect }) {
  const renderMaskImage = (hero) => {
    if (hero.maskImage) {
      return (
        <img
          src={hero.maskImage}
          alt={`${hero.name} mask`}
          className="w-full h-full object-cover rounded"
        />
      );
    }

    return (
      <div className="w-full h-full bg-slate-600 rounded flex items-center justify-center text-2xl">
        {hero.fallbackIcon || '🦸'}
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          Choose Your Hero
        </h2>
        <p className="text-sm sm:text-base text-slate-400">Select from our collection of superhero masks</p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 sm:gap-4">
        {Object.values(superheroMasks).map((hero) => {
          const isSelected = selectedHero === hero.id;

          return (
            <div
              key={hero.id}
              className={`cursor-pointer transition-all duration-300 p-3 sm:p-4 rounded-lg border-2 ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-slate-600 hover:border-slate-500 bg-slate-700/50'
              }`}
              onClick={() => onHeroSelect(hero.id)}
            >
              {/* Mask Image Container */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3">
                {renderMaskImage(hero)}
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full mx-auto mb-1 sm:mb-2"></div>
              )}

              {/* Hero Name */}
              <h3 className={`font-medium text-center text-xs sm:text-sm ${
                isSelected ? 'text-white' : 'text-slate-300'
              }`}>
                {hero.name}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Selected Hero Summary */}
      {selectedHero && (
        <div className="bg-slate-700 border border-slate-600 rounded-lg p-3 sm:p-4 text-center">
          <h3 className="font-bold text-base sm:text-lg text-white mb-1">
            Selected: {superheroMasks[selectedHero].name}
          </h3>
          <p className="text-slate-400 text-sm">Ready to transform your image</p>
        </div>
      )}
    </div>
  );
}
