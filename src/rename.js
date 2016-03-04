import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const rename = curry(2, (newPath, oldPath) =>
	Future((reject, resolve) =>
		fs.rename(oldPath, newPath, error => error ?
			reject(error) :
			resolve(newPath)
		)
	)
)

export default rename
