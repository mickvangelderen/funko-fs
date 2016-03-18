import cacheFuture from 'funko/lib/future/cache'
import close from './close'
import expect from 'must'
import fs from 'fs'
import Future from 'funko/lib/future'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import testFile from '../test/test-file'

export default cacheFuture(
	testFile(__filename)
	// Future Error String
	.chain(path =>
		Future((reject, resolve) => {
			fs.open(path, 'r', null, (error, fd) =>
				error ? reject(error) : resolve(fd)
			)
		})
	)
	// Future Error FileDescriptor
	.chain(close)
	// Future Error null
	.chain(wrapCatchable(result => {
		expect(result).to.be.null()
		return close
	}))
	// Future Error Module
)
