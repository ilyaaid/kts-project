import { useLocalObservable } from 'mobx-react-lite';
import React from 'react';

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  return useLocalObservable<T>(() => creator());
  const container = React.useRef<null | T>(null);
  const outdated = React.useRef<boolean>(false);
  // console.log('useLocalStore: ', container.current);
  if (container.current === null || outdated.current) {
    container.current = creator();
    outdated.current = false;
    // console.log('useLocalStore created:', container.current);
  }

  React.useEffect(() => {
    // console.log('mount');
    if (outdated.current) {
      container.current = creator();
      outdated.current = false;
    }
    return () => {
      // console.log('unmount');
      container.current?.destroy();
      // container.current = null;
      outdated.current = true;
    };
  }, [creator]);

  // return container.current;
};
