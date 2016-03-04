import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import utimes from './utimes'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FILE_PATH = path.join(__dirname, '../test/fixtures/utimes.txt')

export default cacheFuture(
	utimes(new Date(), new Date(), FILE_PATH)
	// Future Error FileDescriptor
	.chain(wrapCatchable(path => {
		expect(path).to.eql(FILE_PATH)
		return utimes
	}))
	// Future Error Module
)
