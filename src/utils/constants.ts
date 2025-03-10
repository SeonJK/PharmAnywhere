import { API_SERVICE_KEY } from '@env';

/**
 * API 관련 상수
 */
export const API = {
  SERVICE_KEY: API_SERVICE_KEY,
  BASE_URL: 'http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService',
  PHARMACY_ENDPOINT: '/getParmacyListInfoInqire',
};

/**
 * UI 관련 상수
 */
export const UI = {
  COLORS: {
    PRIMARY: '#0066CC',
    BACKGROUND: '#F5F6F8',
    TEXT: {
      PRIMARY: '#333333',
      SECONDARY: '#666666',
      TERTIARY: '#999999',
    },
    ERROR: '#E53935',
  },
};

/**
 * 설정 관련 상수
 */
export const CONFIG = {
  NUM_OF_ROWS: 70,
}; 