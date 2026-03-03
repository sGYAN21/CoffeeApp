import React, { useState } from 'react';
import {
  Modal, View, Text, StyleSheet, TouchableOpacity,
  FlatList, Pressable, TextInput, Alert
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import useUserProfile from '../../../hooks/useUserProfile';
import { useOrder,  } from '../../../context/OrderContext';
import { deliveryAddress } from '../../../context/OrderContext'

interface Props {
  isVisible: boolean;
  onClose: () => void;
  selectedId: string;
  onSelect: (id: string) => void;
}

const AddressBottomSheet = ({ isVisible, onClose, selectedId, onSelect }: Props) => {
  const user = auth().currentUser;
  const currentUserId = user?.uid;
  const insets = useSafeAreaInsets();

  // Hooks & Context
  const { userData, addAddress, deleteAddress } = useUserProfile(currentUserId);
  const { setSelectedAddress } = useOrder();

  // Local Form State
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPlace, setPlace] = useState('');
  const [newType, setNewType] = useState('Home');
  const [newPincode, setNewPincode] = useState('');

  const savedAddresses = userData?.deliveryAddress || [];

  const handleSelectAddress = (item: deliveryAddress) => {
  
    onSelect(item.id);

    setSelectedAddress(item);
    
    onClose();
  };

  const handleDeleteAddress = (item: deliveryAddress) => {
    Alert.alert(
      "Delete Address",
      "Are you sure you want to remove this address?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteAddress(item);
            } catch (e) {
              Alert.alert("Error", "Could not delete address");
            }
          } 
        }
      ]
    );
  };

  const handleSaveNewAddress = async () => {
    if (!newName || !newPhone || !newPincode || !newPlace) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newAddr: deliveryAddress = {
      id: Date.now().toString(),
      contactName: newName,
      phone: newPhone,
      pincode: newPincode,
      type: newType,
      place: newPlace,
    };

    try {
      await addAddress(newAddr);
      // Reset form
      setNewName('');
      setNewPhone('');
      setNewPincode('');
      setPlace('');
      setShowAddForm(false);
    } catch (e: any) {
      if (e.message === "LIMIT_REACHED") {
        Alert.alert("Limit Reached", "You can only save up to 3 addresses.");
      } else {
        Alert.alert("Error", "Failed to save address");
      }
    }
  };
  return (
    <>
      <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose} statusBarTranslucent>
        <Pressable style={styles.overlay} onPress={onClose}>
          <View style={styles.sheetContainer}>
            <View style={[styles.innerContent, { paddingBottom: insets.bottom || 20 }]}>
              <View style={styles.handle} />

              <View style={styles.header}>
                <Text style={styles.headerTitle}>Select delivery address</Text>
                <TouchableOpacity onPress={onClose}><MaterialIcons name="close" size={28} color="#333" /></TouchableOpacity>
              </View>

              <View style={styles.subHeader}>
                <Text style={styles.subTitle}>Saved addresses</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => setShowAddForm(true)}>
                  <MaterialIcons name="add" size={20} color="#1A73E8" />
                  <Text style={styles.addBtnText}>Add New</Text>
                </TouchableOpacity>
              </View>

              <FlatList
                data={savedAddresses}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={
                  <View style={{ padding: 40, alignItems: 'center' }}>
                    <Text style={{ color: '#999' }}>No saved addresses found.</Text>
                  </View>
                }
                renderItem={({ item }) => (
                  <View style={styles.addressItem}>
                    <TouchableOpacity style={{ flexDirection: 'row', flex: 1 }} onPress={() => onSelect(item.id)}>
                      <View style={styles.iconContainer}>
                        <Icon name={item.type === 'Home' ? "home-outline" : "location-outline"} size={22} color="#333" />
                      </View>
                      <View style={styles.addressInfo}>
                        <View style={styles.nameRow}>
                          <Text style={styles.addressName}>{item.contactName}</Text>
                          {selectedId === item.id && (
                            <View style={styles.selectedBadge}><Text style={styles.selectedText}>Selected</Text></View>
                          )}
                        </View>
                        <Text style={styles.addressDetails} numberOfLines={1}>{item.place}</Text>
                      </View>
                    </TouchableOpacity>

                    {/* The Delete Button */}
                    <TouchableOpacity
                     
                      style={styles.deleteBtn}
                     onPress={() => handleDeleteAddress(item)}
                    >
                      <MaterialIcons name="delete-outline" size={24} color="#FF5252" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </Pressable>
      </Modal>


      <Modal animationType="fade" transparent visible={showAddForm} onRequestClose={() => setShowAddForm(false)}>
        <View style={styles.overlayCenter}>
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Add Delivery Details</Text>
            <TextInput
              placeholder="Name"
              style={styles.formInput}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput
              placeholder="Phone Number"
              style={styles.formInput}
              keyboardType="phone-pad"
              value={newPhone}
              onChangeText={setNewPhone}
            />
            <TextInput
              placeholder="Pincode"
              style={styles.formInput}
              keyboardType="phone-pad"
              value={newPincode}
              onChangeText={setNewPincode}
            />
            <TextInput
              placeholder="Full Address Details"
              style={[styles.formInput, { height: 80 }]}
              multiline
              value={newPlace}
              onChangeText={setPlace}
            />

            <View style={styles.typeRow}>
              {['Home', 'Work', 'Other'].map(t => (
                <TouchableOpacity
                  key={t}
                  style={[styles.typeBtn, newType === t && styles.typeBtnActive]}
                  onPress={() => setNewType(t)}
                >
                  <Text style={[styles.typeBtnText, newType === t && styles.typeBtnTextActive]}>{t}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.formActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setShowAddForm(false)}>
                <Text style={{ color: '#666' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNewAddress}>
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  overlayCenter: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 20
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    textAlignVertical: 'top'
  },
  typeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  typeBtn: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginHorizontal: 4
  },
  typeBtnActive: {
    backgroundColor: '#C67C4E',

  },
  typeBtnText: { color: '#333' },
  typeBtnTextActive: { color: '#fff' },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cancelBtn: { marginRight: 20 },
  saveBtn: {
    backgroundColor: '#C67C4E',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    minHeight: '45%',
    maxHeight: '85%',
  },
  innerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    borderStyle: 'dashed',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#333',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'semibold',
    color: '#000',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addBtnText: {
    color: '#1A73E8',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 2,
  },
  listContent: {
    paddingBottom: 20,
  },
  deleteBtn: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  addressItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F9F9F9',
  },
  iconContainer: {
    marginRight: 15,
    alignSelf:'center',
    width: 24,
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  addressName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  selectedBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedText: {
    fontSize: 10,
    color: '#1A73E8',
    fontWeight: '600',
  },
  addressDetails: {
    fontSize: 13,
    color: '#666',
  },
});

export default AddressBottomSheet;