# my-code-viewer

> A web development code viewer based on highlight.js.

## Usage
```typescript
import CodeViewer from 'my-code-viewer';
import 'my-code-viewer/dist/style.css';

// 1. create a viewer instance.
const viewer = new Codeviewer();

// 2. load your files data: Array<IFile>
viewer.loadFiles(YOUR_FILES);

// 3. append element
document.body.appendChild(viewer.rootNode);
```

## File Data Structure

You can view the example file in src/data.json.

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
  1. typescript
  2. javascript
  3. stylus
  4. scss
  5. less
  6. glsl

## Road Map
  1. customize lang support and style.
