/* eslint-disable react-refresh/only-export-components */
import appReducer, { initialAppState } from '@/reducer/appReducer';
import { createContext, useContext, useReducer } from 'react';

const appContext = createContext();
appContext.displayName = 'appContext';

export const useAppContext = () => {
  try {
    return useContext(appContext);
  } catch (error) {
    throw new Error('App context is used outside of AppProvider');
  }
};

const AppProvider = ({ children }) => {
  const [appState, dispatchAppState] = useReducer(appReducer, initialAppState);

  return (
    <appContext.Provider
      value={{
        appState,
        dispatchAppState,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppProvider;
