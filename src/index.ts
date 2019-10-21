import Codeviewer from './@core';
import TEST_FILES from './data.json';

const viewer = new Codeviewer();
viewer.loadFiles(TEST_FILES);
document.body.appendChild(viewer.rootNode);
