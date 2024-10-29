import { useRouter, useSearchParams } from 'next/navigation';

export function useQueryState<T extends string>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const value = (searchParams.get(key) as T) || defaultValue;

  const setValue = (newValue: T) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, newValue);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return [value, setValue];
}
