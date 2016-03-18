import access from './access'
import cacheFuture from 'funko/lib/future/cache'
import fs from 'fs'
import testFile from '../test/test-file'

export default cacheFuture(
	testFile(__filename)
	// Future Error String
	.chain(access(fs.W_OK | fs.R_OK))
	// Future Error String
	.map(() => access)
	// Future Error Module
)
