import { useRef, useLayoutEffect } from 'react'

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<() => void>()
  const intervalRef = useRef<NodeJS.Timeout>()

  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useLayoutEffect(() => {
    const tick = () => savedCallback.current?.()

    if (delay !== null) {
      intervalRef.current = setInterval(tick, delay)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [delay])
}

export default useInterval
