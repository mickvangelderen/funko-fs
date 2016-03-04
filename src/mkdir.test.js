import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fs from 'fs'
import Future from 'funko/lib/future'
import mkdir from './mkdir'
import path from 'path'
import resolved from 'funko/lib/future/resolved'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FOLDER_PATH = path.join(__dirname, '../test/fixtures/mkdir')

export default cacheFuture(
	Future((reject, resolve) => {
		fs.rmdir(FOLDER_PATH, error => error ? reject(error) : resolve(FOLDER_PATH))
	})
	.chainLeft(() => resolved(FOLDER_PATH))
	// Future n/a String
	.chain(mkdir(0o775))
	// Future Error String
	.chain(wrapCatchable(path => {
		expect(path).to.be.a.string()
		return mkdir
	}))
	// Future Error Module
)
