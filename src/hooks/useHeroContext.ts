import { useContext } from 'react';
import { HeroContext, type HeroContextValue } from '../providers/heroContextInstance';

export function useHeroContext(): HeroContextValue {
  const context = useContext(HeroContext);
  if (!context) {
    throw new Error('useHeroContext must be used within a HeroProvider');
  }
  return context;
}
