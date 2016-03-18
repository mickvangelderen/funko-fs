import access from './access'
import cacheFuture from 'funko/lib/future/cache'
import fs from 'fs'
import path from 'path'

const TEST_FILE_PATH = path.join(__dirname, '../test/fixtures/read-file.txt')

export default cacheFuture(
	access(fs.W_OK | fs.R_OK, TEST_FILE_PATH)
	// Future Error String
	.map(() => access)
	// Future Error Module
)
