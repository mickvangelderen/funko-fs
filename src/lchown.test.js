import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import lchown from './lchown'
import path from 'path'
import resolved from 'funko/lib/future/resolved'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default lchown ? cacheFuture(
	lchown(process.getuid(), process.getgid(), path.join(__dirname, '../test/fixtures/lchown.txt'))
	// Future Error Path
	.chain(wrapCatchable(path => {
		expect(path).to.be.a.string()
		return lchown
	}))
	// Future Error Module
) : resolved(lchown)
