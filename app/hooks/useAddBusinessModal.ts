import { create } from "zustand";

interface AddBusinessModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddBusinessModal = create<AddBusinessModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddBusinessModal;