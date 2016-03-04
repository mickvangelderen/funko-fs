import cacheFuture from 'funko/lib/future/cache'
import chown from './chown'
import expect from 'must'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	chown(process.getuid(), process.getgid(), path.join(__dirname, '../test/fixtures/chown.txt'))
	// Future Error String
	.chain(wrapCatchable(data => {
		expect(data).to.be.a.string()
		return chown
	}))
	// Future Error Module
)