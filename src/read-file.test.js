import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import readFile from './read-file'
import testFile from '../test/test-file'
import testFileContent from '../test/test-file-content'

export default cacheFuture(
	testFile(__filename)
	// Future Error Path
	.chain(readFile('utf-8'))
	// Future Error String
	.map(buffer => {
		expect(buffer.toString()).to.eql(testFileContent)
		return readFile
	})
)
