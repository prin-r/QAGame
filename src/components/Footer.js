import React from 'react'
import { Flex, Text } from 'rebass'
import colors from '../ui/colors'

export default ({ name }) => (
  <Flex
    mt="30px"
    flexDirection="column"
    bg={colors.oliveBrown}
    width={1}
    style={{ height: '100px' }}
  >
    <Flex flex={2} justifyContent="center" alignItems="center">
      <Text color="white">{name}</Text>
    </Flex>
    <Flex fontSize="24px" fontWeight={900} flex={1} bg={colors.darkGreen} />
  </Flex>
)
