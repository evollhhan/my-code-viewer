import Codeviewer from './core';
import HL from './extend/lang-support';
import TEST_FILES from './example.json';

//
// DEMO
// ----

// 1. create a viewer instance.
const viewer = new Codeviewer();

// 2. init with a renderer.
// you can use either built-in highlight.js-for-web renderer or your customer renderer
viewer.useRenderer(HL.highlightBlock);

//
// 3. load all files from a json file.
viewer.loadFiles(TEST_FILES);

//
// TODO START!
// = Custom Way =
// load list from somewhere ,listen to the event & render the content.
// viewer.loadList(...);
// viewer.onFileClicked = function (file) {
//   viewer.render(...)
// }
// TODO END!

// 4. append element to the document.
document.body.appendChild(viewer.rootNode);
