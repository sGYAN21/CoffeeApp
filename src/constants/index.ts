import { ImageSourcePropType } from 'react-native';
import affogato from '../assets/coffee/affogato.jpg';
import americano from '../assets/coffee/americano.jpg';
import cappuccino from '../assets/coffee/cappuccino.jpg';
import cold_brew from '../assets/coffee/cold_brew.jpg';
import espresso from '../assets/coffee/espresso.jpg';
import flatwhite from '../assets/coffee/flatwhite.jpg';
import irish from '../assets/coffee/irish.jpg';
import latte from '../assets/coffee/latte.jpg';
import macchiato from '../assets/coffee/macchiato.jpg';
import mocha from '../assets/coffee/mocha.jpg';

// Juice Images
import orange from '../assets/juice/orangeJuice.jpg';
import apple from '../assets/juice/appleJuice.jpg';
import mango from '../assets/juice/mangoJuice.jpg'; 
import pineapple from '../assets/juice/pineappleJuice.jpg';
import watermelon from '../assets/juice/watermelonJuice.jpg';
import pomegranate from '../assets/juice/pomegranateJuice.jpg';
import mixedFruit from '../assets/juice/mixedFruitJuice.jpg';
import grape from '../assets/juice/grapeJuice.jpg';
import carrot from '../assets/juice/carrotJuice.jpg';
import beetroot from '../assets/juice/beetrootJuice.jpg';


export interface Item {
  id: number;
  name: string;
  price: string;
  volume: string;
  rating: string;
  image: ImageSourcePropType;
  description: string;
  type: 'Coffee' | 'Juice' | 'liquor' | 'Mocktails';
  category: string;
}

export const theme = {
  bg: '#F9F9F9',
  primary: '#C67C4E',
  textHeader: '#2F2D2C',
  textSecondary: '#9B9B9B',
  white: '#FFFFFF',
};

export const categories: string[] = ['Coffee', 'Juice', 'liquor','Mocktails' ];

export const subCategories: Record<string, string[]> = {
  'Coffee': ['All','Cappuccino', 'Latte', 'Espresso', 'Mocha'],
  'Juice': ['All','Orange', 'Apple', 'Mango', 'Pineapple'],
  'liquor': ['All','Whiskey', 'Vodka', 'Bear', 'Rum', 'Wine'],
  'Mocktails': ['All','Virgin Mojito', 'Shirley Temple', 'Pina Colada'],
};

export const coffeeItems: Item[] = [
  {
    id: 1,
    name: 'Espresso',
    price: '30.00',
    volume: '100 ml',
    rating: '4.0',
    image: espresso,
    description: 'A strong and bold shot of pure coffee with a rich aroma and intense flavor.',
    type: 'Coffee',
    category: 'Espresso',
  },
  {
    id: 2,
    name: 'Latte',
    price: '35.00',
    volume: '200 ml',
    rating: '4.5',
    image: latte,
    description: 'Smooth espresso mixed with steamed milk and topped with a light layer of foam.',
    type: 'Coffee',
    category: 'Latte',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: '40.00',
    volume: '180 ml',
    rating: '4.6',
    image: cappuccino,
    description: 'A balanced blend of espresso, steamed milk, and thick milk foam.',
    type: 'Coffee',
    category: 'Cappuccino',
  },
  {
    id: 4,
    name: 'Americano',
    price: '28.00',
    volume: '220 ml',
    rating: '4.2',
    image: americano,
    description: 'Espresso diluted with hot water for a smooth and light coffee experience.',
    type: 'Coffee',
    category: 'Americano',
  },
  {
    id: 5,
    name: 'Mocha',
    price: '45.00',
    volume: '200 ml',
    rating: '4.7',
    image: mocha,
    description: 'A delicious mix of espresso, chocolate syrup, and steamed milk.',
    type: 'Coffee',
    category: 'Mocha',
  },
  {
    id: 6,
    name: 'Flat White',
    price: '38.00',
    volume: '160 ml',
    rating: '4.3',
    image: flatwhite,
    description: 'Rich espresso combined with velvety steamed milk and minimal foam.',
    type: 'Coffee',
    category: 'Flat White',
  },
  {
    id: 7,
    name: 'Macchiato',
    price: '32.00',
    volume: '120 ml',
    rating: '4.1',
    image: macchiato,
    description: 'Espresso marked with a small amount of milk foam for a bold taste.',
    type: 'Coffee',
    category: 'Macchiato',
  },
  {
    id: 8,
    name: 'Irish Coffee',
    price: '50.00',
    volume: '250 ml',
    rating: '4.8',
    image: irish,
    description: 'Hot coffee blended with Irish whiskey and topped with fresh cream.',
    type: 'Coffee',
    category: 'Irish Coffee',
  },
  {
    id: 9,
    name: 'Cold Brew',
    price: '42.00',
    volume: '300 ml',
    rating: '4.4',
    image: cold_brew,
    description: 'Slow-brewed cold coffee with a smooth, refreshing, and less acidic taste.',
    type: 'Coffee',
    category: 'Cold Brew',
  },
  {
    id: 10,
    name: 'Affogato',
    price: '48.00',
    volume: '150 ml',
    rating: '4.9',
    image: affogato,
    description: 'A delightful dessert coffee with hot espresso poured over vanilla ice cream.',
    type: 'Coffee',
    category: 'Affogato',
  },
];

export const juiceItems: Item[] = [
  {
    id: 1,
    name: 'Orange Juice',
    price: '60',
    volume: '250 ml',
    rating: '4.5',
    image: orange,
    description: 'Freshly squeezed oranges with natural sweetness.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 2,
    name: 'Apple Juice',
    price: '55',
    volume: '250 ml',
    rating: '4.3',
    image: apple,
    description: 'Crisp and refreshing apple juice.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 3,
    name: 'Mango Juice',
    price: '70',
    volume: '300 ml',
    rating: '4.7',
    image: mango,
    description: 'Rich and pulpy mango delight.',
    type: 'Juice',
    category: 'Seasonal',
  },
  {
    id: 4,
    name: 'Pineapple Juice',
    price: '65',
    volume: '250 ml',
    rating: '4.4',
    image: pineapple,
    description: 'Tangy pineapple juice with tropical flavor.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 5,
    name: 'Watermelon Juice',
    price: '50',
    volume: '300 ml',
    rating: '4.2',
    image: watermelon,
    description: 'Light and hydrating watermelon juice.',
    type: 'Juice',
    category: 'Summer',
  },
  {
    id: 6,
    name: 'Pomegranate Juice',
    price: '80',
    volume: '250 ml',
    rating: '4.6',
    image: pomegranate,
    description: 'Antioxidant-rich pomegranate juice.',
    type: 'Juice',
    category: 'Healthy',
  },
  {
    id: 7,
    name: 'Mixed Fruit Juice',
    price: '75',
    volume: '300 ml',
    rating: '4.5',
    image: mixedFruit,
    description: 'Blend of fresh seasonal fruits.',
    type: 'Juice',
    category: 'Special',
  },
  {
    id: 8,
    name: 'Grape Juice',
    price: '60',
    volume: '250 ml',
    rating: '4.3',
    image: grape,
    description: 'Sweet and juicy grape extract.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 9,
    name: 'Carrot Juice',
    price: '55',
    volume: '250 ml',
    rating: '4.1',
    image: carrot,
    description: 'Healthy carrot juice rich in vitamins.',
    type: 'Juice',
    category: 'Healthy',
  },
  {
    id: 10,
    name: 'Beetroot Juice',
    price: '60',
    volume: '250 ml',
    rating: '4.0',
    image: beetroot,
    description: 'Natural detox beetroot juice.',
    type: 'Juice',
    category: 'Healthy',
  },
];
