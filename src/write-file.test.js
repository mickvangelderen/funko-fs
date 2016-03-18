import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import testFileContent from '../test/test-file-content'
import testFilePath from '../test/test-file-path'
import writeFile from './write-file'

export default cacheFuture(
	writeFile('utf-8', testFilePath(__filename), testFileContent)
	// Future Error String
	.map(data => {
		expect(data).to.eql(testFileContent)
		return writeFile
	})
	// Future Error Module
)
