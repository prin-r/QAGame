import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import Loading from './components/Loading'
import colors from './ui/colors'

const NotFoundPage = Loadable({
  loader: () => import('./pages/404'),
  loading: () => <Loading />,
})

const Dashboard = Loadable({
  loader: () => import('./pages/Dashboard'),
  loading: () => <Loading />,
})

const SettingQA = Loadable({
  loader: () => import('./pages/SettingQA'),
  loading: () => <Loading />,
})

const SettingStartStop = Loadable({
  loader: () => import('./pages/SettingStartStop'),
  loading: () => <Loading />,
})

const SettingUser = Loadable({
  loader: () => import('./pages/SettingUser'),
  loading: () => <Loading />,
})

const Status = Loadable({
  loader: () => import('./pages/Status'),
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

export default () => (
  <PageContainer>
    <Router>
      <Switch>
        <Route exact path="/status/:id" component={Status} />
        <Route exact path="/setting/qa/:id" component={SettingQA} />
        <Route exact path="/setting/ss/:id" component={SettingStartStop} />
        <Route exact path="/setting/user/:id" component={SettingUser} />
        <Route exact path="/swit" component={Dashboard} />
        <Route exact path="/peach" component={Dashboard} />
        <Route exact path="/bun" component={Dashboard} />
        <Route exact path="/ming" component={Dashboard} />
        <Route exact path="/man" component={Dashboard} />
        <Route exact path="/mean" component={Dashboard} />
        <Route exact path="/paul" component={Dashboard} />
        <Route path="/" component={NotFoundPage} />
      </Switch>
    </Router>
  </PageContainer>
)
