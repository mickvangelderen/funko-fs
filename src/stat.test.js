import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import stat from './stat'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(stat)
	// Future Error Stat
	.chain(wrapCatchable(stat => {
		expect(stat).to.be.an.object()
		return stat
	}))
	// Future Error Module
)
