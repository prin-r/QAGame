import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import Loadable from 'react-loadable'
import { useInterval } from '../utils/useInterval'
import Loading from '../components/Loading'
import { getStartTime, getUsers, getQAs } from '../api/api'
import colors from '../ui/colors'

const Button = Loadable({
  loader: () => import('../components/Button'),
  loading: () => (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Loading />
    </Flex>
  ),
})

export default ({ match }) => {
  const [users, setUsers] = useState([])
  const [qasT, setQasT] = useState([])
  const [startTime, setStartTime] = useState(0)
  const [since, setSince] = useState(0)
  const [key, setKey] = useState('')
  const [score, setScore] = useState({})
  const [qDifficulty, setQDifficulty] = useState({})

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
        // calScore()
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

  const getSort = arr =>
    arr
      .map(a => a.toLowerCase())
      .sort((a, b) => {
        if (a > b) return 1
        if (a < b) return -1
        return 0
      })

  const calScore = () => {
    const userCorrectAns = {}
    const tmpQasT = JSON.parse(JSON.stringify(qasT))
    for (const u of users) {
      userCorrectAns[u.user] = []
      const { qas } = createStatus(u)
      for (const kq of Object.keys(qas)) {
        const ansT = getSort(tmpQasT[kq].a)
        for (const ans of qas[kq]) {
          const sAns = getSort(ans)
          if (sAns.join() === ansT.join()) {
            if (!tmpQasT[kq].d) {
              tmpQasT[kq].d = 0
            }
            tmpQasT[kq].d++
            userCorrectAns[u.user] = userCorrectAns[u.user].concat([kq])
            break
          }
        }
      }
    }
    const tmpScores = {}
    const tmpQDiff = {}

    for (const qid of Object.keys(qasT)) {
      tmpQDiff[qid] = tmpQasT[qid].d > 0 ? 1.0 / tmpQasT[qid].d : 1
    }

    console.log(tmpQDiff)

    users.map(u => {
      const qids = userCorrectAns[u.user]
      let score = 0
      for (const qid of qids) {
        if (tmpQasT[qid].d > 0) {
          score += 1.0 / tmpQasT[qid].d
        }
      }
      tmpScores[u.user] = score
    })
    // console.log(score)
    setQDifficulty(tmpQDiff)
    setScore(tmpScores)
  }

  return (
    <Flex
      flexDirection="column"
      width={1}
      flex={1}
      pt="20px"
      alignItems="center"
    >
      <Flex mb="30px" alignItems="center">
        Time Counter : {Math.floor(since / 1000)} seconds{' '}
        <Button onClick={calScore} ml="20px">
          cal score
        </Button>
      </Flex>
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
              <Flex flex={1} pl="10px">
                score:{score[user.user]}
              </Flex>
            </Flex>
            <Flex width={1} flexDirection="column">
              {Object.keys(qas).map((q, i) => {
                return (
                  <React.Fragment key={i}>
                    <Flex mx="20px" bg={colors.oliveGreen}>
                      quesion: {qasT[q].q} <br />
                      qid : {q} <br />
                      difficulty: {qDifficulty[q]}
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
