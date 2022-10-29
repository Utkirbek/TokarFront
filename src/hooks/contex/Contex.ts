import { createContext, useContext } from "react";

export type GlobalContent = {
  copy: any;
};
export const Context = createContext<GlobalContent>({
    copy: { settoggleDashboard()}, 
});
export const useGlobalContext = () => useContext(Context);
