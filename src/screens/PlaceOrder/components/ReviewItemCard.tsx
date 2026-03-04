import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ReviewItemCard = ({ item }: any) => {

    const selectedSize = item.selectedSize || item.size || 'small';

    const rawPrice = typeof item.price === 'object' && item.price !== null 
        ? item.price[selectedSize] 
        : item.price;

    const unitPrice = typeof rawPrice === 'string' 
        ? parseFloat(rawPrice.replace(/[^0-9.-]+/g, "")) 
        : Number(rawPrice) || 0;

    const quantity = item.quantity || 1;
    const totalDisplayPrice = (unitPrice * quantity).toFixed(2);

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}>
                <Image
                    source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                    style={styles.prodImg}
                />
                <View style={styles.quantityBadge}>
                    <Text style={styles.quantityText}>x{quantity}</Text>
                </View>
            </View>
            
            <View style={styles.infoContainer}>
                <Text style={styles.prodTitle} numberOfLines={1}>{item.name}</Text>
                
                <Text style={styles.sizeText}>
                    Size: {selectedSize.charAt(0).toUpperCase() + selectedSize.slice(1)}
                </Text>

                <View style={styles.priceRow}>
                    <Text style={styles.priceText}>
                        <Text style={styles.currency}>$ </Text>
                        {totalDisplayPrice}
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 125, 
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 8,
        marginRight: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    imageContainer: {
        width: '100%',
        height: 90,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
    },
    prodImg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    quantityBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#D17842',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    quantityText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginTop: 8,
        paddingHorizontal: 2,
    },
    prodTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#333',
    },
    sizeText: {
        fontSize: 11,
        color: '#777', 
        marginTop: 2,
        fontWeight: '500',
    },
    priceRow: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2F3337',
    },
    currency: {
        color: '#D17842',
    },
});

export default ReviewItemCard;