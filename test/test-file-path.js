import { basename } from 'path'
import { join } from 'path'

function testFilePath(path) {
	return join(__dirname, 'fixtures', `${basename(path, '.test.js')}.txt`)
}

export default testFilePath
