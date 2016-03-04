import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const appendFile = curry(3, (options, file, data) =>
	Future((reject, resolve) =>
		fs.appendFile(file, data, options, error => error ?
			reject(error) :
			resolve(data)
		)
	)
)

export default appendFile
