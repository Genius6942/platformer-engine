import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import dts from "rollup-plugin-dts";

const name = "platjs";

const plugins = [nodeResolve({ extensions: [".ts"] }), typescript()];

export default [
  {
    input: "library/index.ts",
    output: [
      {
        format: "esm",
        name: name,
        file: "dist/" + name + ".module.js",
        indent: "\t",
      },
    ],
    plugins: [...plugins],
  },

  {
    input: "library/index.ts",
    output: [
      {
        format: "umd",
        name: name,
        file: "dist/" + name + ".js",
        indent: "\t",
      },
      {
        format: "cjs",
        name: name,
        file: "dist/" + name + ".cjs",
        indent: "\t",
      },
    ],
    plugins: [...plugins],
  },

  {
    input: "library/index.ts",
    output: [
      {
        format: "umd",
        name: name,
        file: "dist/" + name + ".min.js",
        indent: "\t",
      },
    ],
    plugins: [...plugins, terser()],
  },
  {
    input: "library/index.ts",
    output: [
      {
        name: name,
        file: "dist/" + name + ".d.ts",
        format: "es",
        indent: "\t",
      },
    ],
    plugins: [dts()],
  },
];
