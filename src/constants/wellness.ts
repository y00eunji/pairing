export const DRINK_STATUS = {
  atAllNothing: '전혀 안마심',
  unavoidable: '피할 수 없을 때만',
  sometimes: '가끔 마심',
  often: '자주 마심',
  quit: '금주중',
} as const;

export const SMOKE_STATUS = {
  never: '비흡연',
  sometimes: '가끔 피움',
  always: '매일 피움',
  electronic: '전자 담배',
  nonSmoking: '금연중',
} as const;

export type DrinkStatusType = (typeof DRINK_STATUS)[keyof typeof DRINK_STATUS];
export type SmokeStatusType = (typeof SMOKE_STATUS)[keyof typeof SMOKE_STATUS];

export type DrinkStatusKey = keyof typeof DRINK_STATUS;
export type SmokeStatusKey = keyof typeof SMOKE_STATUS;
