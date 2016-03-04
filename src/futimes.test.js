import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import futimes from './futimes'
import fs from 'fs'
import Future from 'funko/lib/future'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	Future((reject, resolve) => {
		fs.open(path.join(__dirname, '../test/fixtures/futimes.txt'), 'r+', null, (error, fd) =>
			error ? reject(error) : resolve(fd)
		)
	})
	// Future Error FileDescriptor
	.chain(futimes(new Date(), new Date()))
	// Future Error FileDescriptor
	.chain(wrapCatchable(fd => {
		expect(fd).to.be.an.number()
		return futimes
	}))
	// Future Error Module
)
