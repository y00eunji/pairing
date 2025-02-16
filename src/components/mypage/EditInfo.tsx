'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import BackIcon from '/public/assets/icons/back_icon.svg';

import AddressOption from '@/components/common/AddressOption';
import ChipButton from '@/components/common/ChipButton';
import type { DrinkStatusType, SmokeStatusType } from '@/constants/wellness';
import { DRINK_STATUS, SMOKE_STATUS } from '@/constants/wellness';

import Button from '../common/Button';

const DRINK_OPTIONS = Object.entries(DRINK_STATUS);
const SMOKE_OPTIONS = Object.entries(SMOKE_STATUS);

const hobbies = [
  '운동',
  '게임',
  '여행',
  '독서',
  '맛집탐방',
  '카페',
  '영화',
  '산책',
  '쇼핑',
];

type MbtiType = 'ei' | 'sn' | 'tf' | 'jp';
type MbtiValue = Record<MbtiType, string>;

const MBTI_OPTIONS = {
  ei: { title: '내향형 / 외향형', options: [{ value: 'I' }, { value: 'E' }] },
  sn: { title: '감각형 / 직관형', options: [{ value: 'S' }, { value: 'N' }] },
  tf: { title: '사고형 / 감정형', options: [{ value: 'T' }, { value: 'F' }] },
  jp: { title: '판단형 / 인식형', options: [{ value: 'J' }, { value: 'P' }] },
} as const;

export default function EditInfo() {
  const router = useRouter();
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  // 주소 상태
  const [address, setAddress] = useState({ city: '', district: '' });

  // 취미 상태
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  // MBTI 상태
  const [mbtiSelections, setMbtiSelections] = useState<MbtiValue>({
    ei: '',
    sn: '',
    tf: '',
    jp: '',
  });

  // 음주/흡연 상태
  const [wellness, setWellness] = useState<{
    drink?: DrinkStatusType;
    smoke?: SmokeStatusType;
  }>({});

  const handleToMyPage = () => {
    router.push('/mypage');
  };

  const handleAddressSelect = (city: string, district: string) => {
    setAddress({ city, district });
    setIsAddressOpen(false);
  };

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((item) => item !== hobby)
        : [...prev, hobby],
    );
  };

  const handleMbtiSelect = (type: MbtiType, value: string) => {
    setMbtiSelections((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className="h-[100dvh] bg-[#FFFFFF] flex flex-col">
      <div className="relative w-full px-5 py-4 gap-6 h-[68px] flex justify-center items-center shadow-md flex-shrink-0">
        <div className="absolute left-[20px]">
          <BackIcon onClick={handleToMyPage} />
        </div>
        <div className="font-18-medium">프로필 수정</div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-5 py-8 flex flex-col gap-10">
          {/* 거주지 섹션 */}
          <div className="flex flex-col gap-3">
            <div className="font-20-medium">거주지</div>
            <div className="font-14-regular text-black mb-[20px]">
              거주지를 입력하세요.
            </div>
            <div className="border-b border-black">
              <input
                type="button"
                value={
                  address.city || address.district
                    ? `${address.city} ${address.district}`
                    : '주소를 선택해주세요'
                }
                onClick={() => setIsAddressOpen(true)}
                className="w-full h-[35px] outline-none border-none appearance-none bg-transparent text-gray-900 font-18-regular text-start pb-1"
              />
            </div>
          </div>

          <hr className="border-gray3 border-b-1" />

          {/* 취미 섹션 */}
          <div className="flex flex-col gap-3">
            <div className="font-20-medium">취미</div>
            <div className="font-14-regular text-black mb-[20px]">
              최근 관심있는 취미를 0개 이상 선택해주세요.
            </div>
            <div className="flex flex-wrap gap-3">
              {hobbies.map((hobby) => (
                <ChipButton
                  key={hobby}
                  isSelected={selectedHobbies.includes(hobby)}
                  onClick={() => toggleHobby(hobby)}
                >
                  {hobby}
                </ChipButton>
              ))}
            </div>
          </div>

          <hr className="border-gray3 border-b-1" />

          {/* MBTI 섹션 */}
          <div className="flex flex-col gap-3">
            <div className="font-20-medium">MBTI</div>
            {(
              Object.entries(MBTI_OPTIONS) as [
                MbtiType,
                (typeof MBTI_OPTIONS)[MbtiType],
              ][]
            ).map(([type, { title, options }]) => (
              <div key={type} className="mb-3">
                <div className="mb-2 font-14-medium text-black">{title}</div>
                <div className="flex gap-4">
                  {options.map(({ value }) => (
                    <ChipButton
                      key={value}
                      variant="medium"
                      onClick={() => handleMbtiSelect(type, value)}
                      isSelected={mbtiSelections[type] === value}
                    >
                      {value}
                    </ChipButton>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray3 border-b-1" />

          {/* 음주/흡연 섹션 */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col">
              <div className="font-20-medium">음주여부</div>
              <div className="font-14-regular text-black mb-[10px] mt-[20px]">
                나의 음주 스타일을 선택해주세요.
              </div>

              <div className="flex flex-col gap-3">
                {DRINK_OPTIONS.map(([key, text]) => (
                  <ChipButton
                    key={key}
                    variant="wide"
                    isSelected={wellness.drink === key}
                    onClick={() =>
                      setWellness((prev) => ({
                        ...prev,
                        drink: key as DrinkStatusType,
                      }))
                    }
                  >
                    {text}
                  </ChipButton>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="font-20-medium">흡연여부</div>
              <div className="font-14-regular text-black mb-[10px] mt-[20px]">
                나의 흡연 스타일을 선택해주세요.
              </div>
              <div className="flex flex-col gap-3">
                {SMOKE_OPTIONS.map(([key, text]) => (
                  <ChipButton
                    key={key}
                    variant="wide"
                    isSelected={wellness.smoke === key}
                    onClick={() =>
                      setWellness((prev) => ({
                        ...prev,
                        smoke: key as SmokeStatusType,
                      }))
                    }
                  >
                    {text}
                  </ChipButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddressOption
        isOpen={isAddressOpen}
        onClose={() => setIsAddressOpen(false)}
        onSelect={handleAddressSelect}
      />

      <div className="px-5 py-8">
        <Button
          shape="rectangle"
          variant="filled"
          className="w-full h-[55px]"
          onClick={handleToMyPage}
        >
          수정 완료
        </Button>
      </div>
    </div>
  );
}
