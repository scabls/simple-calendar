const getNumberArray = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => i + start)

const getCurrentDate = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  return { year, month, date }
}
const getDaysOfMonth = (year, month) => {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return getNumberArray(1, 31)
    case 4:
    case 6:
    case 9:
    case 11:
      return getNumberArray(1, 30)
    case 2:
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) return getNumberArray(1, 29)
      else return getNumberArray(1, 28)
    default:
      return Array.from({ length: 30 }, _ => 'error')
  }
}

const getListItems = (year, month) => {
  const date = new Date(year, month - 1, 1)
  const weekday = date.getDay() == 0 ? 7 : date.getDay()
  const middle = getDaysOfMonth(year, month)
  let beginning = []
  let ending = []
  if (weekday != 1) beginning = getDaysOfMonth(year, month - 1).slice(-(weekday - 1))
  ending = getDaysOfMonth(year, month + 1).slice(0, 42 - middle.length - (weekday - 1))
  switch (month) {
    case 1:
      if (weekday != 1) {
        if (year == 1900) beginning = Array.from({ length: weekday - 1 }, _ => _)
        else beginning = getDaysOfMonth(year - 1, 12).slice(-(weekday - 1))
      }
      break
    case 12:
      if (year == 2050) ending = Array.from({ length: 42 - middle.length - (weekday - 1) }, _ => _)
      else ending = getDaysOfMonth(year + 1, 1).slice(0, 42 - middle.length - (weekday - 1))
      break
  }
  return beginning.concat(middle, ending).map((date, index) => {
    if (index < weekday - 1) {
      return { date, type: 'prev' }
    } else if (index < middle.length + (weekday - 1)) {
      return { date, type: 'current' }
    } else {
      return { date, type: 'next' }
    }
  })
}

export { getNumberArray, getCurrentDate, getDaysOfMonth, getListItems }
