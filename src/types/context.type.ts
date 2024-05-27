export interface AppContextType {
    isPopup: boolean,
    setIsPopup: React.Dispatch<React.SetStateAction<boolean>>,
    todoCount: number,
    setTodoCount: React.Dispatch<React.SetStateAction<number>>;
}