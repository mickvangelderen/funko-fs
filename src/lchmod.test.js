import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import lchmod from './lchmod'
import path from 'path'
import resolved from 'funko/lib/future/resolved'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default lchmod ? cacheFuture(
	lchmod(0o664, path.join(__dirname, '../test/fixtures/lchmod.txt'))
	// Future Error FileDescriptor
	.chain(wrapCatchable(path => {
		expect(path).to.be.a.string()
		return lchmod
	}))
	// Future Error Module
) : resolved(lchmod)
