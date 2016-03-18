import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import map from 'funko/lib/map'
import path from 'path'
import pipe from 'funko/lib/pipe'
import readFile from './read-file'
import { EOL } from 'os'

export default pipe([
	// String
	readFile('utf-8'),
	// Future Error String
	map(buffer => {
		expect(buffer.toString()).to.eql(`Example content.${EOL}`)
		return readFile
	}),
	// Future Error Module
	cacheFuture
	// Future Error Module
], path.join(__dirname, '..', 'test', 'fixtures/read-file.txt'))
