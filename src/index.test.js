import * as fs from './'
import cacheFuture from 'funko/lib/future/cache'
import camelCase from 'camel-case'
import expect from 'must'
import filter from 'funko/lib/filter'
import map from 'funko/lib/map'
import path from 'path'
import pipe from 'funko/lib/pipe'
import readdir from './readdir'

export default pipe([
	// String
	readdir,
	// Future Error [ String ]
	map(pipe([
		// [ String ]
		filter(file => !/\.test\.js$/.test(file)),
		// [ String ]
		filter(file => 'index.js' !== file),
		// [ String ]
		map(file => {
			// String
			const exportName = camelCase(path.basename(file, '.js'))
			const exportThing = require(`./${file}`).default
			expect(fs, `fs should export ${exportName}.`)
			.to.have.ownProperty(exportName, exportThing)
		}),
		// [ undefined ]
		() => fs
		// Module
	])),
	// Future Error Module
	cacheFuture
	// Future Error Module
], __dirname)
