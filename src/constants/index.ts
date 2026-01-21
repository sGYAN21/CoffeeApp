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

export interface CoffeeItem {
  id: number;
  name: string;
  price: string;
  volume: string;
  rating: string;
  image: ImageSourcePropType;
  description: string;
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
    image: espresso,
    description: 'A strong and bold shot of pure coffee with a rich aroma and intense flavor.',
  },
  {
    id: 2,
    name: 'Latte',
    price: '35.00',
    volume: '200 ml',
    rating: '4.5',
    image: latte,
    description: 'Smooth espresso mixed with steamed milk and topped with a light layer of foam.',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: '40.00',
    volume: '180 ml',
    rating: '4.6',
    image: cappuccino,
    description: 'A balanced blend of espresso, steamed milk, and thick milk foam.',
  },
  {
    id: 4,
    name: 'Americano',
    price: '28.00',
    volume: '220 ml',
    rating: '4.2',
    image: americano,
    description: 'Espresso diluted with hot water for a smooth and light coffee experience.',
  },
  {
    id: 5,
    name: 'Mocha',
    price: '45.00',
    volume: '200 ml',
    rating: '4.7',
    image: mocha,
    description: 'A delicious mix of espresso, chocolate syrup, and steamed milk.',
  },
  {
    id: 6,
    name: 'Flat White',
    price: '38.00',
    volume: '160 ml',
    rating: '4.3',
    image: flatwhite,
    description: 'Rich espresso combined with velvety steamed milk and minimal foam.',
  },
  {
    id: 7,
    name: 'Macchiato',
    price: '32.00',
    volume: '120 ml',
    rating: '4.1',
    image: macchiato,
    description: 'Espresso marked with a small amount of milk foam for a bold taste.',
  },
  {
    id: 8,
    name: 'Irish Coffee',
    price: '50.00',
    volume: '250 ml',
    rating: '4.8',
    image: irish,
    description: 'Hot coffee blended with Irish whiskey and topped with fresh cream.',
  },
  {
    id: 9,
    name: 'Cold Brew',
    price: '42.00',
    volume: '300 ml',
    rating: '4.4',
    image: cold_brew,
    description: 'Slow-brewed cold coffee with a smooth, refreshing, and less acidic taste.',
  },
  {
    id: 10,
    name: 'Affogato',
    price: '48.00',
    volume: '150 ml',
    rating: '4.9',
    image: affogato,
    description: 'A delightful dessert coffee with hot espresso poured over vanilla ice cream.',
  },
];
