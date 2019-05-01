import React, { useState, useEffect, useRef } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './components/Loading'
import colors from './ui/colors'
import { getParty, getChairs } from './api/api'

const NotFoundPage = Loadable({
  loader: () => import('./pages/404'),
  loading: () => <Loading />,
})

const Dashboard = Loadable({
  loader: () => import('./pages/Dashboard'),
  loading: () => <Loading />,
})

const Nav = Loadable({
  loader: () => import('./components/Nav'),
  loading: () => <Loading />,
})

const Footer = Loadable({
  loader: () => import('./components/Footer'),
  loading: () => <Loading />,
})

const PageContainer = styled(Flex).attrs({
  flexDirection: 'column',
  alignItems: 'center',
})`
  margin: -10px;
  min-height: 100vh;
  background-color: ${colors.bg};
  font-family: Helvetica;
`

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (delay !== null) {
      let id = setInterval(() => savedCallback.current(), delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default () => {
  const partyId =
    (window.location.pathname + window.location.hash)
      .replace(/\D/g, '')
      .split('')[0] || '0'

  const [party, setParty] = useState({
    id: -1,
    name: 'พรรค undefined',
    budget: 0,
  })

  const [chairs, setChairs] = useState([])

  useInterval(() => {
    ;(async () => {
      if (!window.aucLoading) {
        window.aucLoading = true
        const chairs = await getChairs()
        const party = await getParty(partyId)

        const stake = chairs
          .filter(chair => chair.winnerParty.id === partyId)
          .map(chair => chair.bidAmount)
          .reduce((a, b) => a - 0 + (b - 0), 0)

        party.budget = party.budget - stake
        party.budget = party.budget < 0 ? 0 : party.budget

        setParty(party)
        setChairs(chairs)
        window.aucLoading = false
      }
    })()
  }, 500)

  return (
    <PageContainer>
      <Router>
        <Nav party={party} />
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <Dashboard
                chairs={chairs}
                partyId={partyId}
                budget={party.budget}
              />
            )}
          />
          <Route
            exact
            path="/:id"
            component={() => (
              <Dashboard
                chairs={chairs}
                partyId={partyId}
                budget={party.budget}
              />
            )}
          />
          <Route path="/" component={NotFoundPage} />
        </Switch>
      </Router>
      <Footer name={party.name} />
    </PageContainer>
  )
}
