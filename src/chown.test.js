import cacheFuture from 'funko/lib/future/cache'
import chown from './chown'
import expect from 'must'
import resolved from 'funko/lib/future/resolved'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default typeof process.getuid === 'function'
	? cacheFuture(
		testFile(__filename)
		// Future Error String
		.chain(chown(process.getuid(), process.getgid()))
		// Future Error String
		.chain(wrapCatchable(data => {
			expect(data).to.be.a.string()
			return chown
		}))
		// Future Error Module
	)
	: resolved(chown)
