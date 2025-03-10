import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { PharmacyItem as PharmacyItemType } from '../models/PharmacyItem';
import PharmacyItemComponent from './PharmacyItem';
import { UI } from '../utils/constants';

interface PharmacyListProps {
  loading: boolean;
  error: string | null;
  pharmacies: PharmacyItemType[];
  onRefresh: () => void;
  getBusinessHours: (pharmacy: PharmacyItemType) => { startTime: string; endTime: string };
}

const PharmacyList: React.FC<PharmacyListProps> = ({
  loading,
  error,
  pharmacies,
  onRefresh,
  getBusinessHours,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={styles.loadingText}>약국 정보를 가져오는 중...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onRefresh}>
          <Text style={styles.retryButtonText}>다시 시도</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={pharmacies}
      renderItem={({ item }) => (
        <PharmacyItemComponent item={item} getBusinessHours={getBusinessHours} />
      )}
      keyExtractor={(item) => item.rnum}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>현재 위치에서 약국 정보가 없습니다.</Text>
        </View>
      }
      refreshing={loading}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: UI.COLORS.TEXT.SECONDARY,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 16,
    color: UI.COLORS.ERROR,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: UI.COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: UI.COLORS.TEXT.SECONDARY,
    textAlign: 'center',
  },
});

export default PharmacyList; 