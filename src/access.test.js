import access from './access'
import all from 'funko/lib/future/all'
import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fs from 'fs'
import path from 'path'
import rejected from 'funko/lib/future/rejected'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const TEST_FILE_PATH = path.join(__dirname, '../test/fixtures/read-file.txt')

const test1 = 
	access(fs.W_OK | fs.R_OK, TEST_FILE_PATH)
	// Future Error String

const test2 = 
	access(fs.W_OK | fs.R_OK | fs.X_OK, TEST_FILE_PATH)
	// Future Error String
	.chainBoth(
		wrapCatchable(error => {
			expect(error).to.have.ownProperty('code', 'EACCES')
		}),
		() => rejected(new Error(`Did not expect access to be successful.`))
	)

export default cacheFuture(
	all([ test1, test2 ])
	// Future Error [ * ]
	.map(() => access)
	// Future Error Module
)
