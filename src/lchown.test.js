import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import lchown from './lchown'
import resolved from 'funko/lib/future/resolved'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default lchown
	? cacheFuture(
		testFile(__filename)
		// Future Error Path
		.chain(lchown(process.getuid(), process.getgid()))
		// Future Error Path
		.chain(wrapCatchable(path => {
			expect(path).to.be.a.string()
			return lchown
		}))
		// Future Error Module
	)
	: resolved(lchown)
