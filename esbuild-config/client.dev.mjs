import * as esbuild from 'esbuild';
import postcss from 'esbuild-postcss';

let ctx;

try {
	ctx = await esbuild.context({
		entryPoints: ['src/client/index.tsx'],
		bundle: true,
		minify: false,
		sourcemap: true,
		outfile: 'public/static/bundle.js',
		plugins: [postcss()],
		define: {
			'process.env.NODE_ENV': "'development'"
		}
	});

	await ctx.watch();
	console.log('Watching client...');

	const { host, port } = await ctx.serve({
		servedir: 'public',
		fallback: 'public/index.html'
	});

	console.info(`Hot refresh at http://${host}:${port}`);
} catch (error) {
	console.error('An error occurred:', error);
	process.exit(1);
}
