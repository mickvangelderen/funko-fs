import cacheFuture from 'funko/lib/future/cache'
import expect from 'must'
import map from 'funko/lib/map'
import path from 'path'
import pipe from 'funko/lib/pipe'
import writeFile from './write-file'

export default pipe([
	// String
	writeFile('utf-8', path.join(__dirname, '..', 'test', 'fixtures/write-file.txt')),
	// Future Error String
	map(data => {
		expect(data).to.eql('Example content.\n')
		return writeFile
	}),
	// Future Error Module
	cacheFuture
	// Future Error Module
], 'Example content.\n')
