interface IFile {
  filename: string;
  lang?: string;
  dir?: boolean;
  data?: string;
  children?: IFile[];
  filePath?: string;
}

declare class Codeviewer {
  rootNode: HTMLElement;
  loadFiles(files: IFile[]);
}

export = Codeviewer;
