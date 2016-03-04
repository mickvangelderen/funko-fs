import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import truncate from './truncate'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FILE_PATH = path.join(__dirname, '../test/fixtures/truncate.txt')

export default cacheFuture(
	truncate(17, FILE_PATH)
	// Future Error FileDescriptor
	.chain(wrapCatchable(path => {
		expect(path).to.eql(FILE_PATH)
		return truncate
	}))
	// Future Error Module
)
