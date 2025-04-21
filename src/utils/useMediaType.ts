import React from 'react';

// Твои брейкпоинты из SCSS (должны совпадать)

export const BREAKPOINTS = {
  mobile: 'mobile',
  tablet: 'tablet',
  desktop: 'desktop',
};

const breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
};

export function useMediaType(): string {
  const [mediaType, setMediaType] = React.useState<string>(BREAKPOINTS.mobile);

  React.useEffect(() => {
    function updateMediaType() {
      const width = window.innerWidth;

      if (width >= breakpoints.desktop) {
        setMediaType(BREAKPOINTS.desktop);
      } else if (width >= breakpoints.tablet) {
        setMediaType(BREAKPOINTS.tablet);
      } else {
        setMediaType(BREAKPOINTS.mobile);
      }
    }

    // Вызываем сразу при монтировании
    updateMediaType();

    // Добавляем слушатель на изменение размера окна
    window.addEventListener('resize', updateMediaType);

    // Убираем слушатель при размонтировании
    return () => window.removeEventListener('resize', updateMediaType);
  }, []);

  return mediaType;
}
