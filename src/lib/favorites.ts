import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "cafu:favorite-courts:v1";

export async function getFavoriteIds(): Promise<string[]> {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  const parsed: unknown = JSON.parse(stored);
  return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
}

export async function toggleFavoriteId(id: string): Promise<string[]> {
  const current = await getFavoriteIds();
  const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export async function isFavoriteId(id: string): Promise<boolean> {
  return (await getFavoriteIds()).includes(id);
}
