import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import realpath from './realpath'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	realpath(null, path.join(__dirname, '../test/fixtures/realpath.txt'))
	// Future Error Stat
	.chain(
		wrapCatchable(resolvedPath => {
			expect(resolvedPath).to.be.a.string()
			return realpath
		})
	)
	// Future Error Module
)
