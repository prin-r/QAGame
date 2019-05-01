import axios from 'axios'

const api = axios.create({
  baseURL: 'http://stupidhack.kulap.io:3000/api/v1/',
})

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

export const bid = async (pid, cid, price, isWin) => {
  if (!(pid && pid - 0 === Math.floor(pid - 0) && pid - 0 >= 1 && pid - 0 <= 7))
    return
  if (!(cid && cid - 0 === Math.floor(cid - 0) && cid - 0 >= 1 && cid - 0 <= 5))
    return
  const diff = isWin ? 0 : 10
  api.post(`bid?partyId=${pid}&chairId=${cid}&amount=${price + diff - 0}`)
}

window.aucbid = bid
