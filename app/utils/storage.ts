import AsyncStorage from "@react-native-async-storage/async-storage";
import { Place } from "../types/Place";

const HISTORY_KEY = "SEARCH_HISTORY";

export const savePlaceToHistory = async (place: Place) => {
  const existing = await getSearchHistory();
  const updated = [place, ...existing.filter(p => p.name !== place.name)];
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getSearchHistory = async (): Promise<Place[]> => {
  const data = await AsyncStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearHistory = async () => {
  await AsyncStorage.removeItem(HISTORY_KEY);
};
