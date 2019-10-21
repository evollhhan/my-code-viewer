interface IFile {
  filename: string;
  lang?: string;
  dir?: boolean;
  data?: string;
  children?: IFile[];
  filePath?: string;
}

declare var Codeviewer: {
  new (): typeof Codeviewer;
  rootNode: HTMLElement;
  loadFiles(files: IFile[]): void;
}

export = Codeviewer;
