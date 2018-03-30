import os from 'os'
import Happypack from 'happypack'

const threadPool = Happypack.ThreadPool({
  size: os.cpus().length,
})

export function happypackPlugin({ id, loaders }) {
  return new Happypack({
    id,
    loaders,
    verbose: false,
    threadPool,
  })
}

const execIfElse = x => (typeof x === 'function' ? x() : x)
export const ifElse = condition => (then, or) =>
  (condition ? execIfElse(then) : execIfElse(or))
