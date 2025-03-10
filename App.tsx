import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, View, Text, StyleSheet } from 'react-native';
import { usePharmacyViewModel } from './src/viewModels/PharmacyViewModel';
import PharmacyList from './src/components/PharmacyList';
import { UI } from './src/utils/constants';

function App(): React.JSX.Element {
  const {
    loading,
    error,
    pharmacies,
    address,
    initializeLocationBasedData,
    handleRefresh,
    getBusinessHours,
  } = usePharmacyViewModel();

  // 앱 초기화 시 위치 기반 데이터 로드
  useEffect(() => {
    initializeLocationBasedData();
  }, [initializeLocationBasedData]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>주변 약국</Text>
        {address && (
          <Text style={styles.headerSubtitle}>
            {address.sido} {address.sigungu}
          </Text>
        )}
      </View>

      <PharmacyList
        loading={loading}
        error={error}
        pharmacies={pharmacies}
        onRefresh={handleRefresh}
        getBusinessHours={getBusinessHours}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: UI.COLORS.BACKGROUND,
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E2E4',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: UI.COLORS.TEXT.PRIMARY,
  },
  headerSubtitle: {
    fontSize: 14,
    color: UI.COLORS.TEXT.SECONDARY,
    marginTop: 4,
  },
});

export default App;
