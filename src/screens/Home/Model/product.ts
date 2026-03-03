
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

const db = firestore();

export const productCategories = async () => {
  try {
    const snapshot = await db
      .collection('products')
      .limit(10)
      .get();

    return snapshot.docs.map(
      (document: FirebaseFirestoreTypes.QueryDocumentSnapshot) =>
        document.id
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const products = async (categoryDoc: string) => {
  try {
    const docId = categoryDoc.toLowerCase();

    const querySnapshot = await db
      .collection('products')
      .doc(docId)
      .collection('items')
      .orderBy('createdAt', 'desc')
      .limit(8)
      .get();

    const items = querySnapshot.docs.map(
      (document: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
        const data = document.data();

        return {
          id: document.id,
          ...data,
          createdAt: data.createdAt?.toMillis?.() ?? data.createdAt,
        };
      }
    );

    const individualNames = [
      ...new Set(items.map((item: any) => item.name)),
    ];

    return { items, individualNames };
  } catch (error) {
    console.error(`Error fetching items for category ${categoryDoc}:`, error);
    return { items: [], individualNames: [] };
  }
};