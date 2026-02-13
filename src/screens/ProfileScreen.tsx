import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import man from '../assets/icons/man.png'
import woman from '../assets/icons/woman.png'
import { SignOut } from '../services/firebase';
const ProfileItem = ({ icon, label, showBorder = true }: { icon: string, label: string, showBorder?: boolean }) => (
    <TouchableOpacity style={[styles.menuItem, showBorder && styles.borderBottom]}>
        <View style={styles.menuItemContent}>
            <MaterialCommunityIcons name={icon} size={22} color="#757575" />
            <Text style={styles.menuItemText}>{label}</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const handleLogout = async () => {
    try {
      await SignOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'signin' }],
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['top']}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <View style={styles.headerBackground}>
                        <View style={styles.btnContainer}>
                            <TouchableOpacity style={styles.backBtn}
                                onPress={() => navigation.goBack()}
                            >
                                <FontAwesome name="chevron-left" size={25} color='#fff' />

                            </TouchableOpacity>
                            <TouchableOpacity style={styles.signoutBtn}  onPress={handleLogout}>
                                <FontAwesome name="sign-out" size={22} color='#fff' />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {/* Profile Card Content */}
                    <View style={styles.profileCard}>

                        {/* Avatar Section */}
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatarWrapper}>
                                <FontAwesome name="user" size={70} color="#fff" />
                                <TouchableOpacity style={styles.cameraBadge}>
                                    <MaterialIcons name="photo-camera" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.userInfo}>
                            <View style={styles.userInfoSection}>
                                <Text style={styles.userName}>NAME</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Age </Text>
                                    <Text style={styles.ageValue}>27</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.editButton}>
                                <MaterialIcons name="edit" size={26} color="#333" />
                            </TouchableOpacity>
                        </View>

                        {/* Gender Selection */}
                        <View style={styles.genderRow}>
                            <TouchableOpacity style={styles.genderCircleActive}>
                                <Image source={man} style={{ width: 40, height: 40 }} resizeMode='contain' />
                                {/* <MaterialCommunityIcons name="gender-male" size={20} color="#fff" /> */}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.genderCircleInactive}>
                                <Image source={woman} style={{ width: 40, height: 40 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>

                        {/* Contact Section */}
                        <View style={styles.contactRow}>
                            <MaterialIcons name="smartphone" size={28} color="#333" />
                            <Text style={styles.phoneNumber}>+02 123 4567 8910</Text>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="whatsapp" size={32} color="#7FB04B" />
                            </TouchableOpacity>
                        </View>

                        {/* Menu List Section */}
                        <View style={styles.menuSection}>
                            <Text style={styles.sectionTitle}>Coffee delivery</Text>

                            <View style={styles.menuCard}>
                                <ProfileItem icon="basket-outline" label="Your orders" />
                                <ProfileItem icon="book-outline" label="Address book" />
                                <ProfileItem icon="bookmark-outline" label="Your collections" />
                                <ProfileItem icon="train-variant" label="Order on train" />
                                <ProfileItem icon="help-circle-outline" label="Online ordering help" />

                                <ProfileItem icon="store-outline" label="Hear from Cafe" showBorder={false} />
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5D4037',
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    headerBackground: {
        height: 120,
        backgroundColor: '#5D4037',
    },
    btnContainer:{
flexDirection: 'row', 
justifyContent: 'space-between', 
alignItems: 'center' 
    },
    backBtn: {
        marginLeft: 20,
        marginTop: 10,
        padding: 5,
    },
    signoutBtn: {
        marginRight: 25,
        padding: 8,
        backgroundColor: 'red',
        borderRadius: 5
    },
    profileCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 20,
        marginTop: -40,
    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -60,
    },
    avatarWrapper: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 4,
        borderColor: '#fff',
        backgroundColor: '#D17842',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#444',
        padding: 6,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#fff',
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 15,
    },
    userInfoSection: {
        flex: 1,
    },
    editButton: {
        padding: 5,
    },
    userName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    detailLabel: {
        fontSize: 18,
        color: '#757575',
    },
    ageValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#D17842',
    },
    genderRow: {
        flexDirection: 'row',
        marginTop: 15,
        gap: 12,
    },
    genderCircleActive: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 3,
        borderColor: '#D17842',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    genderCircleInactive: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    contactRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        paddingBottom: 20,
    },
    phoneNumber: {
        fontSize: 18,
        color: '#424242',
        marginLeft: 10,
        flex: 1,
        fontWeight: '500',
    },
    menuSection: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        marginLeft: 5,
    },
    menuCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        marginBottom: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 14,
        paddingHorizontal: 15,
    },
    menuItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuItemText: {
        fontSize: 15,
        color: '#424242',
        marginLeft: 12,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
});

export default ProfileScreen;