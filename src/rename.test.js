import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import rename from './rename'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FILE_PATH = path.join(__dirname, '../test/fixtures/rename.txt')
export default cacheFuture(
	rename(FILE_PATH, FILE_PATH)
	// Future Error Stat
	.chain(
		wrapCatchable(path => {
			expect(path).to.be.a.string()
			return rename
		})
	)
	// Future Error Module
)
