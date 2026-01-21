export interface CoffeeItem {
  id: number;
  name: string;
  price: string;
  volume: string;
  rating: string;
  image: string;
}

export const theme = {
  bg: '#F9F9F9',
  primary: '#C67C4E',
  textHeader: '#2F2D2C',
  textSecondary: '#9B9B9B',
  white: '#FFFFFF',
};

export const categories: string[] = ['Cappuccino', 'Latte', 'Espresso', 'Mocha'];

export const coffeeItems: CoffeeItem[] = [
  {
    id: 1,
    name: 'Espresso',
    price: '30.00',
    volume: '100 ml',
    rating: '4.0',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Latte',
    price: '35.00',
    volume: '200 ml',
    rating: '4.5',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: '40.00',
    volume: '180 ml',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Americano',
    price: '28.00',
    volume: '220 ml',
    rating: '4.2',
    image: 'https://images.unsplash.com/photo-1521302080371-4c6c2d4b2b5b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Mocha',
    price: '45.00',
    volume: '200 ml',
    rating: '4.7',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 6,
    name: 'Flat White',
    price: '38.00',
    volume: '160 ml',
    rating: '4.3',
    image: 'https://images.unsplash.com/photo-1523942839745-7848d7c1baf0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 7,
    name: 'Macchiato',
    price: '32.00',
    volume: '120 ml',
    rating: '4.1',
    image: 'https://images.unsplash.com/photo-1605478900974-ec4c8b5b3d92?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 8,
    name: 'Irish Coffee',
    price: '50.00',
    volume: '250 ml',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 9,
    name: 'Cold Brew',
    price: '42.00',
    volume: '300 ml',
    rating: '4.4',
    image: 'https://images.unsplash.com/photo-1598514982373-8c0e6f34f4bb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 10,
    name: 'Affogato',
    price: '48.00',
    volume: '150 ml',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1590080874088-eec64895b423?auto=format&fit=crop&w=400&q=80',
  },
];
