import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import externalGlobals from "rollup-plugin-external-globals";

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/js/markdown-render-iife.js",
      format: "iife",
      name: "mdRenderPlugin",
    },
    {
      file: "dist/js/markdown-render-cjs.js",
      format: "cjs",
      name: "mdRenderPlugin",
    },
    // {
    //   file: "dist/markdown-render-js.iife.min.js",
    //   format: "es",
    //   plugins: [terser()],
    // },
  ],
  plugins: [
    externalGlobals({
      //   "highlightjs-solidity": "hljsDefineSolidity",
    }),
    json(),
    resolve({
      moduleDirectories: ["node_modules"],
      preferBuiltins: false,
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
    }),
  ],
  // https://stackoverflow.com/questions/61827807/svelte-i18n-svelte-rollup-compiler-warning-this-has-been-rewritten-to-unde
  moduleContext: (id) => {
    // In order to match native module behaviour, Rollup sets `this`
    // as `undefined` at the top level of modules. Rollup also outputs
    // a warning if a module tries to access `this` at the top level.
    // The following modules use `this` at the top level and expect it
    // to be the global `window` object, so we tell Rollup to set
    // `this = window` for these modules.
    const thisAsWindowForModules = ["node_modules/pdfobject/pdfobject.js"];

    if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
      return "window";
    }
  },
};
