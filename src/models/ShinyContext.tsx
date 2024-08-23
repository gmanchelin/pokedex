import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";

type ShinyContextType = {
  shinyDisplayed: boolean;
  setShinyDisplayed: Dispatch<SetStateAction<boolean>>;
};

const ShinyContext = createContext<ShinyContextType | undefined>(undefined);

interface ShinyProviderProps {
  children: ReactNode;
}

export const ShinyProvider = ({ children }: ShinyProviderProps) => {
  const [shinyDisplayed, setShinyDisplayed] = useState<boolean>(false);

  return (
    <ShinyContext.Provider value={{ shinyDisplayed, setShinyDisplayed }}>
      {children}
    </ShinyContext.Provider>
  );
};

export const useShinyContext = () => {
  const context = useContext(ShinyContext);
  if (context === undefined) {
    throw new Error("useShinyContext must be used within a ShinyProvider");
  }
  return context;
};

export default ShinyContext;
