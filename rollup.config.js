import commonjs from "@rollup/plugin-commonjs"; // 使用commonjs
import resolve from "@rollup/plugin-node-resolve"; // 加载第三方库
import babel from "@rollup/plugin-babel"; // 转成es5
import alias from "@rollup/plugin-alias"; // 别名

import { terser } from "rollup-plugin-terser"; // 压缩代码
import serve from "rollup-plugin-serve"; // 启动服务

import replace from "rollup-plugin-replace"; // 注入环境变量
import scss from 'rollup-plugin-scss';

const __DEV__ = process.env.NODE_ENV === "development";

const plugins = [
  alias({
    entries: {},
  }),
  commonjs(),
  resolve({ extensions: [".js"] }),
  replace({ __DEV__ }),
  babel({
    babelHelpers: "bundled", // 多次使用辅助函数只保留一个  比如 class 在转换成es5时会使用多个辅助函数则只保留一个
  }),
  scss({
    fileName: 'myQueryUI.css',
    sourceMap: true,
    outputStyle: 'compressed'
  })
];

if (__DEV__) {
  plugins.push(
    serve({
      // open: true,
      port: process.env.PORT || 9004,
      contentBase: "./",
      historyApiFallback: '/README.md',
    })
  );
}
plugins.push(terser());


export default {
  plugins,
  input: {
    myQueryUI: "src/",
  },
  output: {
    dir: "dist/",
    name: "myQueryUI",
    format: "umd",
    assetFileNames: '[name][extname]'
  },

};
