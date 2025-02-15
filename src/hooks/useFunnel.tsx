import type { ReactElement } from 'react';
import React, { useState } from 'react';

interface StepProps<T extends string = string> {
  name: T;
  children: ReactElement<StepChildProps<T>>;
}

export interface StepChildProps<T extends string = string> {
  onNext?: () => void;
  onPrev?: () => void;
  goToStep?: (stepName: T) => void;
  totalStepsNumber?: number; // optional
  currentStepNumber?: number; // optional
  currentStage?: number;
}

interface FunnelProps<T extends string> {
  children: ReactElement<StepProps<T>>;
}

export const useFunnel = <T extends string>(steps: readonly T[]) => {
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

  const goToStep = (stepName: T) => {
    const stepIndex = steps.indexOf(stepName);
    if (stepIndex !== -1) {
      setCurrentStepIndex(stepIndex);
    }
  };

  const getStepNumbers = (stepName: T) => {
    const profileSteps = steps.slice(0, 9);
    const idealSteps = steps.slice(9, 15);
    const faceAuthSteps = steps.slice(15);

    if (profileSteps.includes(stepName)) {
      return {
        currentStep: profileSteps.indexOf(stepName) + 1,
        totalSteps: profileSteps.length,
      };
    }
    if (idealSteps.includes(stepName)) {
      return {
        currentStep: idealSteps.indexOf(stepName) + 1,
        totalSteps: idealSteps.length,
      };
    }
    if (faceAuthSteps.includes(stepName)) {
      return {
        currentStep: faceAuthSteps.indexOf(stepName) + 1,
        totalSteps: faceAuthSteps.length,
      };
    }
    return { currentStep: 1, totalSteps: 1 };
  };

  const getCurrentStage = (stepName: T) => {
    if (stepName.startsWith('profile')) return 1;
    if (stepName.startsWith('ideal')) return 2;
    if (stepName.startsWith('face-auth')) return 3;
    return 1;
  };

  const Step = ({ name, children }: StepProps<T>) => {
    const { currentStep: stepNumber, totalSteps } = getStepNumbers(name);
    const stage = getCurrentStage(name);

    return (
      <div>
        {React.cloneElement(children, {
          ...children.props,
          onNext: next,
          onPrev: prev,
          goToStep: goToStep,
          totalStepsNumber: totalSteps,
          currentStepNumber: stepNumber,
          currentStage: stage,
        })}
      </div>
    );
  };

  const Funnel = ({ children }: FunnelProps<T>) => {
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
    currentStage: getCurrentStage(currentStep),
  } as const;
};
