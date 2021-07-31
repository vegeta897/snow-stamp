import svelte from 'rollup-plugin-svelte'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import css from 'rollup-plugin-css-only'
import image from '@rollup/plugin-image'
import { config } from 'dotenv'
import replace from '@rollup/plugin-replace'
import { visualizer } from 'rollup-plugin-visualizer'
import rimraf from 'rimraf'
import posthtml from 'posthtml'
import { hash } from 'posthtml-hash'
import htmlnano from 'htmlnano'
import copy from 'rollup-plugin-copy'
import fs from 'fs'

// Based on https://github.com/metonym/svelte-rollup-template/

const PROD = !process.env.ROLLUP_WATCH
const OUT_DIR = 'build'

function hashStatic() {
	return {
		name: 'hash-static',
		buildStart() {
			rimraf.sync(OUT_DIR)
		},
		writeBundle() {
			posthtml([
				// hashes `bundle.[hash].css` and `bundle.[hash].js`
				hash({ path: OUT_DIR }),

				// minifies `build/index.html`
				// https://github.com/posthtml/htmlnano
				htmlnano(),
			])
				.process(fs.readFileSync(`${OUT_DIR}/index.html`, 'utf-8'))
				.then((result) =>
					fs.writeFileSync(`${OUT_DIR}/index.html`, result.html)
				)
		},
	}
}

function serve() {
	let server

	function toExit() {
		if (server) server.kill(0)
	}

	return {
		writeBundle() {
			if (server) return
			server = require('child_process').spawn(
				'npm',
				['run', 'start', '--', '--dev'],
				{
					stdio: ['ignore', 'inherit', 'inherit'],
					shell: true,
				}
			)

			process.on('SIGTERM', toExit)
			process.on('exit', toExit)
		},
	}
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: !PROD,
		format: 'iife',
		name: 'app',
		file: `${OUT_DIR}/bundle.[hash].js`,
	},
	plugins: [
		copy({ targets: [{ src: 'public/*', dest: OUT_DIR }] }),
		replace({
			'process.env': JSON.stringify(config()),
			preventAssignment: true,
		}),
		svelte({
			compilerOptions: {
				dev: !PROD,
			},
		}),
		css({ output: 'bundle.[hash].css' }),
		image(),
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),
		!PROD && serve({ contentBase: [OUT_DIR] }),
		!PROD && livereload({ watch: OUT_DIR }),
		PROD && terser(),
		PROD && hashStatic(),
		PROD && visualizer(),
	],
	watch: {
		clearScreen: false,
	},
}
