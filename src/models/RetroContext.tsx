import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type RetroContextType = {
    retroDisplayed: boolean;
    setRetroDisplayed: Dispatch<SetStateAction<boolean>>;
};

const RetroContext = createContext<RetroContextType | undefined>(undefined);

interface RetroProviderProps {
    children: ReactNode;
  }
  
  export const RetroProvider = ({ children }: RetroProviderProps) => {
    const [retroDisplayed, setRetroDisplayed] = useState<boolean>(() => {
      const storedValue = localStorage.getItem("retroDisplayed");
      return storedValue ? JSON.parse(storedValue) : false;
    });
  
    useEffect(() => {
      localStorage.setItem("retroDisplayed", JSON.stringify(retroDisplayed));
    }, [retroDisplayed]);
  
    return (
      <RetroContext.Provider value={{ retroDisplayed, setRetroDisplayed }}>
        {children}
      </RetroContext.Provider>
    );
  };
  
  export const useRetroContext = () => {
    const context = useContext(RetroContext);
    if (context === undefined) {
      throw new Error("useRetroContext must be used within a RetroProvider");
    }
    return context;
  };

export default RetroContext;
