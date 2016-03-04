import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const lchmod = fs.lchmod ? curry(2, (mode, path) =>
	Future((reject, resolve) =>
		fs.lchmod(path, mode, error => error ?
			reject(error) :
			resolve(path)
		)
	)
) : undefined

export default lchmod
