import React, { useState, useEffect } from 'react'
import { Flex } from 'rebass'
import Loadable from 'react-loadable'
import Loading from '../components/Loading'
import colors from '../ui/colors'

const QuestionTab = Loadable({
  loader: () => import('../components/QuestionTab'),
  loading: () => (
    <Flex justifyContent="center" alignItems="center" flex={1}>
      <Loading />
    </Flex>
  ),
})

export default ({ match }) => {
  const [questions, setQuestions] = useState([])
  const [player, setPlayer] = useState(null)

  useEffect(() => {
    setPlayer(match.path.slice(1))
    setQuestions([
      'When you are old, what do you think children will ask you to tell stories about?',
      'If you could switch two movie characters, what switch would lead to the most inappropriate movies?',
      'What animal would be cutest if scaled down to the size of a cat?',
      'What inanimate object would be the most annoying if it played loud upbeat music while being used?',
      'When did something start out badly for you but in the end, it was greatbadly for you but in the end, it was greatbadly for you but in the end, it was greatbadly for you but in the end, it was great?',
    ])
  }, [])

  return (
    <Flex flexDirection="column" width={1} flex={1}>
      <Flex
        width={1}
        alignItems="center"
        style={{
          zIndex: '1',
          height: '60px',
          position: 'fixed',
          boxShadow: `0 7px 9px 0 grey`,
        }}
      >
        <Flex flex={1} p="20px" bg={colors.lightBlue} color="white">
          <marquee>
            Band Protocol is a protocol for decentralized data governance on the
            Ethereum blockchain. Using various token economics, the protocol
            incentivizes multiple independent parties to work cooperatively to
            provide trusted data. Curated information is available on-chain,
            ready to be consumed by other blockchain protocols or decentralized
            applications. Band Protocol serves as the data layer of the Web3
            ecosystem, bridging real world and/or subjective information to the
            smart contract world.
          </marquee>
        </Flex>
        <Flex flex={1} p="20px" bg={colors.seaGreen} color="white">
          <marquee>
            CoinHatcher is the Bloomberg of Crypto. Coinhatcher is a
            decentralized data curation with a mission to provide trusted and
            reliable information in blockchain industry. Ranging from daily news
            to founder’s directory and crypto economics, Coinhatcher has you
            covered! Tokens are given as reward and are used to curate reliable
            information through TCR mechanism.
          </marquee>
        </Flex>
      </Flex>
      <Flex mt="60px" px="20px" flexDirection="column" width={1}>
        {questions.map((question, i) => (
          <QuestionTab
            player={player}
            question={question}
            qId={i + 1}
            key={i}
          />
        ))}
      </Flex>
    </Flex>
  )
}
