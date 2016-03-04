import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import rejected from 'funko/lib/future/rejected'
import resolved from 'funko/lib/future/resolved'
import symlink from './symlink'
import unlink from './unlink.test'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const DST_PATH = path.join(__dirname, '../test/fixtures/symlink-dst.txt')
const SRC_PATH = path.join(__dirname, '../test/fixtures/symlink-src.txt')

export default cacheFuture(
	unlink
	// Future Error Module
	.chain(unlink =>
		unlink(SRC_PATH)
		.chainLeft(error => {
			if (error.code === 'ENOENT') return resolved(SRC_PATH)
			return rejected(DST_PATH)
		})
	)
	// Future Error Path
	.chain(symlink(null, DST_PATH))
	// Future Error Path
	.chain(wrapCatchable(path => {
		expect(path).to.eql(SRC_PATH)
		return symlink
	}))
	// Future Error Module
)
