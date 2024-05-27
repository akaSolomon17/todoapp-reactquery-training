import { useState, createContext, useEffect } from "react";
import { AppContextType } from "../types/context.type";


export const AppContext = createContext<AppContextType>({
  isPopup: false,
  setIsPopup: () => { },
  todoCount: 0,
  setTodoCount: () => { }
});

interface IChildren {
  children?: React.ReactNode
}

export const AppProvider = ({ children }: IChildren) => {
  const [todoCount, setTodoCount] = useState<number>(0);
  const [isPopup, setIsPopup] = useState<boolean>(false)

  console.log(isPopup);
  useEffect(() => {
    if (todoCount > 0 && todoCount === 3) {
      setIsPopup(true);
    }
  }, [todoCount, setIsPopup]);

  return (
    <AppContext.Provider
      value={{ setTodoCount, todoCount, isPopup, setIsPopup }}
    >
      {children}
    </AppContext.Provider>
  );
};
