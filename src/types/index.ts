export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  extendedDescription?: string;
  price: number;
  image: string;
  genre?: string;
  rating?: number;
  isSpecialEdition?: boolean;
  specialEditionText?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export interface Order {
  id: string;
  customer: Customer;
  items: CartItem[];
  total: number;
  createdAt: Date;
}