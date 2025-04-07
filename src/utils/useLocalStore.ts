import React from 'react';

export interface ILocalStore {
  destroy: () => void;
}

export const useLocalStore = <T extends ILocalStore>(creator: () => T): T => {
  const container = React.useRef<null | T>(null);
  if (container.current === null) {
    container.current = creator();
  }

  React.useEffect(() => {
    return () => container.current?.destroy();
  }, []);

  return container.current;

  // const storeRef = React.useRef<null | T>(null);
  // let store = storeRef.current;
  // if (store === null) {
  //   store = creator();
  // }

  // React.useEffect(() => {
  //   return () => store.destroy();
  // }, [store]);

  // return store;
};
