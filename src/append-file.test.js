import appendFile from './append-file'
import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import testFile from '../test/test-file'
import wrapCatchable from 'funko/lib/future/wrap-catchable'
import { EOL } from 'os'

export default cacheFuture(
	testFile(__filename)
	// Future Error String
	.chain(path =>
		appendFile('utf-8', path, `More content.${EOL}`)
	)
	// Future Error String
	.chain(wrapCatchable(data => {
		expect(data).to.eql(`More content.${EOL}`)
		return appendFile
	}))
	// Future Error Module
)
