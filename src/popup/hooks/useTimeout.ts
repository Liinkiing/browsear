import { DependencyList, useEffect } from 'react'

export const useTimeout = (
  handler: TimerHandler,
  ms: number,
  deps: DependencyList = []
): void => {
  useEffect(() => {
    const interval = setTimeout(handler, ms)

    return () => {
      clearInterval(interval)
    }
  }, deps)
}
