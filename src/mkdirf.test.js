import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fs from 'fs'
import Future from 'funko/lib/future'
import mkdirf from './mkdirf'
import path from 'path'
import resolved from 'funko/lib/future/resolved'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

const FOLDER_PATH = path.join(__dirname, '../test/fixtures/mkdirf')

export default cacheFuture(
	Future((reject, resolve) => {
		fs.rmdir(FOLDER_PATH, error => error ? reject(error) : resolve(FOLDER_PATH))
	})
	.chainLeft(() => resolved(FOLDER_PATH))
	// Future n/a String
	.chain(mkdirf(0o775))
	// Future Error String
	.chain(mkdirf(0o775))
	// Future Error String
	.chain(wrapCatchable(path => {
		expect(path).to.be.a.string()
		return mkdirf
	}))
	// Future Error Module
)
