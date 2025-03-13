/**
 * 약국 정보 인터페이스
 */
export interface PharmacyItem {
  rnum: string;
  dutyAddr: string;
  dutyName: string;
  dutyTel1: string;
  hpid: string;
  postCdn1: string;
  postCdn2: string;
  wgs84Lon: string;
  wgs84Lat: string;
  dutyTime1s?: string;
  dutyTime1c?: string;
  dutyTime2s?: string;
  dutyTime2c?: string;
  dutyTime3s?: string;
  dutyTime3c?: string;
  dutyTime4s?: string;
  dutyTime4c?: string;
  dutyTime5s?: string;
  dutyTime5c?: string;
  dutyTime6s?: string;
  dutyTime6c?: string;
  dutyTime7s?: string;
  dutyTime7c?: string;
  dutyTime8s?: string;
  dutyTime8c?: string;
  dutyEtc?: string;
}

/**
 * API 응답 결과 타입
 */
export interface ApiResponse {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        item: PharmacyItem | PharmacyItem[];
      } | null;
      numOfRows: number;
      totalCount: number;
    };
  };
}

/**
 * 위치 정보 타입
 */
export interface LocationInfo {
  latitude: number;
  longitude: number;
}

/**
 * 주소 정보 타입
 */
export interface AddressInfo {
  sido: string;
  sigungu: string;
} 