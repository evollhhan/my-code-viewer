# my-code-viewer

> A web development code viewer based on highlight.js.

## Quick Start

### Usage
This is an example which uses a build-in highlight.js lib as the code renderer.
```typescript
import CodeViewer from 'my-code-viewer';
import HL from 'my-code-viewer/hl.web';
import 'my-code-viewer/dist/style.css';
import 'my-code-viewer/dist/hl.web.css';

// 1. create a viewer instance.
const viewer = new Codeviewer();

// 2. init with a renderer.
viewer.useRenderer(HL.highlightBlock);

// 3. load your files data: Array<IFile>
viewer.loadFiles(YOUR_FILES);

// 4. append element
document.body.appendChild(viewer.rootNode);
```

### File Data Structure
You can view the example in src/example.json.
```typescript
interface IFile {
  // your filename
  filename: string;
  // lang: javascript, typescript, sass...
  lang?: string;
  // if it is a file, put content here.
  data?: string;
  // if it is a dir,
  dir?: boolean;
  // files in this dir.
  children?: IFile[];
}
```

## Current Lang Support
The built-in highlight.js lib currently support these languages.

  1. typescript
  2. javascript
  3. stylus
  4. scss
  5. less
  6. glsl
  7. json

If your want to support more languages:
```typescript
// HL is the same instance as created from highlight.js
hljs.registerLanguage('javascript', javascript);
```

## Build Your Customer Renderer
This is an example for those who want to build your renderer.
```typescript
import CodeViewer from 'my-code-viewer';
import 'my-code-viewer/dist/style.css';

const viewer = new Codeviewer();

// Use your renderer.
viewer.useRenderer((element: HTMLPreElement) => {
  // This first param is the pre element that contains your code.
});

viewer.loadFiles(YOUR_FILES);
document.body.appendChild(viewer.rootNode);
```

## Make Your File List
Here is a tool for you to create your-file-list.json.
```javascript
// In node env.
const path = require('path');
const fileSearcher = require('my-code-viewer/tools/file-searcher');

// This tool will only search for the supported-languages files as mentioned above.
// If you want to add more languages, just:
fileSearcher.addRules('json', /\.json$/);

// @function makeList
// @param {string[]} files
// @param {string} baseURL
fileSearcher.makeList(['src'], __dirname)
  .toFile(path.resolve(__dirname, 'data'), 'my-file-list.json');
```
For more information, you can look at the source code or the /build/local-example.js as an example.

## Road Map
  1. customize lang support and style.
