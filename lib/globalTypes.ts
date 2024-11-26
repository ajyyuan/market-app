export type listing_t = {
  $id: string;
  eatery: string;
  order: string;
  addOnPrice: number;
  bid: number;
  quantity: number;
  createdAt: string;
  paymentMethod: paymentMethod_t;
  mode: mode_t;
  status: status_t;
  buyer: user_t;
  seller: user_t;
};

export enum paymentMethod_t {
  Venmo = "Venmo",
  Zelle = "Zelle",
  Any = "any",
}

export enum mode_t {
  Remote = "remote",
  InPerson = "in-person",
}

export enum status_t {
  Open = "open",
  Pending = "pending",
  Sold = "sold",
  Canceled = "canceled",
}

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
