import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'
import { start, stop, getStatus } from '../api/api'

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
  const [status, setStatus] = useState('')

  useEffect(() => {
    setKey(localStorage.getItem(match.params.id))
    ;(async () => setStatus(await getStatus()))()
  }, [])

  const toggle = async () => {
    const tmpStatus = await getStatus()
    // console.log(key, tmpStatus)
    if (tmpStatus === 'start') {
      await stop(key)
    } else {
      await start(key)
    }
    setStatus(await getStatus())
  }

  return (
    <Flex flexDirection="column" width={1} flex={1} p="20px">
      <Button onClick={toggle}>{status}</Button>
    </Flex>
  )
}
