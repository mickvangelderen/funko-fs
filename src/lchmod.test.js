import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import lchmod from './lchmod'
import resolved from 'funko/lib/future/resolved'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default lchmod ? cacheFuture(
	testFile(__filename)
	// Future Error String
	.chain(lchmod(0o664))
	// Future Error String
	.chain(wrapCatchable(path => {
		expect(path).to.be.a.string()
		return lchmod
	}))
	// Future Error Module
) : resolved(lchmod)
