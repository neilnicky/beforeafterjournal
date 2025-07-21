export type PhotoEntry = {
  id: string;
  journeyId: string;
  uri: string;
  type: 'before' | 'after';
  timestamp: string;
  notes?: string;
};

export type Journey = {
  id: string;
  title: string;
  category: 'fitness' | 'home' | 'therapy' | 'skincare' | string;
  createdAt: string;
  photos: PhotoEntry[];
};