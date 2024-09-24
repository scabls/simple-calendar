import request from './request'

const key = ''
const getToDayApi = date => request.get('/day', { params: { key, date } })

export { getToDayApi }
