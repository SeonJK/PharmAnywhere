import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { PharmacyItem, ApiResponse } from '../models/PharmacyItem';
import { getDayOfWeek } from '../utils/dateUtils';
import { API, CONFIG } from '../utils/constants';
import { DayOfWeek } from '../utils/enums';

/**
 * 약국 데이터 저장소 클래스
 */
class PharmacyRepository {
  private readonly BASE_URL = `${API.BASE_URL}${API.PHARMACY_ENDPOINT}`;
  private readonly parser = new XMLParser();

  /**
   * 약국 목록 조회
   * 
   * @param {string} sido 시도 단위 주소
   * @param {string} sigungu 시군구 단위 주소
   * @returns {Promise<PharmacyItem[]>} 약국 목록
   */
  async getPharmacyList(sido: string, sigungu: string): Promise<PharmacyItem[]> {
    try {
      // 요청 파라미터 설정
      const params = {
        serviceKey: API.SERVICE_KEY,
        Q0: sido,           // 시도 단위 주소
        Q1: sigungu,        // 시군구 단위 주소
        QT: getDayOfWeek(), // 현재 요일 (Enum 값)
        numOfRows: CONFIG.NUM_OF_ROWS, // 가져올 데이터 수
      };
      
      console.log('요청 파라미터:', params);
      
      // API 요청
      const response = await axios.get(this.BASE_URL, { params });
      console.log('API 응답:', response.data);
      
      // XML 파싱
      const result = this.parser.parse(response.data) as ApiResponse;
      
      // 응답 처리
      if (result.response?.header?.resultCode === '00') {
        // 성공적으로 데이터를 받아온 경우
        const items = result.response.body.items?.item;
        if (items) {
          // 단일 항목만 있는 경우에도 배열로 처리
          return Array.isArray(items) ? items : [items];
        }
        return [];
      } else {
        // API 오류 처리
        const errorMsg = result.response?.header?.resultMsg || '약국 정보를 가져오는데 실패했습니다.';
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('약국 정보 요청 중 오류 발생:', error);
      throw error;
    }
  }
}

export default new PharmacyRepository(); 