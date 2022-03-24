/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

 import html from '@web/rollup-plugin-html';
 import {copy} from '@web/rollup-plugin-copy';
 import resolve from '@rollup/plugin-node-resolve';
 import {terser} from 'rollup-plugin-terser';
 import minifyHTML from 'rollup-plugin-minify-html-literals';
 import summary from 'rollup-plugin-summary';
import replace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup'

export default {
  input: './src/App.js',
  output: {
    dir: 'dist'
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    html({
      input: 'index.html',
    }),
    resolve({
      exportConditions: ['development']
    }),
    minifyHTML(),
    replace({'Reflect.decorate': 'undefined', preventAssignment: true, include: ['./src/**/*.js'], __environment__: '"development"' }),
    resolve(),
    terser({
      ecma: 2020,
      module: true,
      warnings: true,
    }),
    copy({
      patterns: ['assets/**/*'],
    }),
    summary(),
  ],
}
