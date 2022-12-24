import create from "zustand";

const useAppState = create((set) => ({
	currentScene: "mountains",
	setFestivalName: (name) => set(() => ({ festivalName: name })),
	setScene: async (scene) => set(() => ({ currentScene: scene })),
}));

export default useAppState;
