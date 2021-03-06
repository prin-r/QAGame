import React, { useState, useEffect } from 'react'
import { Flex, Text } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'
import { addUser, getUsers, clearAnswer } from '../api/api'

const UserTab = Loadable({
  loader: () => import('../components/UserTab'),
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
  const [users, setUsers] = useState([])
  const [newUserName, setNewUserName] = useState('')

  useEffect(() => {
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

  return (
    <Flex flexDirection="column" width={1} flex={1} p="20px">
      <Flex flexDirection="column" width={1}>
        <Text>Number of users : {' ' + users.length}</Text>
        <Flex width={1} justifyContent="center" alignItems="center">
          <Text>New User</Text>
          <Flex mx="5px" />
          <Input
            value={newUserName}
            onChange={({ target }) => setNewUserName(target.value)}
          />
          <Flex mx="5px" />
          <Button
            style={{ minHeight: '35px', minWidth: '35px' }}
            onClick={() => addUser(key, newUserName)}
          >
            <i className="fas fa-plus" />
          </Button>
        </Flex>
        <Button
          mt="15px"
          style={{ minHeight: '35px', minWidth: '35px' }}
          onClick={() => clearAnswer(key)}
        >
          Clear User Answer
        </Button>
      </Flex>
      <Flex flexDirection="column">
        {users.map((user, i) => (
          <UserTab key={i} {...user} adminKey={key} />
        ))}
      </Flex>
    </Flex>
  )
}
