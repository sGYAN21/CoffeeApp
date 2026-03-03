import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface DeliveryCardProps {
    name: string;
    label: string;
    address: string;
    phone: string;
    onChangePress: () => void;
}

const DeliveryCard = ({ name, label, address, phone, }: DeliveryCardProps) => {
    return (
     <View style={styles.card}>
      {/* Name and Badge Row */}
      <View style={styles.row}>
        <Feather name="user" size={22} color="#8E8E93" />
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{name}</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{label.toUpperCase()}</Text>
          </View>
        </View>
      </View>

      {/* Address Row */}
      <View style={styles.row}>
        <FontAwesome name="map-marker" size={22} color="#8E8E93" style={styles.iconMargin} />
        <Text style={styles.infoText}>{address}</Text>
      </View>

      {/* Phone Row */}
      <View style={styles.row}>
        <Feather name="phone" size={20} color="#8E8E93" />
        <Text style={styles.infoText}>{phone}</Text>
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    margin: 10,
   
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 15,
    fontWeight: '300',
    color: '#000',
    marginRight: 10,
  },
  badge: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#444',
  },
  iconMargin: {
    marginLeft: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
  },
});

export default DeliveryCard;