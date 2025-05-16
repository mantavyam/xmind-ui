import * as path from 'path'
import { fileURLToPath } from 'url'
import type { Configuration as WebpackConfig } from 'webpack'
import type { Configuration as DevServerConfig } from 'webpack-dev-server'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

interface Configuration extends WebpackConfig {
  devServer?: DevServerConfig
}

const commonConfig: Partial<Configuration> = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  externals: {
    // Add external dependencies if needed
  }
}

const config: Configuration[] = [
  {
    ...commonConfig,
    name: 'dev',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
      library: {
        name: 'XMindEmbedViewer',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
      path: path.join(__dirname, 'dist'),
      filename: 'xmind-embed-viewer.js'
    },
    devServer: {
      port: 9000,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      compress: true,
      hot: true,
      open: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.esm.json',
                transpileOnly: true
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
  },
  {
    ...commonConfig,
    name: 'prod-umd',
    mode: 'production',
    devtool: 'source-map',
    output: {
      library: {
        name: 'XMindEmbedViewer',
        type: 'umd',
        export: 'default',
      },
      globalObject: 'this',
      path: path.join(__dirname, 'dist/umd'),
      filename: 'xmind-embed-viewer.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: 'tsconfig.umd.json'
              }
            }
          ],
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      minimize: true
    }
  }
]

export default config
