import React from 'react'
import { Flex } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const Tab = Loadable({
  loader: () => import('../components/Tab'),
  loading: () => (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Loading />
    </Flex>
  ),
})

export default ({ chairs, partyId, budget }) => {
  if (!chairs || chairs.length === 0) {
    return (
      <Flex
        width={1}
        flex={1}
        style={{ minHeight: '100%' }}
        justifyContent="center"
        alignItems="center"
      >
        <Loading size="256px" />
      </Flex>
    )
  }
  return (
    <Flex flexDirection="column" width={1} flex={1} pt="20px">
      {chairs
        .sort((a, b) => {
          var x = a.id.toLowerCase()
          var y = b.id.toLowerCase()
          return x < y ? -1 : x > y ? 1 : 0
        })
        .map((chair, i) => (
          <Flex key={i} mt="20px">
            <Tab partyId={partyId || -1} chair={chair} budget={budget} />
          </Flex>
        ))}
    </Flex>
  )
}
