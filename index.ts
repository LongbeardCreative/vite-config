// View your website at your own local server
// for example http://vite-php-setup.test

// http://localhost:3000 is serving Vite on development
// but accessing it directly will be empty
// TIP: consider changing the port for each project, see below

// IMPORTANT image urls in CSS works fine
// BUT you need to create a symlink on dev server to map this folder during dev:
// ln -s {path_to_vite}/src/assets {path_to_public_html}/assets
// on production everything will work just fine

import { defineConfig } from "vite";
import liveReload from "vite-plugin-live-reload";
import path from "path";
import fs from "fs";

const scriptsRoot = "./src/scripts";

function getTopLevelFiles(root: string): Record<string, string> {
  const topLevelFiles = fs.readdirSync(path.resolve(root, scriptsRoot));
  const files: { [key: string]: string } = {};
  topLevelFiles.forEach((file) => {
    const isFile = fs.lstatSync(path.resolve(scriptsRoot, file)).isFile();
    if (
      isFile &&
      !file.includes(".d.ts") &&
      (path.extname(file) === ".ts" || path.extname(file) === ".js")
    ) {
      const chunkName = file.slice(0, file.lastIndexOf("."));
      files[chunkName] = path.resolve(scriptsRoot, file);
    }
  });
  return files;
}

const config = (root: string) => {
  return defineConfig({
    plugins: [
      // vue(),
      liveReload([
        // edit live reload paths according to your source code
        // for example:
        // __dirname + "/(app|config|views)/**/*.php",
        // using this for our example:
        `${root}/**/*.php`,
      ]),
    ],

    // config
    root,
    base: process.env.APP_ENV === "development" ? "/" : "/dist/",

    build: {
      // output dir for production build
      outDir: path.resolve(root, "./dist"),
      emptyOutDir: true,

      // emit manifest so PHP can find the hashed files
      manifest: true,

      // our entry
      rollupOptions: {
        // input: [
        //   path.resolve(root, `${scriptsRoot}/main.ts`),
        //   path.resolve(root, `${scriptsRoot}/login.ts`),
        // ],
        input: getTopLevelFiles(root),
      },
    },

    server: {
      // required to load scripts from custom host
      cors: true,

      // we need a strict port to match on PHP side
      // change freely, but update on PHP to match the same port
      strictPort: true,
      port: 3000,

      hmr: {
        port: 3000,
        host: "localhost",
        protocol: "ws",
      },
    },
  });
};

// https://vitejs.dev/config/
export default config;
