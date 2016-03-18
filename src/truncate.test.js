import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import truncate from './truncate'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import { EOL } from 'os'

const FILE_PATH = path.join(__dirname, '../test/fixtures/truncate.txt')

export default cacheFuture(
	truncate(16 + EOL.length, FILE_PATH)
	// Future Error FileDescriptor
	.chain(wrapCatchable(path => {
		expect(path).to.eql(FILE_PATH)
		return truncate
	}))
	// Future Error Module
)
