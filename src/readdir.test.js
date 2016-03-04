import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import readdir from './readdir'
import wrapCatchable from 'funko/lib/future/wrap-catchable'

export default cacheFuture(
	readdir(path.join(__dirname, '../test/fixtures'))
	// Future Error Stat
	.chain(wrapCatchable(files => {
		expect(files).to.be.an.array()
		files.forEach(file => expect(file).to.be.a.string())
		return readdir
	}))
	// Future Error Module
)
