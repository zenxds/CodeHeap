import test from 'ava'
import isHoliday from './isHoliday'
import isLastWorkingDay from './isLastWorkingDay'
import moment from "moment"

test('isHoliday', t => {
  t.truthy(isHoliday(moment('2018-10-01')))
  t.falsy(isHoliday(moment('2018-09-29')))

  t.falsy(isHoliday(moment('2018-09-17')))
})

test('isLastWorkingDay', t => {
  t.falsy(isLastWorkingDay(moment('2018-09-17')))
  t.truthy(isLastWorkingDay(moment('2018-09-21')))
  t.truthy(isLastWorkingDay(moment('2018-09-30')))
})