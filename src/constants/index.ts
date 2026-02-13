import { ImageSourcePropType } from 'react-native';
import affogato from '../assets/coffee/affogato.webp';
import americano from '../assets/coffee/americano.webp';
import cappuccino from '../assets/coffee/cappuccino.webp';
import cold_brew from '../assets/coffee/cold_brew.webp';
import espresso from '../assets/coffee/espresso.webp';
import flatwhite from '../assets/coffee/flatwhite.webp';
import irish from '../assets/coffee/irish.webp';
import latte from '../assets/coffee/latte.webp';
import macchiato from '../assets/coffee/macchiato.webp';
import mocha from '../assets/coffee/mocha.webp';

// Juice Images
import orange from '../assets/juice/orangeJuice.webp';
import apple from '../assets/juice/appleJuice.webp';
import mango from '../assets/juice/mangoJuice.webp'; 
import pineapple from '../assets/juice/pineappleJuice.webp';
import watermelon from '../assets/juice/watermelonJuice.webp';
import pomegranate from '../assets/juice/pomegranateJuice.webp';
import mixedFruit from '../assets/juice/mixedFruitJuice.webp';
import grape from '../assets/juice/grapeJuice.webp';
import carrot from '../assets/juice/carrotJuice.webp';
import beetroot from '../assets/juice/beetrootJuice.webp';

// Liquor Images
import jackDaniels from '../assets/liquor/jackDaniels.webp';
import jameson from '../assets/liquor/jameson.webp';
import absolut from '../assets/liquor/absolut.webp';
import smirnoff from '../assets/liquor/smirnoff.webp'; 
import bira from '../assets/liquor/bira.webp';
import kingfisher from '../assets/liquor/kingfisher.webp';
import bacardi from '../assets/liquor/bacardi.webp';
import oldMonk from '../assets/liquor/oldMonk.webp';
import sula from '../assets/liquor/sula.webp';
import jacobsCreek from '../assets/liquor/jacobsCreek.webp';
// Mocktail Images
import virginMojito from '../assets/mocktails/virginMojito.webp';
import shirleyTemple from '../assets/mocktails/shirleyTemple.webp';
import pinaColada from '../assets/mocktails/pinaColada.webp';
import blueLagoon from '../assets/mocktails/blueLagoon.webp';
import fruitPunch from '../assets/mocktails/fruitPunch.webp';
import mintCooler from '../assets/mocktails/mintCooler.webp';
import watermelonMojito from '../assets/mocktails/watermelonMojito.webp';
import peachIcedTea from '../assets/mocktails/peachIcedTea.webp';
import strawberryLemonade from '../assets/mocktails/strawberryLemonade.webp';
import greenAppleFizz from '../assets/mocktails/greenAppleFizz.webp';

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
  'liquor': ['All','Whiskey', 'Vodka', 'Beer', 'Rum', 'Wine'],
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

export const liquorItems: Item[] = [
  {
    id: 1,
    name: 'Jack Daniels',
    price: '45',
    volume: '750 ml',
    rating: '4.8',
    image: jackDaniels,
    description: 'Classic Tennessee whiskey with a smooth smoky finish.',
    type: 'liquor',
    category: 'Whiskey',
  },
  {
    id: 2,
    name: 'Jameson Whiskey',
    price: '40',
    volume: '750 ml',
    rating: '4.7',
    image: jameson,
    description: 'Smooth Irish whiskey with hints of vanilla and spice.',
    type: 'liquor',
    category: 'Whiskey',
  },
  {
    id: 3,
    name: 'Absolut Vodka',
    price: '32',
    volume: '750 ml',
    rating: '4.6',
    image: absolut,
    description: 'Premium Swedish vodka with a clean and crisp taste.',
    type: 'liquor',
    category: 'Vodka',
  },
  {
    id: 4,
    name: 'Smirnoff Red',
    price: '28',
    volume: '750 ml',
    rating: '4.5',
    image: smirnoff,
    description: 'Triple distilled vodka, smooth and versatile.',
    type: 'liquor',
    category: 'Vodka',
  },
  {
    id: 5,
    name: 'Bira White',
    price: '6',
    volume: '330 ml',
    rating: '4.4',
    image: bira,
    description: 'Refreshing wheat beer with citrus notes.',
    type: 'liquor',
    category: 'Beer',
  },
  {
    id: 6,
    name: 'Kingfisher Premium',
    price: '5',
    volume: '330 ml',
    rating: '4.3',
    image: kingfisher,
    description: 'India’s most loved premium lager beer.',
    type: 'liquor',
    category: 'Beer',
  },
  {
    id: 7,
    name: 'Bacardi White Rum',
    price: '30',
    volume: '750 ml',
    rating: '4.5',
    image: bacardi,
    description: 'Light and smooth white rum for classic cocktails.',
    type: 'liquor',
    category: 'Rum',
  },
  {
    id: 8,
    name: 'Old Monk',
    price: '22',
    volume: '750 ml',
    rating: '4.8',
    image: oldMonk,
    description: 'Iconic dark rum with rich vanilla flavor.',
    type: 'liquor',
    category: 'Rum',
  },
  {
    id: 9,
    name: 'Sula Sauvignon Blanc',
    price: '18',
    volume: '750 ml',
    rating: '4.4',
    image: sula,
    description: 'Crisp white wine with tropical fruit notes.',
    type: 'liquor',
    category: 'Wine',
  },
  {
    id: 10,
    name: 'Jacobs Creek Shiraz',
    price: '20',
    volume: '750 ml',
    rating: '4.6',
    image: jacobsCreek,
    description: 'Bold red wine with rich berry flavors.',
    type: 'liquor',
    category: 'Wine',
  },
];

export const mocktailItems: Item[] = [
  {
    id: 1,
    name: 'Virgin Mojito',
    price: '45.00',
    volume: '250 ml',
    rating: '4.6',
    image: virginMojito,
    description: 'Refreshing mix of lime, mint, sugar, and soda water.',
    type: 'Mocktails',
    category: 'Virgin Mojito',
  },
  {
    id: 2,
    name: 'Shirley Temple',
    price: '40.00',
    volume: '250 ml',
    rating: '4.4',
    image: shirleyTemple,
    description: 'Sweet blend of ginger ale and grenadine with a cherry twist.',
    type: 'Mocktails',
    category: 'Shirley Temple',
  },
  {
    id: 3,
    name: 'Virgin Pina Colada',
    price: '50.00',
    volume: '300 ml',
    rating: '4.7',
    image: pinaColada,
    description: 'Creamy pineapple and coconut mocktail served chilled.',
    type: 'Mocktails',
    category: 'Pina Colada',
  },
  {
    id: 4,
    name: 'Blue Lagoon',
    price: '48.00',
    volume: '250 ml',
    rating: '4.5',
    image: blueLagoon,
    description: 'Cool and citrusy blue mocktail with lemon flavors.',
    type: 'Mocktails',
    category: 'Special',
  },
  {
    id: 5,
    name: 'Fruit Punch',
    price: '42.00',
    volume: '300 ml',
    rating: '4.3',
    image: fruitPunch,
    description: 'A colorful mix of fresh fruit juices and soda.',
    type: 'Mocktails',
    category: 'Fruity',
  },
  {
    id: 6,
    name: 'Mint Cooler',
    price: '38.00',
    volume: '250 ml',
    rating: '4.2',
    image: mintCooler,
    description: 'Chilled mint, lime, and soda for instant freshness.',
    type: 'Mocktails',
    category: 'Refreshing',
  },
  {
    id: 7,
    name: 'Watermelon Mojito',
    price: '46.00',
    volume: '300 ml',
    rating: '4.6',
    image: watermelonMojito,
    description: 'Juicy watermelon blended with mint and lime.',
    type: 'Mocktails',
    category: 'Virgin Mojito',
  },
  {
    id: 8,
    name: 'Peach Iced Tea',
    price: '44.00',
    volume: '300 ml',
    rating: '4.4',
    image: peachIcedTea,
    description: 'Smooth iced tea infused with peach flavors.',
    type: 'Mocktails',
    category: 'Iced Tea',
  },
  {
    id: 9,
    name: 'Strawberry Lemonade',
    price: '43.00',
    volume: '250 ml',
    rating: '4.5',
    image: strawberryLemonade,
    description: 'Sweet strawberries mixed with tangy lemonade.',
    type: 'Mocktails',
    category: 'Fruity',
  },
  {
    id: 10,
    name: 'Green Apple Fizz',
    price: '47.00',
    volume: '250 ml',
    rating: '4.6',
    image: greenAppleFizz,
    description: 'Crisp green apple juice topped with sparkling soda.',
    type: 'Mocktails',
    category: 'Special',
  },
];


