import cacheFuture from 'funko/lib/future/cache'
import chmod from './chmod'
import expect from 'must'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	chmod(0o664, path.join(__dirname, '../test/fixtures/chmod.txt'))
	// Future Error String
	.chain(wrapCatchable(data => {
		expect(data).to.be.a.string()
		return chmod
	}))
	// Future Error Module
)
