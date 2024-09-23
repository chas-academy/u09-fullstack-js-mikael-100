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
        // Den första [idDish]: är de inkommande värdet som med (state.items[idDish] || 0) kollar om det finns något matchande nyckel i objectet. Och det finns plussas de på med antal. OBS (det kan bara finnas unika nycklar i ett object så det kan ej finnas två identiska, en skulle i sådana fall överskrivas)
        [idDish]: (state.items[idDish] || 0) + antal, // Addera det nya antalet till det befintliga
      },
    })),
  removeItem: (idDish) =>
    set((state) => {
      const newItems = { ...state.items };
      console.log("Före borttagning:", newItems); // Logga state innan borttagning
      delete newItems[idDish]; // Ta bort objektet med nyckeln idDish
      console.log("Efter borttagning: detta är IdDish", newItems[idDish]); // Logga state efter borttagning
      return { items: newItems }; // Returnera det uppdaterade state
    }),
}));
