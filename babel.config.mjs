export default function (api) {
  api.cache(true);

  const isProd = process.env.NODE_ENV === 'production';

  return {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [!isProd && 'react-refresh/babel'].filter(Boolean),
  };
}
