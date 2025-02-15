'use client';

import { type ReactElement } from 'react';

import type { StepChildProps } from '@/hooks/useFunnel';
import { useFunnel } from '@/hooks/useFunnel';

import FaceAuthCheckImage from './FaceAuth/CheckImage';
import FaceAuthComplete from './FaceAuth/Complete';
import FaceAuthImage from './FaceAuth/FaceAuthImage';
import IdealTypeAddress from './idealType/Address';
import IdealTypeAge from './idealType/Age';
import IdealTypeComplete from './idealType/Complete';
import IdealTypeMbti from './idealType/Mbti';
import IdealTypeStart from './idealType/Start';
import IdealTypeWellness from './idealType/Wellness';
import OnboardingComplete from './OnboardingComplete';
import ProfileAddress from './profile/Address';
import ProfileBirthDay from './profile/BirthDay';
import ProfileComplete from './profile/Complete';
import ProfileGender from './profile/Gender';
import ProfileHobby from './profile/Hobby';
import ProfileMbti from './profile/Mbti';
import ProfileMyImage from './profile/MyImage';
import ProfileName from './profile/Name';
import ProfileWellness from './profile/Wellness';

export const steps = [
  'profile-name',
  'profile-gender',
  'profile-birth',
  'profile-address',
  'profile-hobby',
  'profile-mbti',
  'profile-wellness',
  'profile-photo',
  'profile-complete',
  'ideal-start',
  'ideal-mbti',
  'ideal-address',
  'ideal-age',
  'ideal-wellness',
  'ideal-complete',
  'face-auth-start',
  'face-auth-photo',
  'face-auth-complete',
  'sign-in-complete',
] as const;

export default function OnboardingFunnel() {
  const { Funnel, Step, currentStep } =
    useFunnel<(typeof steps)[number]>(steps);

  const stepComponents: Record<
    (typeof steps)[number],
    ReactElement<StepChildProps>
  > = {
    'profile-name': <ProfileName />,
    'profile-gender': <ProfileGender />,
    'profile-birth': <ProfileBirthDay />,
    'profile-address': <ProfileAddress />,
    'profile-hobby': <ProfileHobby />,
    'profile-mbti': <ProfileMbti />,
    'profile-wellness': <ProfileWellness />,
    'profile-photo': <ProfileMyImage />,
    'profile-complete': <ProfileComplete />,
    'ideal-start': <IdealTypeStart />,
    'ideal-mbti': <IdealTypeMbti />,
    'ideal-address': <IdealTypeAddress />,
    'ideal-age': <IdealTypeAge />,
    'ideal-wellness': <IdealTypeWellness />,
    'ideal-complete': <IdealTypeComplete />,
    'face-auth-start': <FaceAuthImage />,
    'face-auth-photo': <FaceAuthCheckImage />,
    'face-auth-complete': <FaceAuthComplete />,
    'sign-in-complete': <OnboardingComplete />,
  } as const;

  return (
    <div>
      <Funnel>
        <Step name={currentStep}>{stepComponents[currentStep]}</Step>
      </Funnel>
    </div>
  );
}
