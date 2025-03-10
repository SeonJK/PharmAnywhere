/**
 * 요일 enum
 */
export enum DayOfWeek {
  MONDAY = '1',
  TUESDAY = '2',
  WEDNESDAY = '3',
  THURSDAY = '4',
  FRIDAY = '5',
  SATURDAY = '6',
  SUNDAY = '7',
  HOLIDAY = '8'
}

/**
 * 요일별 데이터 필드 매핑
 */
export const DayTimeFields = {
  [DayOfWeek.MONDAY]: { startField: 'dutyTime1s', endField: 'dutyTime1c' },
  [DayOfWeek.TUESDAY]: { startField: 'dutyTime2s', endField: 'dutyTime2c' },
  [DayOfWeek.WEDNESDAY]: { startField: 'dutyTime3s', endField: 'dutyTime3c' },
  [DayOfWeek.THURSDAY]: { startField: 'dutyTime4s', endField: 'dutyTime4c' },
  [DayOfWeek.FRIDAY]: { startField: 'dutyTime5s', endField: 'dutyTime5c' },
  [DayOfWeek.SATURDAY]: { startField: 'dutyTime6s', endField: 'dutyTime6c' },
  [DayOfWeek.SUNDAY]: { startField: 'dutyTime7s', endField: 'dutyTime7c' },
  [DayOfWeek.HOLIDAY]: { startField: 'dutyTime8s', endField: 'dutyTime8c' },
}; 