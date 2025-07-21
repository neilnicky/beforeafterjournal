import AsyncStorage from '@react-native-async-storage/async-storage';
import { Journey } from '../types';

const JOURNEYS_KEY = 'journeys';

export class AsyncStorageService {
  static async getJourneys(): Promise<Journey[]> {
    try {
      const journeysJson = await AsyncStorage.getItem(JOURNEYS_KEY);
      return journeysJson ? JSON.parse(journeysJson) : [];
    } catch (error) {
      console.error('Error getting journeys:', error);
      return [];
    }
  }

  static async saveJourneys(journeys: Journey[]): Promise<void> {
    try {
      await AsyncStorage.setItem(JOURNEYS_KEY, JSON.stringify(journeys));
    } catch (error) {
      console.error('Error saving journeys:', error);
      throw error;
    }
  }

  static async addJourney(journey: Journey): Promise<void> {
    const journeys = await this.getJourneys();
    journeys.push(journey);
    await this.saveJourneys(journeys);
  }

  static async updateJourney(updatedJourney: Journey): Promise<void> {
    const journeys = await this.getJourneys();
    const index = journeys.findIndex(j => j.id === updatedJourney.id);
    if (index !== -1) {
      journeys[index] = updatedJourney;
      await this.saveJourneys(journeys);
    }
  }

  static async deleteJourney(journeyId: string): Promise<void> {
    const journeys = await this.getJourneys();
    const filtered = journeys.filter(j => j.id !== journeyId);
    await this.saveJourneys(filtered);
  }
}