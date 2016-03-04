import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import lstat from './lstat'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	lstat(path.join(__dirname, '../test/fixtures/lstat.txt'))
	// Future Error Stat
	.chain(wrapCatchable(stat => {
		expect(stat).to.be.an.object()
		return lstat
	}))
	// Future Error Module
)
