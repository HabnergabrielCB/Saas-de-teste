export interface StandardRace {
  id: string;
  name: string;
  distanceKm: number;
}

export const STANDARD_RACES: StandardRace[] = [
  { id: "5k", name: "5 km", distanceKm: 5 },
  { id: "10k", name: "10 km", distanceKm: 10 },
  { id: "half", name: "Meia maratona", distanceKm: 21.0975 },
  { id: "full", name: "Maratona", distanceKm: 42.195 },
];
