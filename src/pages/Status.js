import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import { useInterval } from '../utils/useInterval'
import { getStartTime, getUsers } from '../api/api'
import colors from '../ui/colors'

export default ({ match }) => {
  const [users, setUsers] = useState([])
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
    const adminKey = localStorage.getItem(match.params.id)
    setKey(adminKey)
    ;(async () =>
      setUsers(
        ((await getUsers(adminKey)) || []).sort((a, b) => {
          if (a.user > b.user) return 1
          if (a.user < b.user) return -1
          return 0
        }),
      ))()
  }, [])

  const createStatus = user => {
    const name = user.user
    // console.log(user)
    return {
      name: name.substr(0, name.indexOf('_')),
      answers: user.answer,
      numAns: user.answer.length,
      point: user.point,
    }
  }

  return (
    <Flex
      flexDirection="column"
      width={1}
      flex={1}
      pt="20px"
      alignItems="center"
    >
      <Flex mb="30px">Time Counter : {Math.floor(since / 1000)} seconds</Flex>
      {users.map((user, i) => {
        const { name, answers, numAns, point } = createStatus(user)
        return (
          <Flex
            key={i}
            width={1}
            py="10px"
            bg={colors.lightBlue}
            flexDirection="column"
          >
            <Flex width={1} flexDirection="row">
              <Flex flex={1} pl="10px">
                user name :{name}
              </Flex>
              <Flex flex={1} pl="10px">
                number of answers :{numAns}
              </Flex>
              <Flex flex={1} pl="10px">
                remaining point:{point}
              </Flex>
            </Flex>
            <Flex width={1} flexDirection="column">
              {answers.map((ans, i) => {
                return (
                  <Flex key={i} mx="20px" bg={colors.tan}>
                    answer :{ans}
                  </Flex>
                )
              })}
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
