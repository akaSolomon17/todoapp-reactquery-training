export interface AppContextType {
    isClose: boolean,
    todoCount: number,
    setIsClose: React.Dispatch<React.SetStateAction<boolean>>,
    setTodoCount: React.Dispatch<React.SetStateAction<number>>;
}