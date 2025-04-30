export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { // Optional rating property based on some API examples, though not explicitly in the base schema
    rate: number;
    count: number;
  };
}