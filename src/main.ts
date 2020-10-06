import { getInput, setFailed, exportVariable } from '@actions/core';
import { findPackageJson, extract, PackageFile } from './util';

async function run(): Promise<void> {
	try {
		const followSymbolicLinks: boolean = getInput('follow-symlinks').toLowerCase() !== 'false';
		const path: string = getInput('path')
			? process.env.GITHUB_WORKSPACE + '/' + getInput('path')
			: await findPackageJson(followSymbolicLinks);

		const packageFile: PackageFile = await extract(path);

		exportVariable('PACKAGE_AUTHOR', packageFile.author);
		exportVariable('PACKAGE_DESCRIPTION', packageFile.description);
		exportVariable('PACKAGE_LICENSE', packageFile.license);
		exportVariable('PACKAGE_NAME', packageFile.name);
		exportVariable('PACKAGE_VERSION', packageFile.version);
	} catch (error) {
		setFailed(error.message);
	}
}

run();
