import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fsync from './fsync'
import fs from 'fs'
import Future from 'funko/lib/future'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	Future((reject, resolve) => {
		fs.open(path.join(__dirname, '../test/fixtures/fsync.txt'), 'r+', null, (error, fd) =>
			error ? reject(error) : resolve(fd)
		)
	})
	// Future Error FileDescriptor
	.chain(fsync)
	// Future Error FileDescriptor
	.chain(wrapCatchable(fd => {
		expect(fd).to.be.an.number()
		return fsync
	}))
	// Future Error Module
)
