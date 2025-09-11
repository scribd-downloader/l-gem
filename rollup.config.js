import terser from "@rollup/plugin-terser";

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
  plugins: [terser()]
};


