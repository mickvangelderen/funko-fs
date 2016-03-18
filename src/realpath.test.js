import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import realpath from './realpath'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import testFile from '../test/test-file'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(realpath(null))
	// Future Error Stat
	.chain(
		wrapCatchable(resolvedPath => {
			expect(resolvedPath).to.be.a.string()
			return realpath
		})
	)
	// Future Error Module
)
