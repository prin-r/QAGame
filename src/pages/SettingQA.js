import React, { useState, useEffect } from 'react'
import { Flex, Text } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'
import { getQAs, addQA } from '../api/api'

const QATab = Loadable({
  loader: () => import('../components/QATab'),
  loading: () => (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Loading />
    </Flex>
  ),
})

const Input = Loadable({
  loader: () => import('../components/Input'),
  loading: () => (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Loading />
    </Flex>
  ),
})

const Button = Loadable({
  loader: () => import('../components/Button'),
  loading: () => (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Loading />
    </Flex>
  ),
})

export default ({ match }) => {
  const [key, setKey] = useState('')
  const [qas, setQas] = useState([])
  const [question, setQuestion] = useState('')

  useEffect(() => {
    const adminKey = localStorage.getItem(match.params.id)
    setKey(adminKey)
    ;(async () => setQas(await getQAs(adminKey)))()
  }, [])

  const addQuestion = async () => {
    console.warn(key, question)
    await addQA(key, question)
    window.location.reload()
  }

  return (
    <Flex flexDirection="column" width={1} p="20px">
      <Flex flexDirection="column" width={1}>
        <Text>Number of questions : {' ' + qas.length}</Text>
        <Flex width={1} justifyContent="center" alignItems="center">
          <Text>New Question</Text>
          <Flex mx="5px" />
          <Input
            value={question}
            onChange={({ target }) => setQuestion(target.value)}
          />
          <Flex mx="5px" />
          <Button
            style={{ minHeight: '35px', minWidth: '35px' }}
            onClick={addQuestion}
          >
            <i className="fas fa-plus" />
          </Button>
        </Flex>
      </Flex>
      <Flex flexDirection="column">
        {qas.map((qa, i) => (
          <QATab adminKey={key} q={qa.q} a={qa.a} qId={qa.qId} key={i} />
        ))}
      </Flex>
    </Flex>
  )
}
