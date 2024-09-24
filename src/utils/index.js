const createYear = () => {
  const years = []
  for (let i = 1900; i <= 2050; i++) {
    years.push(i)
  }
  return years
}
const createMonths = () => Array.from({ length: 12 }, (_, i) => i + 1)
const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  return { year, month, date }
}
const initList = (year, month) => {
  const list = []

  const referenceTime = new Date(year, month - 1, 1)
  const firstDay = referenceTime.getDay() == 0 ? 7 : referenceTime.getDay()

  const endOfLastMonth = new Date(year, month - 1, 0).getDate()
  for (let i = 0; i < firstDay - 1; i++) {
    list.unshift({ date: endOfLastMonth - i, type: 'last' })
  }

  const endOfThisMonth = new Date(year, month, 0).getDate()
  for (let i = 1; i <= endOfThisMonth; i++) {
    list.push({ date: i, type: 'this' })
  }

  const endOfNextMonth = 42 - endOfThisMonth - (firstDay - 1)
  for (let i = 1; i <= endOfNextMonth; i++) {
    list.push({ date: i, type: 'next' })
  }
  return list
}
export { createYear, createMonths, getCurrentDate, initList }
