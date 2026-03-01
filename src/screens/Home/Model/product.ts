import firestore, { 
  getDocs, 
  collection, 
  FirebaseFirestoreTypes 
} from '@react-native-firebase/firestore';

// Interface to fix 'implicitly has any type' error
export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  type: string;
  price: {
    small: string;
    medium: string;
    large: string;
  };
  volume: {
    small: string;
    medium: string;
    large: string;
  };
  createdAt?: number;
}

const db = firestore();

export const productCategories = async () => {
  try {
    // Modular way to get collection
    const colRef = collection(db, 'products');
    const snapshot = await getDocs(colRef);
    
    // Maps document IDs like 'coffee', 'juices', 'protein_shakes'
    return snapshot.docs.map((document:FirebaseFirestoreTypes.QueryDocumentSnapshot) => document.id);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const products = async (categoryDoc: string) => {
  try {
    const docId = categoryDoc.toLowerCase();
    
    const itemsColRef = collection(db, 'products', docId, 'items');
    const querySnapshot = await getDocs(itemsColRef);

        const items: Product[] = querySnapshot.docs.map((document: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
          const data = document.data();
     return { id: document.id,
     ...(data as Omit<Product, 'id'>),
      createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : data.createdAt,
        updatedAt: data.updatedAt?.toMillis ? data.updatedAt.toMillis() : data.updatedAt,}
    });

    // Extracts unique names for the sub-category bar
    const individualNames = Array.from(new Set(items.map((item:any) => item.name)));
    
    return { items, individualNames };
  } catch (error) {
    console.error(`Error fetching items for category ${categoryDoc}:`, error);
    return { items: [], individualNames: [] };
  }
};
