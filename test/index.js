import all from 'funko/lib/future/all'
import chain from 'funko/lib/chain'
import curry from 'funko/lib/curry'
import filter from 'funko/lib/filter'
import map from 'funko/lib/map'
import path from 'path'
import pipe from 'funko/lib/pipe'
import readdir from '../src/readdir'

const regex = regex => value => regex.test(value)

const joinPaths = curry(2, path.join)
const relPath = curry(2, path.relative)

const test = path => pipe([
	// String
	readdir,
	// Future Error [ String ]
	chain(pipe([
		// [ String ]
		filter(regex(/\.test\.js$/)),
		// [ String ]
		map(pipe([
			// String
			joinPaths(path),
			// String
			relPath(__dirname),
			// String
			require,
			// { default: Future Error Module }
			module => module.default
			// Future Error Module
		])),
		// [ Future Error Module ]
		all
		// Future Error [ Module ]
	]))
	// Future Error [ Module ]
], path)

const start = new Date()

test(joinPaths(__dirname, '../src'))
.fork(
	error => {
		throw error
	},
	() => {
		console.log(`Tests finished in ${new Date() - start}ms without errors.`) // eslint-disable-line no-console
	}
)
