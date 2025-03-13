import axios from 'axios';
import { PharmacyItem, ApiResponse } from '../models/PharmacyItem';
import { getDayOfWeek } from '../utils/dateUtils';
import { API, CONFIG } from '../utils/constants';

/**
 * 약국 데이터 저장소 클래스
 */
class PharmacyRepository {
  private readonly BASE_URL = `${API.BASE_URL}${API.PHARMACY_ENDPOINT}`;

  /**
   * API 응답을 string 형태의 데이터를 ApiResponse 형식으로 변환
   * 
   * @param {any} parsedData string 데이터
   * @returns {ApiResponse} API 응답 형식 데이터
   */
  private transformToApiResponse(parsedData: any): ApiResponse {
    try {
      console.log('API 응답 변환 시작');
      
      // 추가 안전장치: 파싱된 데이터 검증
      if (!parsedData || !parsedData.response) {
        console.error('API 응답 변환 실패: 유효하지 않은 응답 구조', parsedData);
        throw new Error('유효하지 않은 API 응답 형식');
      }
      
      const response = parsedData.response;
      
      // 응답에 header가 없는 경우 처리
      if (!response.header) {
        console.error('API 응답 변환 실패: header 없음', response);
        throw new Error('API 응답에 header가 없습니다');
      }
      
      const header = response.header;
      const body = response.body || {};
      
      // items가 없거나 item이 없는 경우 처리
      let items = null;
      if (body && body.items) {
        items = { item: body.items.item || [] };
        console.log('변환된 items 항목 수:', 
          Array.isArray(items.item) ? items.item.length : items.item ? 1 : 0);
      } else {
        console.log('items가 없거나 빈 항목');
      }
      
      const result = {
        response: {
          header: {
            resultCode: header.resultCode,
            resultMsg: header.resultMsg
          },
          body: {
            items: items,
            numOfRows: body.numOfRows ? parseInt(body.numOfRows, 10) : 0,
            totalCount: body.totalCount ? parseInt(body.totalCount, 10) : 0
          }
        }
      };
      
      console.log('API 응답 변환 완료: resultCode =', result.response.header.resultCode);
      return result;
    } catch (error) {
      console.error('API 응답 변환 중 오류:', error);
      throw error;
    }
  }

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
      
      console.log('API 요청 시작:', this.BASE_URL);
      console.log('요청 파라미터:', params);
      
      // API 요청
      const response = await axios.get(this.BASE_URL, { params });
      console.log('API 응답 수신됨, 상태 코드:', response.status, ', 결과코드=', response.data.resultCode);
      console.log('API 응답 수신 객체: data=', response.data);
      
      // 응답 데이터가 유효한지 확인
      if (!response.data) {
        console.error('유효하지 않은 응답 데이터:', typeof response.data);
        throw new Error('API에서 유효한 XML 응답을 받지 못했습니다');
      }
      
      // 데이터 형식 변환
      const result = this.transformToApiResponse(response.data);

      // 응답 처리
      if (result.response?.header?.resultCode === '00') {
        // 성공적으로 데이터를 받아온 경우
        const items = result.response.body.items?.item;
        if (items) {
          // 단일 항목만 있는 경우에도 배열로 처리
          return Array.isArray(items) ? items : [items];
        }
        console.log('약국 데이터 없음');
        return [];
      } else {
        // API 오류 처리
        const errorMsg = result.response?.header?.resultMsg || '약국 정보를 가져오는데 실패했습니다.';
        console.error('API 오류:', result.response?.header?.resultCode, errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('약국 정보 요청 중 오류 발생:', error);
      throw error;
    }
  }
}

export default new PharmacyRepository(); 