import { add } from './add'

export const sum = (...arg) => {
    return arg.reduce((pre, cur) => {
        return add(pre, cur)
    })
}