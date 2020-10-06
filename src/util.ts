import { create } from '@actions/glob';

export interface PackageFile {
	author: string;
	description: string;
	license: string;
	name: string;
	version: string;
}

const patterns = ['**/package.json', '!**/node_modules/'].join('\n');

export async function findPackageJson(followSymlinks: boolean): Promise<string> {
	const globber = await create(patterns, { followSymbolicLinks: followSymlinks });
	const files = await globber.glob();

	return files[0];
}

export async function extract(path: string): Promise<PackageFile> {
	return new Promise((resolve, reject) => {
		try {
			const packageFile: PackageFile = require(path); // eslint-disable-line @typescript-eslint/no-var-requires

			return resolve(packageFile);
		} catch {
			return reject(new Error('Invalid package.json format or path'));
		}
	});
}
