import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// This interface now strictly matches your UserProfile hook structure
interface EditProfileProps {
  isVisible: boolean;
  onClose: () => void;
  currentData: {
    userName: string;
    age?: number;
    phoneNumber?: string;
    gender: 'male' | 'female';
  };
  onSave: (newData: {
    userName: string;
    age: number;
    phoneNumber: string;
    gender: 'male' | 'female';
  }) => void;
}

const EditProfileDrawer = ({ isVisible, onClose, currentData, onSave }: EditProfileProps) => {
  const [name, setName] = useState(currentData.userName);
  const [age, setAge] = useState(currentData.age?.toString() || '');
  const [phone, setPhone] = useState(currentData.phoneNumber || '');
  const [gender, setGender] = useState(currentData.gender);

  useEffect(() => {
    setName(currentData.userName);
    setAge(currentData.age?.toString() || '');
    setPhone(currentData.phoneNumber || '');
    setGender(currentData.gender);
  }, [currentData, isVisible]);

  return (
    <Modal animationType="slide" transparent visible={isVisible} onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <Pressable style={styles.sheetContainer} onPress={(e) => e.stopPropagation()}>
            <View style={styles.handle} />

            <View style={styles.header}>
              <Text style={styles.headerTitle}>Edit Profile Info</Text>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.formContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput style={styles.input} value={name} onChangeText={setName}/>

              <Text style={styles.inputLabel}>Age</Text>
              <TextInput 
                style={styles.input} 
                value={age} 
                onChangeText={setAge} 
                keyboardType="numeric" 
              />

              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderRow}>
                <TouchableOpacity 
                  style={[styles.genderBtn, gender === 'male' && styles.activeGender]}
                  onPress={() => setGender('male')}
                >
                  <Text style={[styles.genderText, gender === 'male' && styles.activeGenderText]}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.genderBtn, gender === 'female' && styles.activeGender]}
                  onPress={() => setGender('female')}
                >
                  <Text style={[styles.genderText, gender === 'female' && styles.activeGenderText]}>Female</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput 
                style={styles.input} 
                value={phone} 
                onChangeText={setPhone} 
                keyboardType="phone-pad" 
              />

              <TouchableOpacity 
                style={styles.saveBtn} 
                onPress={() => onSave({ 
                    userName: name, 
                    age: parseInt(age) || 0, 
                    phoneNumber: phone, 
                    gender 
                })}
              >
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 40,
    maxHeight: '90%',
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
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  formContainer: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    marginBottom: 20,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  genderBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  activeGender: {
    borderColor: '#D17842',
    backgroundColor: '#FFF8F4',
  },
  genderText: {
    color: '#757575',
    fontWeight: '500',
  },
  activeGenderText: {
    color: '#D17842',
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: '#D17842',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditProfileDrawer;