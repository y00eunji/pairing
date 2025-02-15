'use client';

import Onboarding from '@/components/onboarding';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <Onboarding />
    </OnboardingProvider>
  );
}
