import cacheFuture from 'funko/lib/future/cache'
import close from './close'
import expect from 'must'
import fs from 'fs'
import Future from 'funko/lib/future'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	Future((reject, resolve) => {
		fs.open(path.join(__dirname, '../test/fixtures/close.txt'), 'r', null, (error, fd) =>
			error ? reject(error) : resolve(fd)
		)
	})
	// Future Error FileDescriptor
	.chain(close)
	// Future Error null
	.chain(wrapCatchable(result => {
		expect(result).to.be.null()
		return close
	}))
	// Future Error Module
)
