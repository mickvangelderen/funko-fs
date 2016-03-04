import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const readFile = curry(2, (options, file) =>
	Future((reject, resolve) =>
		fs.readFile(file, options, (error, data) => error ?
			reject(error) :
			resolve(data)
		)
	)
)

export default readFile
