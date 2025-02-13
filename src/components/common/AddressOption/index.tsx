import { useState } from 'react';

import koreaAddress from '@/constants/address';

interface AddressOptionProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (city: string, district: string) => void;
}

export default function AddressOption({
  isOpen,
  onClose,
  onSelect,
}: AddressOptionProps) {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const cities = Object.keys(koreaAddress);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold">주소 선택</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* 시/도 목록 */}
          <div className="w-1/2 border-r border-gray-200 overflow-y-auto">
            {cities.map((city) => (
              <div
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-3 cursor-pointer transition-colors
                  ${
                    selectedCity === city
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
              >
                {city}
              </div>
            ))}
          </div>

          {/* 구/시 목록 */}
          <div className="w-1/2 overflow-y-auto">
            {selectedCity &&
              koreaAddress[selectedCity as keyof typeof koreaAddress].map(
                (district) => (
                  <div
                    key={district}
                    onClick={() => {
                      onSelect(selectedCity, district);
                      onClose();
                    }}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    {district}
                  </div>
                ),
              )}
            {!selectedCity && (
              <div className="p-4 text-gray-500 text-center">
                시/도를 선택해주세요
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
