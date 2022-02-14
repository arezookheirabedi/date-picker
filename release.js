let fs = require('fs');

if (fs.existsSync('./package.json')) {
  var package = require('./package.json');
  let buildDate = package.buildDate;
  package.buildDate = new Date().getTime();
  fs.writeFileSync('./package.json', JSON.stringify(package, null, 2));
  console.log('updated time', buildDate, '=>', package.buildDate);
}
