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

export { createYear, createMonths, getCurrentDate }
