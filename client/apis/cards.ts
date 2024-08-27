import request from 'superagent'

const rootUrl = '/api/v1'

export function getFruits(): Promise<string[]> {
  return request.get(rootUrl + '/fruits').then((res) => {
    return res.body.fruits
  })
}

export function getDaily(): Promise<string[]> {
  return request.get(rootUrl + '/daily').then((res) => {
    return res.body.cards
  })
}
