import type { ReactElement } from 'react';
import React, { useState } from 'react';

interface StepProps {
  name: string;
  children: ReactElement<StepChildProps>;
}

export interface StepChildProps {
  onNext?: () => void;
  onPrev?: () => void;
  totalStepsNumber: number;
  currentStepNumber: number;
}

interface FunnelProps {
  children: ReactElement<StepProps>;
}

export const useFunnel = (steps: readonly string[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const currentStep = steps[currentStepIndex];
  const totalStepsNumber = steps.length - 1;
  const currentStepNumber = currentStepIndex + 1;

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

  const Step = ({ name, children }: StepProps) => {
    if (name !== currentStep) return null;

    return (
      <div>
        {React.cloneElement(children, {
          ...children.props,
          onNext: next,
          onPrev: prev,
          totalStepsNumber,
          currentStepNumber,
        })}
      </div>
    );
  };

  const Funnel = ({ children }: FunnelProps) => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child) && child.type === Step) {
        return child;
      }
      return null;
    });
  };
  return {
    Funnel, // 전체 퍼널을 감싸는 컴포넌트
    Step, // 각 단계를 나타내는 컴포넌트
    currentStep, // 현재 단계 이름
    next, // 다음 단계로 이동하는 함수
    prev, // 이전 단계로 이동하는 함수
    goToStep, // 특정 단계로 직접 이동하는 함수
    isFirstStep: currentStepIndex === 0, // 첫 단계인지 여부
    isLastStep: currentStepIndex === steps.length - 1, // 마지막 단계인지 여부
    currentStepIndex, // 현재 단계의 인덱스
    totalStepsNumber, // 총 단계 수
    currentStepNumber, // 현재 단계 번호 (1부터 시작)
    progress: (currentStepIndex + 1) / steps.length, // 진행률 (0 ~ 1)
  } as const;
};
