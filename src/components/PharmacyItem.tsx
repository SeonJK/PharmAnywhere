import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PharmacyItem as PharmacyItemType } from '../models/PharmacyItem';
import { formatBusinessHours } from '../utils/dateUtils';
import { UI } from '../utils/constants';

interface PharmacyItemProps {
  item: PharmacyItemType;
  getBusinessHours: (pharmacy: PharmacyItemType) => { startTime: string; endTime: string };
}

const PharmacyItemComponent: React.FC<PharmacyItemProps> = ({ item, getBusinessHours }) => {
  const { startTime, endTime } = getBusinessHours(item);
  const businessHours = formatBusinessHours(startTime, endTime);

  return (
    <View style={styles.itemContainer}>
      <Text style={styles.pharmacyName}>{item.dutyName}</Text>
      <Text style={styles.pharmacyAddress}>{item.dutyAddr}</Text>
      <Text style={styles.pharmacyPhone}>{item.dutyTel1}</Text>
      <Text style={styles.pharmacyHours}>오늘 영업시간: {businessHours}</Text>
      {item.dutyEtc && <Text style={styles.pharmacyEtc}>{item.dutyEtc}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  pharmacyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: UI.COLORS.TEXT.PRIMARY,
    marginBottom: 6,
  },
  pharmacyAddress: {
    fontSize: 14,
    color: UI.COLORS.TEXT.SECONDARY,
    marginBottom: 4,
  },
  pharmacyPhone: {
    fontSize: 14,
    color: UI.COLORS.TEXT.SECONDARY,
    marginBottom: 4,
  },
  pharmacyHours: {
    fontSize: 14,
    color: UI.COLORS.PRIMARY,
    marginBottom: 4,
  },
  pharmacyEtc: {
    fontSize: 13,
    color: UI.COLORS.TEXT.TERTIARY,
    marginTop: 6,
  },
});

export default PharmacyItemComponent; 