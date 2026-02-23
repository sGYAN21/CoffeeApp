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
// shakes
import chocolateShake from '../assets/shakes/chocolateShake.webp';
import vanillaShake from '../assets/shakes/vanillaShake.webp';
import strawberryShake from '../assets/shakes/strawberryShake.webp';
import mangoShake from '../assets/shakes/mangoShake.webp';
import oreoShake from '../assets/shakes/oreoShake.webp';
import kitkatShake from '../assets/shakes/kitkatShake.webp';
import bananaShake from '../assets/shakes/bananaShake.webp';
import coldCoffeeShake from '../assets/shakes/coldCoffeeShake.webp';  
import dryFruitShake from '../assets/shakes/dryFruitShake.webp';
import peanutButterShake from '../assets/shakes/peanutButterShake.webp';


// export interface Item {
//   id: number;
//   name: string;
//   price: string;
//   volume: string;
//   rating: string;
//   image: ImageSourcePropType;
//   description: string;
//   type: 'Coffee' | 'Juice' | 'liquor' | 'Mocktails';
//   category: string;
// }

export interface Item {
  id: number;
  name: string;
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
  rating: string;
  image: ImageSourcePropType;
  description: string;
  type: 'Coffee' | 'Juice' | 'Liquor' | 'Mocktails' | 'Shake';
  category: string;
}

export const theme = {
  bg: '#F9F9F9',
  primary: '#3C2A21',
  secondary: '#C67C4E',
  textHeader: '#2F2D2C',
  textSecondary: '#9B9B9B',
  white: '#FFFFFF',
};

export const categories: string[] = ['Coffee', 'Juice','Mocktails','Shake' ];

export const subCategories: Record<string, string[]> = {
  'Coffee': ['All','Cappuccino', 'Latte', 'Espresso', 'Mocha'],
  'Juice': ['All','Orange', 'Apple', 'Mango', 'Pineapple'],
  // 'liquor': ['All','Whiskey', 'Vodka', 'Beer', 'Rum', 'Wine'],
  'Mocktails': ['All','Virgin Mojito', 'Shirley Temple', 'Pina Colada'],
  'Shake': ['All','Chocolate', 'Vanilla', 'Strawberry', 'Mango'],
};

export const coffeeItems: Item[] = [
  {
    id: 1,
    name: 'Espresso',
    price: { small: '25.00', medium: '30.00', large: '35.00' },
    volume: { small: '80 ml', medium: '100 ml', large: '120 ml' },
    rating: '4.0',
    image: espresso,
    description: 'A strong and bold shot of pure coffee with a rich aroma and intense flavor.',
    type: 'Coffee',
    category: 'Espresso',
  },
  {
    id: 2,
    name: 'Latte',
    price: { small: '30.00', medium: '35.00', large: '40.00' },
    volume: { small: '150 ml', medium: '200 ml', large: '250 ml' },
    rating: '4.5',
    image: latte,
    description: 'Smooth espresso mixed with steamed milk and topped with a light layer of foam.',
    type: 'Coffee',
    category: 'Latte',
  },
  {
    id: 3,
    name: 'Cappuccino',
    price: { small: '35.00', medium: '40.00', large: '45.00' },
    volume: { small: '140 ml', medium: '180 ml', large: '220 ml' },
    rating: '4.6',
    image: cappuccino,
    description: 'A balanced blend of espresso, steamed milk, and thick milk foam.',
    type: 'Coffee',
    category: 'Cappuccino',
  },
  {
    id: 4,
    name: 'Americano',
    price: { small: '22.00', medium: '28.00', large: '32.00' },
    volume: { small: '180 ml', medium: '220 ml', large: '260 ml' },
    rating: '4.2',
    image: americano,
    description: 'Espresso diluted with hot water for a smooth and light coffee experience.',
    type: 'Coffee',
    category: 'Americano',
  },
  {
    id: 5,
    name: 'Mocha',
    price: { small: '38.00', medium: '45.00', large: '50.00' },
    volume: { small: '160 ml', medium: '200 ml', large: '250 ml' },
    rating: '4.7',
    image: mocha,
    description: 'A delicious mix of espresso, chocolate syrup, and steamed milk.',
    type: 'Coffee',
    category: 'Mocha',
  },
  {
    id: 6,
    name: 'Flat White',
    price: { small: '32.00', medium: '38.00', large: '42.00' },
    volume: { small: '130 ml', medium: '160 ml', large: '200 ml' },
    rating: '4.3',
    image: flatwhite,
    description: 'Rich espresso combined with velvety steamed milk and minimal foam.',
    type: 'Coffee',
    category: 'Flat White',
  },
  {
    id: 7,
    name: 'Macchiato',
    price: { small: '26.00', medium: '32.00', large: '36.00' },
    volume: { small: '90 ml', medium: '120 ml', large: '150 ml' },
    rating: '4.1',
    image: macchiato,
    description: 'Espresso marked with a small amount of milk foam for a bold taste.',
    type: 'Coffee',
    category: 'Macchiato',
  },
  {
    id: 8,
    name: 'Irish Coffee',
    price: { small: '42.00', medium: '50.00', large: '55.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '300 ml' },
    rating: '4.8',
    image: irish,
    description: 'Hot coffee blended with Irish whiskey and topped with fresh cream.',
    type: 'Coffee',
    category: 'Irish Coffee',
  },
  {
    id: 9,
    name: 'Cold Brew',
    price: { small: '35.00', medium: '42.00', large: '48.00' },
    volume: { small: '220 ml', medium: '300 ml', large: '350 ml' },
    rating: '4.4',
    image: cold_brew,
    description: 'Slow-brewed cold coffee with a smooth, refreshing, and less acidic taste.',
    type: 'Coffee',
    category: 'Cold Brew',
  },
  {
    id: 10,
    name: 'Affogato',
    price: { small: '40.00', medium: '48.00', large: '55.00' },
    volume: { small: '120 ml', medium: '150 ml', large: '180 ml' },
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
    price: { small: '45', medium: '60', large: '75' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.5',
    image: orange,
    description: 'Freshly squeezed oranges with natural sweetness.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 2,
    name: 'Apple Juice',
    price: { small: '40', medium: '55', large: '70' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.3',
    image: apple,
    description: 'Crisp and refreshing apple juice.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 3,
    name: 'Mango Juice',
    price: { small: '55', medium: '70', large: '90' },
    volume: { small: '220 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.7',
    image: mango,
    description: 'Rich and pulpy mango delight.',
    type: 'Juice',
    category: 'Seasonal',
  },
  {
    id: 4,
    name: 'Pineapple Juice',
    price: { small: '50', medium: '65', large: '80' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.4',
    image: pineapple,
    description: 'Tangy pineapple juice with tropical flavor.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 5,
    name: 'Watermelon Juice',
    price: { small: '35', medium: '50', large: '65' },
    volume: { small: '250 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.2',
    image: watermelon,
    description: 'Light and hydrating watermelon juice.',
    type: 'Juice',
    category: 'Summer',
  },
  {
    id: 6,
    name: 'Pomegranate Juice',
    price: { small: '60', medium: '80', large: '100' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.6',
    image: pomegranate,
    description: 'Antioxidant-rich pomegranate juice.',
    type: 'Juice',
    category: 'Healthy',
  },
  {
    id: 7,
    name: 'Mixed Fruit Juice',
    price: { small: '55', medium: '75', large: '95' },
    volume: { small: '220 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.5',
    image: mixedFruit,
    description: 'Blend of fresh seasonal fruits.',
    type: 'Juice',
    category: 'Special',
  },
  {
    id: 8,
    name: 'Grape Juice',
    price: { small: '45', medium: '60', large: '75' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.3',
    image: grape,
    description: 'Sweet and juicy grape extract.',
    type: 'Juice',
    category: 'Fresh',
  },
  {
    id: 9,
    name: 'Carrot Juice',
    price: { small: '40', medium: '55', large: '70' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.1',
    image: carrot,
    description: 'Healthy carrot juice rich in vitamins.',
    type: 'Juice',
    category: 'Healthy',
  },
  {
    id: 10,
    name: 'Beetroot Juice',
    price: { small: '45', medium: '60', large: '75' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
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
    price: { small: '18', medium: '30', large: '45' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.8',
    image: jackDaniels,
    description: 'Classic Tennessee whiskey with a smooth smoky finish.',
    type: 'Liquor',
    category: 'Whiskey',
  },
  {
    id: 2,
    name: 'Jameson Whiskey',
    price: { small: '16', medium: '28', large: '40' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.7',
    image: jameson,
    description: 'Smooth Irish whiskey with hints of vanilla and spice.',
    type: 'Liquor',
    category: 'Whiskey',
  },
  {
    id: 3,
    name: 'Absolut Vodka',
    price: { small: '14', medium: '24', large: '32' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.6',
    image: absolut,
    description: 'Premium Swedish vodka with a clean and crisp taste.',
    type: 'Liquor',
    category: 'Vodka',
  },
  {
    id: 4,
    name: 'Smirnoff Red',
    price: { small: '12', medium: '20', large: '28' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.5',
    image: smirnoff,
    description: 'Triple distilled vodka, smooth and versatile.',
    type: 'Liquor',
    category: 'Vodka',
  },
  {
    id: 5,
    name: 'Bira White',
    price: { small: '4', medium: '6', large: '8' },
    volume: { small: '200 ml', medium: '330 ml', large: '500 ml' },
    rating: '4.4',
    image: bira,
    description: 'Refreshing wheat beer with citrus notes.',
    type: 'Liquor',
    category: 'Beer',
  },
  {
    id: 6,
    name: 'Kingfisher Premium',
    price: { small: '3', medium: '5', large: '7' },
    volume: { small: '200 ml', medium: '330 ml', large: '500 ml' },
    rating: '4.3',
    image: kingfisher,
    description: 'India’s most loved premium lager beer.',
    type: 'Liquor',
    category: 'Beer',
  },
  {
    id: 7,
    name: 'Bacardi White Rum',
    price: { small: '12', medium: '22', large: '30' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.5',
    image: bacardi,
    description: 'Light and smooth white rum for classic cocktails.',
    type: 'Liquor',
    category: 'Rum',
  },
  {
    id: 8,
    name: 'Old Monk',
    price: { small: '10', medium: '16', large: '22' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.8',
    image: oldMonk,
    description: 'Iconic dark rum with rich vanilla flavor.',
    type: 'Liquor',
    category: 'Rum',
  },
  {
    id: 9,
    name: 'Sula Sauvignon Blanc',
    price: { small: '8', medium: '13', large: '18' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.4',
    image: sula,
    description: 'Crisp white wine with tropical fruit notes.',
    type: 'Liquor',
    category: 'Wine',
  },
  {
    id: 10,
    name: 'Jacobs Creek Shiraz',
    price: { small: '9', medium: '15', large: '20' },
    volume: { small: '180 ml', medium: '375 ml', large: '750 ml' },
    rating: '4.6',
    image: jacobsCreek,
    description: 'Bold red wine with rich berry flavors.',
    type: 'Liquor',
    category: 'Wine',
  },
];

export const mocktailItems: Item[] = [
  {
    id: 1,
    name: 'Virgin Mojito',
    price: { small: '35.00', medium: '45.00', large: '55.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.6',
    image: virginMojito,
    description: 'Refreshing mix of lime, mint, sugar, and soda water.',
    type: 'Mocktails',
    category: 'Virgin Mojito',
  },
  {
    id: 2,
    name: 'Shirley Temple',
    price: { small: '30.00', medium: '40.00', large: '50.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.4',
    image: shirleyTemple,
    description: 'Sweet blend of ginger ale and grenadine with a cherry twist.',
    type: 'Mocktails',
    category: 'Shirley Temple',
  },
  {
    id: 3,
    name: 'Virgin Pina Colada',
    price: { small: '40.00', medium: '50.00', large: '65.00' },
    volume: { small: '220 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.7',
    image: pinaColada,
    description: 'Creamy pineapple and coconut mocktail served chilled.',
    type: 'Mocktails',
    category: 'Pina Colada',
  },
  {
    id: 4,
    name: 'Blue Lagoon',
    price: { small: '38.00', medium: '48.00', large: '60.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.5',
    image: blueLagoon,
    description: 'Cool and citrusy blue mocktail with lemon flavors.',
    type: 'Mocktails',
    category: 'Special',
  },
  {
    id: 5,
    name: 'Fruit Punch',
    price: { small: '32.00', medium: '42.00', large: '55.00' },
    volume: { small: '220 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.3',
    image: fruitPunch,
    description: 'A colorful mix of fresh fruit juices and soda.',
    type: 'Mocktails',
    category: 'Fruity',
  },
  {
    id: 6,
    name: 'Mint Cooler',
    price: { small: '28.00', medium: '38.00', large: '48.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.2',
    image: mintCooler,
    description: 'Chilled mint, lime, and soda for instant freshness.',
    type: 'Mocktails',
    category: 'Refreshing',
  },
  {
    id: 7,
    name: 'Watermelon Mojito',
    price: { small: '36.00', medium: '46.00', large: '58.00' },
    volume: { small: '220 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.6',
    image: watermelonMojito,
    description: 'Juicy watermelon blended with mint and lime.',
    type: 'Mocktails',
    category: 'Virgin Mojito',
  },
  {
    id: 8,
    name: 'Peach Iced Tea',
    price: { small: '34.00', medium: '44.00', large: '56.00' },
    volume: { small: '220 ml', medium: '300 ml', large: '400 ml' },
    rating: '4.4',
    image: peachIcedTea,
    description: 'Smooth iced tea infused with peach flavors.',
    type: 'Mocktails',
    category: 'Iced Tea',
  },
  {
    id: 9,
    name: 'Strawberry Lemonade',
    price: { small: '33.00', medium: '43.00', large: '55.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.5',
    image: strawberryLemonade,
    description: 'Sweet strawberries mixed with tangy lemonade.',
    type: 'Mocktails',
    category: 'Fruity',
  },
  {
    id: 10,
    name: 'Green Apple Fizz',
    price: { small: '37.00', medium: '47.00', large: '60.00' },
    volume: { small: '200 ml', medium: '250 ml', large: '350 ml' },
    rating: '4.6',
    image: greenAppleFizz,
    description: 'Crisp green apple juice topped with sparkling soda.',
    type: 'Mocktails',
    category: 'Special',
  },
];
export const shakeItems: Item[] = [
  {
    id: 1,
    name: 'Chocolate Shake',
    price: { small: '4', medium: '6', large: '8' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.7',
    image: chocolateShake,
    description: 'Rich and creamy chocolate milkshake.',
    type: 'Shake',
    category: 'Chocolate',
  },
  {
    id: 2,
    name: 'Vanilla Shake',
    price: { small: '4', medium: '6', large: '8' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.5',
    image: vanillaShake,
    description: 'Classic vanilla shake with smooth texture.',
    type: 'Shake',
    category: 'Classic',
  },
  {
    id: 3,
    name: 'Strawberry Shake',
    price: { small: '5', medium: '7', large: '9' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.6',
    image: strawberryShake,
    description: 'Fresh strawberry blended with creamy milk.',
    type: 'Shake',
    category: 'Fruit',
  },
  {
    id: 4,
    name: 'Mango Shake',
    price: { small: '5', medium: '7', large: '9' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.8',
    image: mangoShake,
    description: 'Seasonal mango shake made from real mango pulp.',
    type: 'Shake',
    category: 'Fruit',
  },
  {
    id: 5,
    name: 'Oreo Shake',
    price: { small: '6', medium: '8', large: '10' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.9',
    image: oreoShake,
    description: 'Creamy Oreo shake topped with cookie crunch.',
    type: 'Shake',
    category: 'Chocolate',
  },
  {
    id: 6,
    name: 'KitKat Shake',
    price: { small: '6', medium: '8', large: '10' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.8',
    image: kitkatShake,
    description: 'Chocolatey KitKat shake with wafer bits.',
    type: 'Shake',
    category: 'Chocolate',
  },
  {
    id: 7,
    name: 'Banana Shake',
    price: { small: '4', medium: '6', large: '8' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.4',
    image: bananaShake,
    description: 'Healthy banana shake rich in energy.',
    type: 'Shake',
    category: 'Healthy',
  },
  {
    id: 8,
    name: 'Dry Fruit Shake',
    price: { small: '7', medium: '10', large: '13' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.6',
    image: dryFruitShake,
    description: 'Premium shake loaded with mixed dry fruits.',
    type: 'Shake',
    category: 'Premium',
  },
  {
    id: 9,
    name: 'Peanut Butter Shake',
    price: { small: '6', medium: '9', large: '12' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.5',
    image: peanutButterShake,
    description: 'Protein-rich peanut butter shake.',
    type: 'Shake',
    category: 'Protein',
  },
  {
    id: 10,
    name: 'Cold Coffee Shake',
    price: { small: '5', medium: '7', large: '9' },
    volume: { small: '250 ml', medium: '350 ml', large: '500 ml' },
    rating: '4.7',
    image: coldCoffeeShake,
    description: 'Chilled coffee shake with rich aroma.',
    type: 'Shake',
    category: 'Coffee',
  },
];


