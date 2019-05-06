import axios from 'axios'

const api = axios.create({
  baseURL: 'http://128.199.233.55:5000',
})

// eslint-disable-next-line no-extend-native
Array.prototype.shuffle = function() {
  for (let i = this.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[this[i], this[j]] = [this[j], this[i]]
  }
  return this
}

const sleep = m => new Promise(r => setTimeout(r, m))

export const getStartTime = () => {
  const stTmp = parseInt(JSON.parse(localStorage.getItem('startTime')))
  if (Number.isInteger(stTmp)) {
    return stTmp
  }
  return 0
}

export const verifyKey = async key => {
  const { data } = await api.get(`verify/${key}`)
  return data.result
}

export const setQA = async (adminKey, qId, q, a) => {
  await sleep(1000)
  return 'ok'
}

export const getQs = async () => {
  await sleep(1000)
  return [
    'When you are old, what do you think children will ask you to tell stories about?',
    'If you could switch two movie characters, what switch would lead to the most inappropriate movies?',
    'What animal would be cutest if scaled down to the size of a cat?',
    'What inanimate object would be the most annoying if it played loud upbeat music while being used?',
    'When did something start out badly for you but in the end, it was greatbadly for you but in the end, it was greatbadly for you but in the end, it was great?',
  ].shuffle()
}

export const getQAs = async adminKey => {
  await sleep(1000)
  return [
    { q: '1+1', a: '2' },
    { q: '2+2', a: '4' },
    { q: '1+5', a: '6' },
    { q: '1+2', a: '3' },
    { q: '1+0', a: '1' },
  ]
}

export const getUsers = async adminKey => {
  await sleep(1000)
  return [
    { name: 'swit', userKey: 'kdfsjdfkn', point: 9 },
    { name: 'bun', userKey: 'l7k5l64k', point: 11 },
    { name: 'man', userKey: 'k20ekddkwm', point: 10 },
    { name: 'peach', userKey: 'p03rfdkd', point: 9 },
    { name: 'ming', userKey: 'q8546ior', point: 11 },
    { name: 'paul', userKey: 'ee2093dc', point: 12 },
    { name: 'mean', userKey: 'bzxmbdmsgr', point: 8 },
  ].sort((a, b) => (a.name > b.name && 1) || (a.name < b.name && -1) || 0)
}

export const addUser = async (adminKey, userName) => {
  await api.post('addUser', { newUser: userName, user: adminKey })
  return Math.random() < 0.5 ? 'success' : 'fail'
}

export const updateUser = async (adminKey, userName, key, remainingPoint) => {
  await sleep(1000)
  return Math.random() < 0.5 ? 'success' : 'fail'
}

export const start = async () => {
  await sleep(1000)
  localStorage.setItem('startTime', Date.now().toString())
}

export const stop = async () => {
  await sleep(1000)
  localStorage.setItem('startTime', '0')
}

export const answer = async (qId, ans, player) => {
  await sleep(1000)
  return Math.random() < 0.5 ? 'correct' : 'wrong'
}
