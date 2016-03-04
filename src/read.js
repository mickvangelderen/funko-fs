import curry from 'funko/lib/curry'
import fs from 'fs'
import Future from 'funko/lib/future'

const read = curry(5, (position, length, offset, buffer, fd) =>
	Future((reject, resolve) =>
		fs.read(fd, buffer, offset, length, position, (error, bytesRead) => error ?
			reject(error) :
			resolve(bytesRead)
		)
	)
)

export default read
