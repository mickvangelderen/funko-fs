import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import unlink from './unlink'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import writeFile from './write-file.test'

const FILE_PATH = path.join(__dirname, '../test/fixtures/unlink.txt')

export default cacheFuture(
	writeFile
	// Future Error Module
	.chain(writeFile => writeFile('utf-8', FILE_PATH, 'Example content.\n'))
	// Future Error String
	.chain(() => unlink(FILE_PATH))
	// Future Error String
	.chain(wrapCatchable(path => {
		expect(path).to.eql(FILE_PATH)
		return unlink
	}))
	// Future Error Module	
)
