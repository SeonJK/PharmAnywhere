/**
 * 현재 요일 가져오기 (1: 월요일 ~ 7: 일요일)
 * 
 * @returns {string} 현재 요일 (1-7 문자열)
 */
import { DayOfWeek } from './enums';

/**
 * 현재 요일 가져오기 (enum 값으로 반환)
 * 
 * @returns {DayOfWeek} 현재 요일 enum 값
 */
export const getDayOfWeek = (): DayOfWeek => {
  const today = new Date();
  // JavaScript의 getDay()는 0이 일요일이므로 변환 필요
  const day = today.getDay();
  
  // 일요일(0) -> DayOfWeek.SUNDAY, 나머지는 + 1 (1->MONDAY, 2->TUESDAY ...)
  return day === 0 ? DayOfWeek.SUNDAY : Object.values(DayOfWeek)[day - 1];
};

/**
 * 영업 시간을 포맷팅하여 반환
 * 
 * @param {string} startTime 시작 시간 (예: "0900")
 * @param {string} endTime 종료 시간 (예: "1800")
 * @returns {string} 포맷팅된 시간 문자열 (예: "09:00 - 18:00")
 */
export const formatBusinessHours = (startTime: string, endTime: string): string => {
  if (!startTime || !endTime) {
    return '영업시간 정보 없음';
  }

  // 시간 형식 변환 (예: 0900 -> 09:00)
  const formattedStart = startTime.length === 4 ? `${startTime.slice(0, 2)}:${startTime.slice(2)}` : startTime;
  const formattedEnd = endTime.length === 4 ? `${endTime.slice(0, 2)}:${endTime.slice(2)}` : endTime;
  
  return `${formattedStart} - ${formattedEnd}`;
}; 