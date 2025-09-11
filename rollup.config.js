import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

export default {
  input: 'js/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'iife',
    name: 'myBundle',
    globals: {
      'matter-js': 'Matter'
    }
  },
  external: ['matter-js'],
  plugins: [
    terser(),
    copy({
      targets: [
        { src: 'BingSiteAuth.xml', dest: 'dist' },
        { src: 'google6a0b563becc05893.html', dest: 'dist' }
      ]
    })
  ]
};


