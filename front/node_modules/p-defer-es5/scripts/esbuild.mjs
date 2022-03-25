import { createRequire } from 'module';
import { dirname } from 'path';
import { readPackageUp } from 'read-pkg-up';
import esbuild from 'esbuild';

// The purpose of bundling using esbuild is to walk from the entrypoint and gather all source code in the target package.
// We will bundle all gathered source code together and transpile it at once.
// We should not need to bundle transient dependencies, they should already in ES5.
(async function () {
  const [packageName, entryPoint, format, outfile] = process.argv.slice(2);

  const {
    packageJson: { dependencies = {} }
  } = await readPackageUp({
    cwd: dirname(createRequire(import.meta.url).resolve(packageName))
  });

  const external = Object.keys(dependencies);

  external.length &&
    console.log(`Excluding the following dependencies:\n\n${external.map(name => `- ${name}`).join('\n')}`);

  esbuild
    .build({
      bundle: true,
      entryPoints: [entryPoint],
      external,
      format,
      outfile
    })
    .catch(() => process.exit(1));
})();
