import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fs from 'fs'
import Future from 'funko/lib/future'
import open from './open'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	open(null, 'r', path.join(__dirname, '../test/fixtures/open.txt'))
	// Future Error FileDescriptor
	.chain(wrapCatchable(fd => {
		expect(fd).to.be.a.number()
		return Future((reject, resolve) =>
			fs.close(fd, error => error ? reject(error) : resolve(null))
		)
	}))
	// Future Error null
	.map(() => open)
	// Future Error Module
)
