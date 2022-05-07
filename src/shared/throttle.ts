export const throttle = <T extends ((...args: unknown[]) => any)>(fn: T, delay: number) => {
  let canUse = true
  let result: ReturnType<T>
  return (...arg: Parameters<T>) => {
    if (canUse) {
      result = fn(...arg)
      canUse = false
      setTimeout(() => {
        canUse = true
      }, delay)
      return result
    } else {
      return result
    }
  }
}