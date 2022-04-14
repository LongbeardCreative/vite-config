# Vite Configuration File

This is a pluggable vite config file.

## Getting Started

### Installation

To get started, install this package with all its peer dependencies

If the project uses **npm**:

```shell
npm install -D @longbeard/vite-config
npx install-peerdeps -D @longbeard/vite-config
```

If the project uses **pnpm**:

```shell
pnpm install -D @longbeard/vite-config
npx install-peerdeps -D --pnpm @longbeard/vite-config
```

### Importing to `vite.config.ts`

You will need to have `vite.config.ts` file on the root of your project directory. Once that's added, simply use this package inside the file. You will need to pass `__dirname` to the function.

```ts
import viteConfig from "@longbeard/vite-config";

export default viteConfig(__dirname);
```
