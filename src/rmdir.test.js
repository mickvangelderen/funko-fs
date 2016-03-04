import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fs from 'fs'
import Future from 'funko/lib/future'
import path from 'path'
import resolved from 'funko/lib/future/resolved'
import rmdir from './rmdir'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FOLDER_PATH = path.join(__dirname, '../test/fixtures/rmdir')

export default cacheFuture(
	Future((reject, resolve) => {
		fs.mkdir(FOLDER_PATH, 0o775, error => error ? reject(error) : resolve(FOLDER_PATH))
	})
	.chainLeft(() => resolved(FOLDER_PATH))
	// Future n/a String
	.chain(rmdir)
	// Future Error String
	.chain(wrapCatchable(path => {
		expect(path).to.be.a.string()
		return rmdir
	}))
	// Future Error Module
)
