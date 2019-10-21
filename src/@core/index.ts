import HL from './lang-support';
import './index.scss?raw';

interface IRenderOptions {
  filename?: string;
  lang?: string;
}

interface IFile {
  filename: string;
  lang?: string;
  dir?: boolean;
  data?: string;
  children?: IFile[];
  filePath?: string;
}

interface IFileElementAttribute {
  role: string;
  path: string;
  fold?: string;
}

export default class Codeviewer {
  public rootNode: HTMLElement;
  private content: HTMLPreElement;
  private currentTitle: HTMLElement;
  private listElement: HTMLUListElement;
  private list: {
    [index: string]: IFile
  } = {};

  constructor () {
    const rootNode = document.createElement('div');
    rootNode.className = 'code-viewer';
    rootNode.innerHTML = `
      <div class="sidebar">
        <div class="dir">
          <div class="section-title">Files</div>
          <ul></ul>
        </div>
      </div>
      <div class="code-area">
        <div class="section-title filename">Untitled</div>
        <pre></pre>
      </div>
    `;
    this.content = rootNode.querySelector('pre')!;
    this.currentTitle = rootNode.querySelector('.filename') as HTMLElement;
    this.listElement = rootNode.querySelector('ul')! as HTMLUListElement;
    this.rootNode = rootNode;
    this.bindEvents();
  }

  private bindEvents () {
    this.listElement.addEventListener('click', (e: any) => this.onFileClicked(e.target));
  }

  private onFileClicked (target: HTMLElement) {
    const data: IFileElementAttribute = (target.dataset as any);
    switch (data.role) {
      case 'dir':
        target.setAttribute('data-fold', data.fold === '1' ? '0' : '1');
        break;
      case 'file':
        const file = this.list[data.path!];
        this.render(file.data, {
          ...file,
          filename: file.filePath
        });
        break;
      default: break;
    }
  }

  private createFileNode (file: IFile, depth: number) {
    const node = document.createElement('li');
    node.className = 'file-node';
    node.style.textIndent = depth + 'em';
    node.setAttribute('data-path', file.filePath!);
    node.textContent = file.filename;
    if (file.dir) {
      node.setAttribute('data-role', 'dir');
      node.setAttribute('data-fold', '1');
      if (file.children && file.children.length) {
        const ul = document.createElement('ul');
        this.parse(file.children, ul, file.filePath + '/', depth + 1);
        node.appendChild(ul);
      }
    } else {
      node.setAttribute('data-role', 'file');
    }
    return node;
  }

  private parse (files: IFile[], parent: HTMLElement | DocumentFragment, fromPath: string, depth: number) {
  files.map(file => {
    const path = fromPath + file.filename;
      this.list[path] = file;
      file.filePath = path;
      parent.appendChild(this.createFileNode(file, depth));
    });
  }

  loadFiles (files: IFile[]) {
    const frag = document.createDocumentFragment();
    this.parse(files, frag, '/', 1);
    this.listElement.appendChild(frag);
  }

  render (codeText?: string, renderOptions?: IRenderOptions) {
    if (!codeText) return;
    renderOptions = {
      ...{ filename: 'Untitled.ts', lang: 'text' },
      ...renderOptions
    }
    this.content.className = renderOptions.lang!;
    this.content.innerHTML = codeText;
    this.currentTitle.textContent = renderOptions.filename!;
    HL.highlightBlock(this.content);
  }
}
