import appendFile from './append-file'
import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import path from 'path'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import writeFile from './write-file.test'

export default cacheFuture(
	// Future Error Module
	writeFile
	.chain(writeFile =>
		writeFile('utf-8', path.join(__dirname, '../test/fixtures/append-file.txt'), 'Example')
	)
	// Future Error String
	.chain(() =>
		appendFile('utf-8', path.join(__dirname, '../test/fixtures/append-file.txt'), ' content.\n')
	)
	// Future Error String
	.chain(wrapCatchable(data => {
		expect(data).to.eql(' content.\n')
		return appendFile
	}))
	// Future Error Module
)
