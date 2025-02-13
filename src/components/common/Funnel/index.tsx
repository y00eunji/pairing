'use client';

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

interface FunnelContextType {
  currentStep: string;
  next: () => void;
  prev: () => void;
  goToStep: (step: string) => void;
}

const FunnelContext = createContext<FunnelContextType | null>(null);

interface FunnelProviderProps {
  steps: readonly string[];
  children: ReactNode;
}

export function FunnelProvider({ steps, children }: FunnelProviderProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];

  const next = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const prev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const goToStep = (stepName: string) => {
    const stepIndex = steps.indexOf(stepName);
    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex);
    }
  };

  return (
    <FunnelContext.Provider value={{ currentStep, next, prev, goToStep }}>
      {children}
    </FunnelContext.Provider>
  );
}

interface StepProps {
  name: string;
  children: ReactNode;
}

interface StepChildProps {
  onNext?: () => void;
  onPrev?: () => void;
}

function Step({ name, children }: StepProps) {
  const context = useContext(FunnelContext);
  if (!context) throw new Error('Step must be used within FunnelProvider');

  const { currentStep } = context;
  if (name !== currentStep) return null;

  return (
    <div>
      {React.cloneElement(children as React.ReactElement<StepChildProps>, {
        onNext: context.next,
        onPrev: context.prev,
      })}
    </div>
  );
}

function useFunnelContext() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnelContext must be used within FunnelProvider');
  }
  return context;
}

export const Funnel = {
  Provider: FunnelProvider,
  Step,
  useContext: useFunnelContext,
};
