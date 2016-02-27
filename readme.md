# Usage guide

This guide is for people who want to use funko-fs. 

Other guides:
* [Development guide](development.md)

## Install

`npm install funko-fs`

## Usage

```js
import fs from 'funko-fs'

fs.stat('package.json')
// Future Error Stat
.fork(console.error, console.log)
```

## Thanks

This project uses [node-package-skeleton](https://github.com/mickvangelderen/node-package-skeleton) as a starting point for package development. 
