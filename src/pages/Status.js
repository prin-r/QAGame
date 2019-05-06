import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import { useInterval } from '../utils/useInterval'
import { getStartTime } from '../api/api'

export default ({ match }) => {
  const [players, setPlayers] = useState([])
  const [startTime, setStartTime] = useState(0)
  const [since, setSince] = useState(0)
  const [key, setKey] = useState('')

  useInterval(() => {
    ;(async () => {
      if (startTime > 0) {
        setSince(Date.now() - startTime)
      }
    })()
  }, 1000)

  useEffect(() => {
    setStartTime(getStartTime())

    setKey(localStorage.getItem(match.params.id))
    setPlayers(['swit', 'bun', 'peach', 'paul', 'ming', 'man', 'mean'])
  }, [])

  return (
    <Flex flexDirection="column" width={1} flex={1} pt="20px">
      <Flex>{Math.floor(since / 1000)}</Flex>
      {players.map((player, i) => {
        return <Flex key={i}>{player}</Flex>
      })}
    </Flex>
  )
}
