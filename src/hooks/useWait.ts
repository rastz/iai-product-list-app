import { useState, useCallback } from "react";

interface UseWaitHook {
  isLoading: boolean;
  wait: () => Promise<void>;
}

export function useWait(milliseconds: number): UseWaitHook {
  const [isLoading, setIsLoading] = useState(false);

  const wait = useCallback(() => {
    setIsLoading(true);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve();
      }, milliseconds);
    });
  }, [milliseconds]);

  return { isLoading, wait };
}
