import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'
import { start, stop, getStartTime } from '../api/api'

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
  const [startTime, setStartTime] = useState(0)

  useEffect(() => {
    setStartTime(getStartTime())

    setKey(localStorage.getItem(match.params.id))
  }, [])

  const toggle = async () => {
    console.log(key)
    if (startTime > 0) {
      await stop()
    } else {
      await start()
    }
    setStartTime(getStartTime())
  }

  return (
    <Flex flexDirection="column" width={1} flex={1} p="20px">
      <Button onClick={toggle}>{startTime > 0 ? 'Stop' : 'Start'}</Button>
    </Flex>
  )
}
