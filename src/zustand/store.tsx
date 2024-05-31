import { create } from 'zustand';

interface IStore {
    isPopup: boolean,
    todoCount: number,
    actions: {
        setIsPopup: (isPopup: boolean) => void,
        setTodoCount: (todoCount: number) => void;
    }
}

const store = create<IStore>((set) => ({
    todoCount: 0,
    isPopup: false,
    actions: {
        setTodoCount: (count) => {
            set({ todoCount: count });
            if (count > 1 && count === 3) {
                set({ isPopup: true })
            }
        },
        setIsPopup: (isPopup) => set({ isPopup }), // SET will return an object
    }
}))

// VARIABLES
export const useIsPopUp = () => store(state => state.isPopup);
export const useTodoCount = () => store(state => state.todoCount);

// ACTIONS
export const useGlobalActions = () => store(state => state.actions);