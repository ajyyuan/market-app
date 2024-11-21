export type listing_t = {
  $id: string;
  eatery: string;
  order: string;
  addOnPrice: number;
  bid: number;
  quantity: number;
  createdAt: string;
  paymentMethod: string;
  mode: string;
  buyer: user_t;
  seller: user_t;
};

export type user_t = {
  $id: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  accountId: string;
  rating: number;
  accountLocked: boolean;
  totalTransactions: number;
  anonymousMode: boolean;
};
