import { ReactNode } from 'react'

type Entities = {
  head: {
    position: number[]
    nextMove: number
    renderer: ReactNode
    size: number
    updateFrequency: number
    xspeed: number
    yspeed: number
  }
  food: { position: number[] }
  tail: {
    elements: number[][]
    renderer: ReactNode
    size: number
  }
}

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

type Object = {
  touches: {
    id: number
    type: 'move'
    delta: {
      locationX: number
      locationY: number
      pageX: number
      pageY: number
      timestamp: number
    }
    tail: object
    event: {
      changeTouches: []
      force: number
      identifier: number
      locationX: number
      locationY: number
      pageX: number
      pageY: number
      target: number
      timestamp: number
      touches: []
    }
  }[]
  dispatch: (param: { type: 'game-over' }) => void
  events: {
    type: 'move-down' | 'move-up' | 'move-left' | 'move-right'
  }[]
}

const GameLoop =
  (gridSize: number, useSwipes: boolean, useTeleport: boolean) =>
  (entities: Entities, { touches, dispatch, events }: Object) => {
    const { head, food, tail } = entities

    if (useSwipes) {
      const moveTouches = touches.filter(t => t.type === 'move')

      for (const { delta } of moveTouches) {
        if (!(head && head.position)) continue

        if (!(delta.pageY && delta.pageX)) continue

        if (delta.pageY && Math.abs(delta.pageY) > Math.abs(delta.pageX)) {
          if (delta.pageY < 0 && head.yspeed !== 1) {
            head.yspeed = -1
            head.xspeed = 0
          } else if (delta.pageY > 0 && head.yspeed !== -1) {
            head.yspeed = 1
            head.xspeed = 0
          }
        } else if (delta.pageX) {
          if (delta.pageX < 0 && head.xspeed !== 1) {
            head.xspeed = -1
            head.yspeed = 0
          } else if (delta.pageX > 0 && head.xspeed !== -1) {
            head.xspeed = 1
            head.yspeed = 0
          }
        }
      }
    } else if (events.length) {
      for (const { type } of events) {
        switch (true) {
          case type === 'move-down' && head.yspeed !== -1:
            head.yspeed = 1
            head.xspeed = 0
            break
          case type === 'move-up' && head.yspeed !== 1:
            head.yspeed = -1
            head.xspeed = 0
            break
          case type === 'move-left' && head.xspeed !== 1:
            head.yspeed = 0
            head.xspeed = -1
            break
          case type === 'move-right' && head.xspeed !== -1:
            head.yspeed = 0
            head.xspeed = 1
            break
        }
      }
    }

    head.nextMove -= 1

    if (head.nextMove === 0) {
      head.nextMove = head.updateFrequency

      const isSnakeHitTheLeftWall = head.position[0] + head.xspeed < 0
      const isSnakeHitTheRightWall = head.position[0] + head.xspeed >= gridSize
      const isSnakeHitTheTopWall = head.position[1] + head.yspeed < 0
      const isSnakeHitTheBottomWall = head.position[1] + head.yspeed >= gridSize
      const isSnakeHitTheWallHorizontally = isSnakeHitTheLeftWall || isSnakeHitTheRightWall
      const isSnakeHitTheWallVertically = isSnakeHitTheTopWall || isSnakeHitTheBottomWall

      if (isSnakeHitTheWallHorizontally || isSnakeHitTheWallVertically) {
        if (!useTeleport) {
          return dispatch({ type: 'game-over' })
        }

        // teleporting
        const newTail = [[head.position[0], head.position[1]]]

        tail.elements = newTail.concat(tail.elements).slice(0, -1)

        if (isSnakeHitTheWallHorizontally) {
          if (isSnakeHitTheRightWall) {
            head.position[0] = 0
          } else {
            head.position[0] = gridSize - 1
          }
        } else if (isSnakeHitTheBottomWall) {
          head.position[1] = 0
        } else {
          head.position[1] = gridSize - 1
        }
      } else {
        // move the tail
        const newTail = [[head.position[0], head.position[1]]]
        tail.elements = newTail.concat(tail.elements).slice(0, -1)

        // snake moves
        head.position[0] += head.xspeed
        head.position[1] += head.yspeed

        // check if it hits the tail
        for (let i = 0; i < tail.elements.length; i++) {
          if (tail.elements[i][0] === head.position[0] && tail.elements[i][1] === head.position[1]) {
            dispatch({ type: 'game-over' })
          }
        }

        if (head.position[0] === food.position[0] && head.position[1] === food.position[1]) {
          // eating Food
          tail.elements = [[food.position[0], food.position[1]]].concat(tail.elements)

          food.position[0] = randomBetween(0, gridSize - 1)
          food.position[1] = randomBetween(0, gridSize - 1)
        }
      }
    }

    return entities
  }

export default GameLoop
