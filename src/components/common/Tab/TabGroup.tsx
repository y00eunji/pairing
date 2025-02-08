import { createContext, useContext, useState } from 'react';

interface TabContextProps {
  activeValue: string | null;
  setActiveValue: (value: string) => void;
}

const TabContext = createContext<TabContextProps | null>(null);

interface TabGroupProps {
  children: React.ReactNode;
  initialTab: string;
}

export function TabGroup({ children, initialTab }: TabGroupProps) {
  const [activeValue, setActiveValue] = useState(initialTab ?? null);

  return (
    <TabContext value={{ activeValue, setActiveValue }}>{children}</TabContext>
  );
}

export function useTab() {
  const context = useContext(TabContext);

  if (!context) {
    throw new Error('useTab must be used within a TabGroup');
  }

  return context;
}
