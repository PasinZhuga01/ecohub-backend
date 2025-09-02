import fs from 'fs';
import path from 'path';

export function getRootPath(): string {
	let rootPath = __dirname;

	while (!fs.existsSync(path.join(rootPath, 'package.json'))) {
		rootPath = path.dirname(rootPath);
	}

	return rootPath;
}
