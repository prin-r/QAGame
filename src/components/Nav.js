import React from 'react'
import { Flex, Text } from 'rebass'
import colors from '../ui/colors'
import Loadable from 'react-loadable'
import Loading from './Loading'

const Favicon = Loadable({
  loader: () => import('../images/favicon'),
  loading: () => <Loading />,
})

export default ({ party }) => (
  <Flex
    flexDirection="row"
    bg={colors.lightSteel}
    style={{ height: '45px' }}
    width={1}
  >
    <Flex flex={1}>
      <Flex ml="10px" mt="10px">
        <Favicon width="23" height="58" />
      </Flex>
      <Text
        lineHeight="45px"
        color={colors.darkGreen}
        fontWeight={900}
        ml="20px"
      >
        Auc Chair
      </Text>
    </Flex>
    <Flex justifyContent="flex-end">
      <Text lineHeight="45px" color={colors.darkGreen} fontWeight={900}>
        Budget
      </Text>
      <Flex bg="white" px="10px" m="10px" style={{ borderRadius: '4px' }}>
        <Text lineHeight="25px">{party && party.budget}m</Text>
      </Flex>
    </Flex>
  </Flex>
)
