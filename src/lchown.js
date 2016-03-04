import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const lchown = fs.lchown ? curry(3, (uid, guid, path) =>
	Future((reject, resolve) =>
		fs.lchown(path, uid, guid, error => error ?
			reject(error) :
			resolve(path)
		)
	)
) : undefined

export default lchown
