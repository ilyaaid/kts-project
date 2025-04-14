import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack, { RuleSetUse } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import 'webpack-dev-server';
import tsconfig from './tsconfig.app.json';

const ROOT_PATH = path.resolve(__dirname);
const SRC_PATH = path.join(ROOT_PATH, tsconfig.compilerOptions.baseUrl);

const Modes = {
  DEV: 'development',
  PROD: 'production',
};

const OPTIONS = {
  mode: Modes.DEV,
  analyzeModules: false,
}


const parseTsConfigPaths = (paths: Record<string, string[]>): Record<string, string> => {
  const webpackConfigAliases: Record<string, string> = {};

  Object.entries(paths).forEach(([alias, paths]) => {
    const aliasPath = paths[0].replace(/[^a-zA-Z]/g, '');
    webpackConfigAliases[alias] = path.join(SRC_PATH, aliasPath);
  });

  return webpackConfigAliases;
};

const isProd = OPTIONS.mode === Modes.PROD;

const getLoadersForStyles = (withModules = false): RuleSetUse => {
  return [
    isProd ? 'style-loader' : MiniCssExtractPlugin.loader,
    !withModules
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
              namedExport: false,
              exportLocalsConvention: 'as-is',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
};

const config: webpack.Configuration = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? 'source-map' : 'eval-source-map',
  entry: {
    main: {
      import: path.join(SRC_PATH, 'main.tsx'),
    },
  },
  output: {
    path: path.join(ROOT_PATH, 'dist'),
    filename: '[name]_[contenthash].js',
    clean: true,
  },

  devServer: {
    port: 4000,
    hot: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(ROOT_PATH, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash].css',
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.join(ROOT_PATH, 'tsconfig.app.json'),
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(ROOT_PATH, 'public'),
          to: '',
        },
      ],
    }),
    OPTIONS.analyzeModules ? new BundleAnalyzerPlugin() : false,
  ],
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: getLoadersForStyles(false),
        exclude: /\.module\.s?css$/,
      },
      {
        test: /\.module\.s?css$/,
        use: getLoadersForStyles(true),
      },
      {
        test: /\.[t|j]sx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};

export default config;
