'use client';

import { createContext, useContext, useState } from 'react';

import type { OnboardingData } from '@/types/onboarding';

interface OnboardingContextType {
  data: OnboardingData | null;
  updateData: (newData: Partial<OnboardingData>) => void;
  resetData: () => void;
  currentStage: number;
  setCurrentStage: (stage: number) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined,
);

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [data, setData] = useState<OnboardingData | null>(null);
  const [currentStage, setCurrentStage] = useState(1);

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) =>
      prev ? { ...prev, ...newData } : (newData as OnboardingData),
    );
  };

  const resetData = () => {
    setData(null);
  };

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        resetData,
        currentStage,
        setCurrentStage,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);

  if (context === undefined) {
    throw new Error('useOnboarding must be used within a OnboardingProvider');
  }
  return context;
}
