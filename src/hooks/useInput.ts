import type { ChangeEvent } from 'react';
import { useCallback, useState } from 'react';

interface UseInputReturn<T = string> {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  setValue: (value: T) => void;
  reset: () => void;
}

export function useInput<T = string>(initialValue?: T): UseInputReturn<T> {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value as unknown as T);
    },
    [],
  );

  const reset = useCallback(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleSetValue = useCallback((value: T) => {
    setValue(value);
  }, []);

  return {
    value: value as T,
    onChange,
    setValue: handleSetValue,
    reset,
  };
}
