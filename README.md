# ![Logo](src/assets/icon-48.png?raw=true "Logo") React Chrome Extension starter
A simple starter to bootstrap your next chrome extension.

## Usage

```bash
$ yarn 
# install dependencies

$ yarn dev
# launch files compilation in watch mode and an instance of React Devtool

$ yarn build
# build production-ready files into a 'build' folder 
```

### In Chrome web browser
1. Go to: [**chrome://extensions**](chrome://extensions)
2. Toggle: "**developer mode**" on
3. Click on: "**Load unpacked**"
4. Select the newly created folder "**build**" from the project folder

### In Firefox web browser
1. Go to: [**about:debugging**](about:debugging)
2. Select: "**Enable add-on debugging**"
3. Click on: "**Load Temporary Add-on…**"
4. Open the newly created folder "**build**" from the project folder, and choose the "**manifest.json**" file

## React DevTools
By default, using React Devtools within a Chrome extension can be a tedious 
task. This template include, by default, support for it. It uses
the standalone [react-devtool package](https://www.npmjs.com/package/react-devtools).
When you edit your React code in the `popup` folder, files are updated and you 
must **re-open your popup extension** to see changes. When the popup is opened,
**React DevTools** window will show your React tree.

## Styled component
The template comes with [styled-components](https://github.com/styled-components/styled-components). 
Again, you can wether choose to not use it, this is a personnal choice. 
You can also find a `src/popup/styles` folder, which contains many related 
styled-components files to keep things organized. It's again a personnal convention 
that I follow, feel free to anhilate this directory if you want 😢 

## WebpackExtensionReloader
[webpack-extension-reloader](https://github.com/rubenspgcavalcante/webpack-extension-reloader) is used 
so any changes you made to your code (mainly the `background` and `contentscript` related codes) 
make your extensions to be reloaded by the browser, so it understands your new 
changes in those files.

## Aliases
It includes by default support for aliases in `tsconfig.json`.
They are 5 defaulted aliases, ready to use : 
```typescript
// ~contentscript refers to src/contentscript
import { something } from '~contentscript/file'

// ~popup refers to src/popup
import { something } from '~popup/file'

// ~styles refers to src/popup/styles
import { something } from '~styles/file'

// ~background refers to src/background
import { something } from '~background/file'

// ~ refers to src
import { something } from '~/file'
```

It uses [tsconfig-paths](https://github.com/dividab/tsconfig-paths) and it's corresponding Webpack plugin, [tsconfig-paths-webpack-plugin](https://github.com/dividab/tsconfig-paths-webpack-plugin). 
It means that you only have to setup your aliases in the `tsconfig.json`, it's your source of truth. 

## @types and extending modules
It also includes a `@types` directory under **src**, so you can easily 
separate your types or extends some external modules. They are also included in the `tsconfig.json`
For example, if some package named `foo` does not have any types in [DefinitelyTyped](https://definitelytyped.org/), you could 
add a `index.d.ts` under `src/@types/foo/index.d.ts`. It is just my personnal convention, so do as you want!

```typescript
// src/@types/foo/index.d.ts

// to make sure Typescript get the original types from the module (if any)
import * as foo from 'foo'

declare module 'foo' {
  declare function foo(bar: string): boolean
} 
```

Because the `@types` directory is declared in `typeRoots`, Typescript will no longer complain if you imported your package with missing types

## Tooling
The template includes [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) (with [Typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)), [Babel](https://babeljs.io/) and [Husky](https://github.com/typicode/husky).
All their related configurations are in the `*rc` files.

## Troubleshooting
When you open for the first time the popup extension and you see nothing, 
inspect the popup extension (right click to the extension icon > Inspect popup)

If you see an error like this on your console
![error](https://miro.medium.com/max/1625/1*XOZ-S9jMg84f1Dmf5hwB5Q.png)
It's because of a **C**ontent **S**ecurity **P**olicy. 
By default, Chrome blocks inline scripts in extension, so the React 
app may not work. To make it works, copy the hash that the error gave you
and paste it in the `manifest.json` file, in the `content_security_policy` like this
```json
{
  ...
  "content_security_policy": "connect-src 'self' ws://localhost:*; script-src 'self' 'unsafe-eval' '<YOUR_HASH_HERE>'; object-src 'self'",
  ... 
}
```

Rebuild the extension and it should works
