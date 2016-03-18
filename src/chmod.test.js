import cacheFuture from 'funko/lib/future/cache'
import chmod from './chmod'
import expect from 'must'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	testFile(__filename)
	// Future Error String
	.chain(chmod(0o664))
	// Future Error String
	.chain(wrapCatchable(data => {
		expect(data).to.be.a.string()
		return chmod
	}))
	// Future Error Module
)
