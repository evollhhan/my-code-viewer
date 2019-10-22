interface IFile {
  filename: string;
  lang?: string;
  dir?: boolean;
  data?: string;
  children?: IFile[];
  filePath?: string;
}

type IRenderer = (ele: HTMLPreElement, ...args: any[]) => void;

declare var Codeviewer: {
  new (): typeof Codeviewer;
  rootNode: HTMLElement;
  useRenderer(renderer: IRenderer): void;
  loadFiles(files: IFile[]): void;
}

export = Codeviewer;
