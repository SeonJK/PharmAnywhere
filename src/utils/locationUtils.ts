import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { LocationInfo, AddressInfo } from '../models/PharmacyItem';

/**
 * 위치 권한 요청 함수
 * 
 * @returns {Promise<boolean>} 권한 허용 여부
 */
export const requestLocationPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    const status = await Geolocation.requestAuthorization('whenInUse');
    return status === 'granted';
  } else {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한',
          message: '약국 정보를 가져오기 위해 위치 권한이 필요합니다.',
          buttonNeutral: '나중에 묻기',
          buttonNegative: '취소',
          buttonPositive: '허용',
        }
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
};

/**
 * 현재 위치 가져오기
 * 
 * @returns {Promise<LocationInfo>} 위치 정보
 */
export const getCurrentLocation = (): Promise<LocationInfo> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      error => {
        console.log(error.code, error.message);
        reject('위치 정보를 가져오는데 실패했습니다.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

/**
 * 위치 정보를 주소로 변환
 * 
 * @param {number} latitude 위도
 * @param {number} longitude 경도
 * @returns {Promise<AddressInfo>} 주소 정보
 */
export const convertLocationToAddress = async (
  latitude: number, 
  longitude: number
): Promise<AddressInfo> => {
  try {
    // 카카오 지도 API 또는 Google Maps API를 사용하여 주소 변환이 필요합니다.
    // 여기서는 예시로 더미 데이터를 사용합니다.
    // 실제 구현 시에는 해당 API를 호출하여 주소를 가져와야 합니다.
    return {
      sido: '서울특별시', // 시도 단위 더미 데이터
      sigungu: '관악구',  // 시군구 단위 더미 데이터
    };
  } catch (error) {
    console.error('주소 변환 중 오류 발생:', error);
    throw new Error('주소를 가져오는데 실패했습니다.');
  }
}; 