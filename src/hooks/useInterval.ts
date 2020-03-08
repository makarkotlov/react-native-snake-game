import { useRef, useLayoutEffect } from 'react'

const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef()
  const intervalRef = useRef()

  useLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useLayoutEffect(() => {
    const tick = () => savedCallback.current()
    if (delay !== null) {
      intervalRef.current = setInterval(tick, delay)
      return () => clearInterval(intervalRef.current)
    }
  }, [delay])
}

export default useInterval
