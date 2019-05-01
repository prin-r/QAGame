import axios from 'axios'

const api = axios.create({
  baseURL: 'http://stupidhack.kulap.io:3000/api/v1/',
})

const sleep = m => new Promise(r => setTimeout(r, m))

export const getChairs = async () => {
  try {
    const { data } = await api.get('leader-board')
    return data
  } catch (e) {
    console.log(e)
  }
  return []
}

export const getParty = async id => {
  try {
    const { data } = await api.get(`party?id=${id}`)
    return data
  } catch (e) {
    console.log(e)
  }
  return {
    id: -1,
    name: 'พรรค null',
    budget: 0,
  }
}

export const answer = async (qId, ans, player) => {
  await sleep(1000)
  return Math.random() < 0.5 ? 'correct' : 'wrong'
}
