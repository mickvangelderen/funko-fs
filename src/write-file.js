import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const writeFile = curry(3, (options, file, data) =>
	Future((reject, resolve) =>
		fs.writeFile(file, data, options, error => error ?
			reject(error) :
			resolve(data)
		)
	)
)

export default writeFile
