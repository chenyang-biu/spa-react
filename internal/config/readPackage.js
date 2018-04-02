import fs from 'fs'
import path from 'path'

let packageJSON = {}

try {
  packageJSON = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, '../../', 'package.json')),
  )
} catch (err) {
  console.error('read package.json failed')
  throw err
}

export default {
  getVendors: () => packageJSON.dependencies,
}
