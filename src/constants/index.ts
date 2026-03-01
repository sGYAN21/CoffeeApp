import { ImageSourcePropType } from 'react-native';

export interface Item {
  id: string | number;
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
  type: string;
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
