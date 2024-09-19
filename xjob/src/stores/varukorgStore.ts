import { create } from "zustand";

interface VarukorgState {
  items: Record<number, number>; // En map från dish id till antal
  addOrUpdateItem: (idDish: number, antal: number) => void;
  removeItem: (idDish: number) => void;
}

export const useVarukorgStore = create<VarukorgState>((set) => ({
  items: {}, // Initialt tomt objekt
  addOrUpdateItem: (idDish, antal) =>
    set((state) => ({
      items: {
        ...state.items,
        [idDish]: (state.items[idDish] || 0) + antal, // Addera det nya antalet till det befintliga
      },
    })),
  removeItem: (idDish) =>
    set((state) => {
      const newItems = { ...state.items }; // Skapa en kopia av det nuvarande state.items
      delete newItems[idDish]; // Ta bort objektet med nyckeln idDish
      return { items: newItems }; // Returnera det uppdaterade state
    }),
}));
