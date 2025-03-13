import { useState, useCallback } from 'react';
import PharmacyRepository from '../repositories/PharmacyRepository';
import { PharmacyItem, LocationInfo, AddressInfo } from '../models/PharmacyItem';
import { getCurrentLocation, convertLocationToAddress, requestLocationPermission } from '../utils/locationUtils';
import { getDayOfWeek } from '../utils/dateUtils';
import { DayOfWeek, DayTimeFields } from '../utils/enums';

/**
 * 약국 ViewModel Hook
 */
export const usePharmacyViewModel = () => {
  // 상태 관리
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pharmacies, setPharmacies] = useState<PharmacyItem[]>([]);
  const [location, setLocation] = useState<LocationInfo | null>(null);
  const [address, setAddress] = useState<AddressInfo | null>(null);

  /**
   * 약국 정보 가져오기
   * 
   * @param {string} sido 시도 단위 주소
   * @param {string} sigungu 시군구 단위 주소
   */
  const fetchPharmacies = useCallback(async (sido: string, sigungu: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await PharmacyRepository.getPharmacyList(sido, sigungu);
      setPharmacies(data);
    } catch (error) {
      console.error('약국 정보 로드 실패:', error);
      setError(error instanceof Error ? "fetchPharmacies() :: " + error.message : '약국 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * 위치 기반으로 약국 정보 요청 초기화
   */
  const initializeLocationBasedData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 위치 권한 요청
      const hasPermission = await requestLocationPermission();
      
      if (!hasPermission) {
        setError('위치 권한이 거부되었습니다.');
        setLoading(false);
        return;
      }
      
      // 현재 위치 가져오기
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);
      
      // 위치 정보를 주소로 변환
      const addressInfo = await convertLocationToAddress(
        currentLocation.latitude, 
        currentLocation.longitude
      );
      setAddress(addressInfo);
      
      // 주소가 설정되면 약국 정보 요청
      await fetchPharmacies(addressInfo.sido, addressInfo.sigungu);
    } catch (error) {
      console.error('초기화 중 오류 발생:', error);
      setError(error instanceof Error ? "initializeLocationBasedData() :: " + error.message : '약국 정보를 가져오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [fetchPharmacies]);

  /**
   * 새로고침 기능
   */
  const handleRefresh = useCallback(() => {
    if (address) {
      fetchPharmacies(address.sido, address.sigungu);
    } else if (location) {
      const getAddressAndFetch = async () => {
        try {
          const addressInfo = await convertLocationToAddress(
            location.latitude, 
            location.longitude
          );
          setAddress(addressInfo);
          await fetchPharmacies(addressInfo.sido, addressInfo.sigungu);
        } catch (error) {
          setError(error instanceof Error ? "handleRefresh() :: " + error.message : '주소 변환에 실패했습니다.');
        }
      };
      getAddressAndFetch();
    } else {
      initializeLocationBasedData();
    }
  }, [address, location, fetchPharmacies, initializeLocationBasedData]);

  /**
   * 요일에 따른 시간 정보 조회 (리팩토링 버전)
   * 
   * @param {PharmacyItem} pharmacy 약국 정보
   * @returns {object} 시작 시간과 종료 시간
   */
  const getBusinessHours = useCallback((pharmacy: PharmacyItem) => {
    const dayOfWeek = getDayOfWeek();
    const { startField, endField } = DayTimeFields[dayOfWeek];
    
    // 타입 단언을 사용하여 동적 속성 접근
    const startTime = (pharmacy[startField as keyof PharmacyItem] as string) || '';
    const endTime = (pharmacy[endField as keyof PharmacyItem] as string) || '';
    
    return { startTime, endTime };
  }, []);

  return {
    loading,
    error,
    pharmacies,
    address,
    fetchPharmacies,
    initializeLocationBasedData,
    handleRefresh,
    getBusinessHours,
  };
}; 