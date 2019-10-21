import HL from 'highlight.js/lib/highlight';
import HL_typescript from 'highlight.js/lib/languages/typescript';
import HL_javascript from 'highlight.js/lib/languages/javascript';
import HL_stylus from 'highlight.js/lib/languages/stylus';
import HL_less from 'highlight.js/lib/languages/less';
import HL_scss from 'highlight.js/lib/languages/scss';
import HL_glsl from 'highlight.js/lib/languages/glsl';
import 'highlight.js/styles/atom-one-dark.css?raw';

HL.registerLanguage('javascript', HL_typescript);
HL.registerLanguage('javascript', HL_javascript);
HL.registerLanguage('stylus', HL_stylus);
HL.registerLanguage('less', HL_less);
HL.registerLanguage('scss', HL_scss);
HL.registerLanguage('glsl', HL_glsl);

export default HL;
