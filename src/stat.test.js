import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import stat from './stat'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	stat(path.join(__dirname, '../test/fixtures/stat.txt'))
	// Future Error Stat
	.chain(wrapCatchable(stat => {
		expect(stat).to.be.an.object()
		return stat
	}))
	// Future Error Module
)
