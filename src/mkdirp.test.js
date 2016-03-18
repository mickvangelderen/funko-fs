import allSeries from 'funko/lib/future/all-series'
import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import mkdirp from './mkdirp'
import path from 'path'
import resolved from 'funko/lib/future/resolved'
import rmdir from './rmdir.test'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FOLDER_PATH = path.join(__dirname, '../test/fixtures/mkdirp')
const NESTED_FOLDER_PATH = path.join(FOLDER_PATH, 'nested')

export default cacheFuture(
	rmdir
	// Future Error Module
	.chain(rmdir => allSeries([ NESTED_FOLDER_PATH, FOLDER_PATH ].map(rmdir)))
	// Future Error [ String ]
	.chainBoth(
		() => resolved(NESTED_FOLDER_PATH),
		() => resolved(NESTED_FOLDER_PATH)
	)
	// Future n/a String
	.chain(mkdirp(0o775))
	// Future Error String
	.chain(wrapCatchable(path => {
		expect(path).to.eql(NESTED_FOLDER_PATH)
		return mkdirp
	}))
	// Future Error Module
)
