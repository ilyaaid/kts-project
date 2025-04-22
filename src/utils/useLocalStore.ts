import { useLocalObservable } from 'mobx-react-lite';
import React from 'react';

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  return useLocalObservable<T>(() => creator());
  const container = React.useRef<null | T>(null);
  const outdated = React.useRef<boolean>(false);
  if (container.current === null || outdated.current) {
    container.current = creator();
    outdated.current = false;
  }

  React.useEffect(() => {
    if (outdated.current) {
      container.current = creator();
      outdated.current = false;
    }
    return () => {
      container.current?.destroy();
      outdated.current = true;
    };
  }, [creator]);
};
