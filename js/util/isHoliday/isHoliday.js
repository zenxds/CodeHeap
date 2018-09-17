import moment from 'moment'

const workdays = {
  "2018-09-29": 1,
  "2018-09-30": 1
}

const holidays = {
  "2018-09-24": 1,
  "2018-10-01": 1,
  "2018-10-02": 1,
  "2018-10-03": 1,
  "2018-10-04": 1,
  "2018-10-05": 1
}

/**
 * 是否是节假日
 */
export default function isHoliday(m=moment()) {
  const day = m.day()
  const date = m.format('YYYY-MM-DD')

  // 周末周六
  if (day === 0 || day === 6) {
    return !workdays[date]
  } else {
    return !!holidays[date]
  }
}