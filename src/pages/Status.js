import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import { useInterval } from '../utils/useInterval'
import { getStartTime, getUsers, getQAs } from '../api/api'
import colors from '../ui/colors'

export default ({ match }) => {
  const [users, setUsers] = useState([])
  const [qasT, setQasT] = useState([])
  const [startTime, setStartTime] = useState(0)
  const [since, setSince] = useState(0)
  const [key, setKey] = useState('')

  useInterval(() => {
    ;(async () => {
      if (startTime > 0) {
        setSince(Date.now() - startTime)
        setUsers(
          ((await getUsers(key)) || []).sort((a, b) => {
            if (a.user > b.user) return 1
            if (a.user < b.user) return -1
            return 0
          }),
        )
      }
    })()
  }, 1000)

  useEffect(() => {
    setStartTime(getStartTime())
    const adminKey = localStorage.getItem(match.params.id)
    setKey(adminKey)
    ;(async () => {
      const tmpQAs = await getQAs(adminKey)
      const mapQAs = {}
      for (const e of tmpQAs) {
        mapQAs[e.qId] = { ...e }
      }
      setQasT(mapQAs)
      // console.log(mapQAs)
      setUsers(
        ((await getUsers(adminKey)) || []).sort((a, b) => {
          if (a.user > b.user) return 1
          if (a.user < b.user) return -1
          return 0
        }),
      )
    })()
  }, [])

  const createStatus = user => {
    const name = user.user
    const qas = {}
    for (const ans of user.answer) {
      const k = ans[ans.length - 1]
      if (!qas[k]) {
        qas[k] = []
      }
      qas[k] = qas[k].concat([ans.slice(0, ans.length - 1)])
    }
    return {
      name: name.substr(0, name.indexOf('_')),
      qas: qas,
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
        const { name, qas, numAns, point } = createStatus(user)
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
              {Object.keys(qas).map((q, i) => {
                return (
                  <React.Fragment key={i}>
                    <Flex mx="20px" bg={colors.slateGray}>
                      quesion: {qasT[q].q} <br />
                      qid : {q}
                    </Flex>
                    <Flex flexDirection="column">
                      {qas[q].map((a, j) => {
                        return (
                          <Flex
                            fontSize={12}
                            mx="40px"
                            bg={colors.tan}
                            key={j + q}
                          >
                            {JSON.stringify(a)}
                          </Flex>
                        )
                      })}
                    </Flex>
                  </React.Fragment>
                )
              })}
            </Flex>
          </Flex>
        )
      })}
    </Flex>
  )
}
