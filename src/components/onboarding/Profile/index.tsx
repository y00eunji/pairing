'use client';

import { useState, type ReactElement } from 'react';

import type { StepChildProps } from '@/hooks/useFunnel';
import { useFunnel } from '@/hooks/useFunnel';
import type { Content } from '@/types/onboarding';

import Address from './Address';
import BirthDay from './BirthDay';
import Complete from './Complete';
import Gender from './Gender';
import Hobby from './Hobby';
import Mbti from './Mbti';
import MyImage from './MyImage';
import Name from './Name';
import Wellness from './Wellness';

const steps = [
  'name',
  'gender',
  'birth',
  'address',
  'hobby',
  'mbti',
  'wellness',
  'photo',
  'complete',
];

export default function ProfileOnboarding() {
  const { Funnel, Step, currentStep } = useFunnel(steps);
  const [content, setContent] = useState<Content>({ name: '' });

  console.log(content);

  const stepComponents: Record<
    (typeof steps)[number],
    ReactElement<StepChildProps>
  > = {
    name: <Name setContent={setContent} />,
    gender: <Gender setContent={setContent} />,
    birth: <BirthDay setContent={setContent} />,
    address: <Address setContent={setContent} />,
    hobby: <Hobby setContent={setContent} />,
    mbti: <Mbti setContent={setContent} />,
    wellness: <Wellness setContent={setContent} />,
    photo: <MyImage setContent={setContent} />,
    complete: <Complete />,
  } as const;

  return (
    <div>
      <Funnel>
        <Step name={currentStep}>{stepComponents[currentStep]}</Step>
      </Funnel>
    </div>
  );
}
