const path = require('path');
const fileSearcher = require('../tools/file-searcher');

const OUTPUT_DIR = path.resolve(__dirname, '../src');
const OUTPUT_FILENAME = 'example.json';
const BASE_URL = path.resolve(__dirname, '../');
const INCLUDE = [
  'package.json',
  'tools',
  'build',
  'src'
]

// fileSearcher.addRules('json', /\.json$/);
fileSearcher.makeList(INCLUDE, BASE_URL)
  .toFile(OUTPUT_DIR, OUTPUT_FILENAME);