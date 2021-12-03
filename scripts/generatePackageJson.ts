import * as fs from 'fs';
import * as json from '../package.json';

const newJson = {
  name: json.name,
  version: '1.0.0',
  scripts: json.scripts,
  dependencies: json.dependencies,
  egg: json.egg,
  engines: json.engines,
};

fs.writeFileSync(`${__dirname}/../package.install.json`, JSON.stringify(newJson));
