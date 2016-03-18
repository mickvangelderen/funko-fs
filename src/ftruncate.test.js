import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import fs from 'fs'
import ftruncate from './ftruncate'
import Future from 'funko/lib/future'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import { EOL } from 'os'

export default cacheFuture(
	Future((reject, resolve) => {
		fs.open(path.join(__dirname, '../test/fixtures/ftruncate.txt'), 'r+', null, (error, fd) =>
			error ? reject(error) : resolve(fd)
		)
	})
	// Future Error FileDescriptor
	.chain(ftruncate(16 + EOL.length))
	// Future Error FileDescriptor
	.chain(wrapCatchable(fd => {
		expect(fd).to.be.an.number()
		return ftruncate
	}))
	// Future Error Module
)
