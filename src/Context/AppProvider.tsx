import { useState, createContext, useEffect } from "react";
import { AppContextType } from "../types/context.type";


export const AppContext = createContext<AppContextType>({
  isClose: false,
  setIsClose: () => { },
  todoCount: 0,
  setTodoCount: () => { }
});

interface IChildren {
  children?: React.ReactNode
}

export const AppProvider = ({ children }: IChildren) => {
  const [todoCount, setTodoCount] = useState<number>(0);
  const [isClose, setIsClose] = useState<boolean>(true)

  // console.log(todoCount);

  useEffect(() => {
    if (todoCount > 0 && todoCount === 3) {
      setIsClose(false);
    }
  }, [todoCount, setIsClose]);

  return (
    <AppContext.Provider
      value={{ setTodoCount, todoCount, isClose, setIsClose }}
    >
      {children}
    </AppContext.Provider>
  );
};
