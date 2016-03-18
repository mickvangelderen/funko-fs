import Future from 'funko/lib/future'
import testFileContent from './test-file-content'
import testFilePath from './test-file-path'
import { writeFile } from 'fs'

function testFile(filename) {
	const path = testFilePath(filename)
	
	return Future((reject, resolve) => {
		writeFile(path, testFileContent, error => error
			? reject(error)
			: resolve(path)
		)
	})
}

export default testFile
