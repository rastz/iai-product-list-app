interface Image {
  url: string;
  alt: string;
}
export interface Product {
  id: number;
  name: string;
  img: Image;
  price: number;
  stock: number;
}
