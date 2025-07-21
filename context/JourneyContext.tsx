import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Journey, PhotoEntry } from '../types';
import { AsyncStorageService } from '../storage/AsyncStorageService';

interface JourneyContextType {
  journeys: Journey[];
  loading: boolean;
  addJourney: (journey: Omit<Journey, 'id' | 'createdAt'>) => Promise<void>;
  addPhotoToJourney: (journeyId: string, photo: Omit<PhotoEntry, 'id' | 'journeyId'>) => Promise<void>;
  deleteJourney: (journeyId: string) => Promise<void>;
  refreshJourneys: () => Promise<void>;
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function useJourneys() {
  const context = useContext(JourneyContext);
  if (!context) {
    throw new Error('useJourneys must be used within a JourneyProvider');
  }
  return context;
}

interface JourneyProviderProps {
  children: ReactNode;
}

export function JourneyProvider({ children }: JourneyProviderProps) {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshJourneys = async () => {
    setLoading(true);
    try {
      const loadedJourneys = await AsyncStorageService.getJourneys();
      setJourneys(loadedJourneys);
    } catch (error) {
      console.error('Error refreshing journeys:', error);
    } finally {
      setLoading(false);
    }
  };

  const addJourney = async (journeyData: Omit<Journey, 'id' | 'createdAt'>) => {
    const newJourney: Journey = {
      ...journeyData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    await AsyncStorageService.addJourney(newJourney);
    await refreshJourneys();
  };

  const addPhotoToJourney = async (journeyId: string, photoData: Omit<PhotoEntry, 'id' | 'journeyId'>) => {
    const journey = journeys.find(j => j.id === journeyId);
    if (!journey) return;

    const newPhoto: PhotoEntry = {
      ...photoData,
      id: Date.now().toString(),
      journeyId,
    };

    const updatedJourney = {
      ...journey,
      photos: [...journey.photos, newPhoto],
    };

    await AsyncStorageService.updateJourney(updatedJourney);
    await refreshJourneys();
  };

  const deleteJourney = async (journeyId: string) => {
    await AsyncStorageService.deleteJourney(journeyId);
    await refreshJourneys();
  };

  useEffect(() => {
    refreshJourneys();
  }, []);

  return (
    <JourneyContext.Provider
      value={{
        journeys,
        loading,
        addJourney,
        addPhotoToJourney,
        deleteJourney,
        refreshJourneys,
      }}
    >
      {children}
    </JourneyContext.Provider>
  );
}
