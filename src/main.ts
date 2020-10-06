import { getInput, setFailed, exportVariable } from '@actions/core';
import { findPackageJson, extract, PackageFile } from './util';

async function run(): Promise<void> {
	try {
		const followSymbolicLinks: boolean = getInput('follow-symlinks').toLowerCase() !== 'false';
		const path: string = getInput('path')
			? process.env.GITHUB_WORKSPACE + '/' + getInput('path')
			: await findPackageJson(followSymbolicLinks);

		const packageVersion: PackageFile = await extract(path);

		let fieldKey: keyof typeof packageVersion;
		for (fieldKey in packageVersion) {
			const fieldValue = packageVersion[fieldKey];

			if (!fieldValue) exportVariable(`PACKAGE_${fieldKey.toUpperCase()}`, fieldValue);
		}
	} catch (error) {
		setFailed(error.message);
	}
}

run();
