const chalk = require('chalk');

module.exports = (err, stats) => {
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    children: false,
    modules: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n');

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'));
    process.exit(1);
  }

  console.log(chalk.cyan('  Build complete.\n'));
}
