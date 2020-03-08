import React from 'react'

interface Entities {
  head: {
    position: Array<number>
    nextMove: number
    renderer: React.Component
    size: number
    updateFrequency: number
    xspeed: number
    yspeed: number
  }
  food: { position: Array<number> }
  tail: { elements: Array<Array<number>>; renderer: React.Component; size: number }
}

const randomBetween = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1) + min)

interface Object {
  touches: Array<{
    id: number
    type: string
    delta: { locationX: number; locationY: number; pageX: number; pageY: number; timestamp: number }
    tail: object
    event: {
      changeTouches: Array<any>
      force: number
      identifier: number
      locationX: number
      locationY: number
      pageX: number
      pageY: number
      target: number
      timestamp: number
      touches: Array<any>
    }
  }>
  dispatch: Function
  events: Array<{ type: string }>
}

const GameLoop = (gridSize: number, useSwipes: boolean, useTeleport: boolean) => (
  entities: Entities,
  { touches, dispatch, events }: Object
) => {
  const { head } = entities
  const { food } = entities
  const { tail } = entities

  if (useSwipes) {
    touches
      .filter(t => t.type === 'move')
      .forEach(t => {
        if (head && head.position) {
          if (t.delta.pageY && t.delta.pageX) {
            if (t.delta.pageY && Math.abs(t.delta.pageY) > Math.abs(t.delta.pageX)) {
              if (t.delta.pageY < 0 && head.yspeed !== 1) {
                head.yspeed = -1
                head.xspeed = 0
              } else if (t.delta.pageY > 0 && head.yspeed !== -1) {
                head.yspeed = 1
                head.xspeed = 0
              }
            } else if (t.delta.pageX) {
              if (t.delta.pageX < 0 && head.xspeed !== 1) {
                head.xspeed = -1
                head.yspeed = 0
              } else if (t.delta.pageX > 0 && head.xspeed !== -1) {
                head.xspeed = 1
                head.yspeed = 0
              }
            }
          }
        }
      })
  } else if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === 'move-down' && head.yspeed !== -1) {
        head.yspeed = 1
        head.xspeed = 0
      } else if (events[i].type === 'move-up' && head.yspeed !== 1) {
        head.yspeed = -1
        head.xspeed = 0
      } else if (events[i].type === 'move-left' && head.xspeed !== 1) {
        head.yspeed = 0
        head.xspeed = -1
      } else if (events[i].type === 'move-right' && head.xspeed !== -1) {
        head.yspeed = 0
        head.xspeed = 1
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

export { GameLoop }
