import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AVATARS = [
    { id: '1', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png' },
    { id: '2', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140041.png' },
    { id: '3', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140061.png' },
    { id: '4', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140037.png' },
    { id: '5', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140051.png' },
    { id: '6', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140047.png' },
    { id: '7', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140060.png' },
    { id: '8', url: 'https://cdn-icons-png.flaticon.com/512/4140/4140078.png' },

];

interface AvatarDialogProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
    currentAvatar?: string;
}

const AvatarDialog = ({ isVisible, onClose, onSave, currentAvatar }: AvatarDialogProps) => {
    const [selected, setSelected] = useState(currentAvatar || AVATARS[0].url);

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.dialogContainer}>
                    {/* Header */}
                    <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                        <Icon name="close" size={24} color="#fff" />
                    </TouchableOpacity>

                    <View style={styles.headerRow}>
                        <Image source={{ uri: selected }} style={styles.previewAvatar} />
                        <View style={styles.headerText}>
                            <View style={styles.actionButtons}>
                                <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
                                    <Text style={styles.cancelText}>CANCEL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.saveBtn}
                                    onPress={() => onSave(selected)}
                                >
                                    <Text style={styles.saveText}>SAVE</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.sectionTitle}></Text>

                    <FlatList
                        data={AVATARS}
                        numColumns={4}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setSelected(item.url)}
                                style={[
                                    styles.avatarOption,
                                    selected === item.url && styles.selectedOption
                                ]}
                            >
                                <Image source={{ uri: item.url }} style={styles.optionImg} />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        maxHeight: '70%',
    },
    closeBtn: {
        alignSelf: 'flex-end',
    },
    headerRow: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 25,

    },
    previewAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#D17842',
    },
    headerText: {
        marginLeft: 15,
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        color: '#AAA',
        fontSize: 12,
        marginVertical: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        marginTop: 10,
        gap: 10,
    },
    cancelBtn: {
        paddingVertical: 6,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#D17842',
    },
    cancelText: { color: '#D17842', fontWeight: 'bold', fontSize: 12 },
    saveBtn: {
        paddingVertical: 6,
        paddingHorizontal: 20,
        backgroundColor: '#3C2A21',
    },
    saveText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#333',
        paddingBottom: 5,
    },
    avatarOption: {
        margin: 8,
        padding: 3,
        borderRadius: 40,
    },
    selectedOption: {
        backgroundColor: '#D17842',
    },
    optionImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
    }
});

export default AvatarDialog;