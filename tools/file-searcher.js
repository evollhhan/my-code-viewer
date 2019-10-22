const fs = require('fs');
const path = require('path');

/**
 * @typedef {{
 *  filename: string;
 *  lang?: string;
 *  data?: string;
 *  dir?: boolean;
 *  children?: IFile[];
 * }} IFile
 */

/**
 * @type {{[index:string]: RegExp}}
 */
const MIME_TYPE = {
  typescript: /\.tsx?$/,
  javascript: /\.js$/,
  scss: /\.scss$/,
  less: /\.less$/,
  stylus: /\.stylus$/,
  json: /\.json$/,
}

/**
 * @param {IFile} a 
 * @param {IFile} b 
 */
function sortFiles (a, b) {
  if (!a || !b) return 0;
  if (a.dir && !b.dir) return -1;
  if (!a.dir && b.dir) return 1;
  return a.filename < b.filename ? -1 : 1;
}

/**
 * @param {string[]} files
 * @param {IFile[]} parentList
 * @param {string=} baseURL
 */
function searchFiles (files, parentList, baseURL) {
  files.map(filename => {
    /** @type {IFile} */
    const conf = { filename };
    parentList.push(conf);
    const filePath = path.resolve(baseURL || '', filename);
    const stats = fs.lstatSync(filePath);
    if (stats.isDirectory()) {
      conf.dir = true;
      ReadDir(filePath, conf);
    } else {
      ReadFile(filePath, conf);
    }
  })
}

/**
 * @param {string} filePath 
 * @param {IFile} conf 
 */
function ReadFile(filePath, conf) {
  try {
    Object.keys(MIME_TYPE).some(lang => {
      const rule = MIME_TYPE[lang];
      if (rule.test(filePath)) {
        conf.lang = lang;
        return true;
      } else {
        return false;
      }
    });
    const data = fs.readFileSync(filePath);
    conf.data = data.toString();
    console.log('ADD [FIR]:', filePath);
  } catch (err) {
    console.error('Read FILE Error:', filePath);
    throw err;
  }
}

/**
 * 
 * @param {string} dir
 * @param {IFile} parentConf 
 */
function ReadDir(dir, parentConf) {
  try {
    const files = fs.readdirSync(dir);
    if (!files || !files.length) return;
    parentConf.children = parentConf.children || [];
    searchFiles(files, parentConf.children, dir);
    parentConf.children.sort(sortFiles);
    console.log('ADD [DIR]:', dir);
  } catch (err) {
    console.error('Read DIR Error:', dir);
    throw err;
  }
}

module.exports = {
  /**
   * Add language support.
   * @param {string} language e.g typescript
   * @param {RegExp} testRule e.g /\.tsx?$/
   */
  addRules (language, testRule) {
    MIME_TYPE[language] = testRule;
  },

  /**
   * Generate the file list.
   * @param {string[]} files A file or dir name. not path.
   * @param {string=} baseURL
   */
  makeList (files, baseURL) {
    if (!files || !files.length) {
      console.log('0 file found.')
      return;
    }
    const outputList = [];
    searchFiles(files, outputList, baseURL);
    outputList.sort(sortFiles);
    return {
      /**
       * @param {string} outputDir
       * @param {string=} filename
       */
      toFile (outputDir, filename) {
        if (!outputDir) { return; }
        const outputFilename = path.resolve(outputDir, filename || 'file_searcher_data.json');
        fs.writeFileSync(outputFilename, JSON.stringify(outputList, null, 2));
      }
    }
  }  
}
