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
  status: listingStatus_t;
  buyer: user_t;
  seller: user_t;
  transaction: transaction_t;
};

export type transaction_t = {
  $id: string;
  listing: listing_t;
  buyer: user_t;
  seller: user_t;
  amount: number;
  sellerScreenshot: string;
  status: transactionStatus_t;
  completedAt: string;
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
  chats: chat_t[];
  // anonymousMode: boolean;
};

export type chat_t = {
  $id: string;
  users: user_t[];
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: message_t[];
};

export type message_t = {
  $id: string;
  chat: chat_t;
  sender: user_t;
  content: string;
  timestamp: string;
};

export enum paymentMethod_t {
  Venmo = "Venmo",
  Zelle = "Zelle",
  Any = "any",
}

export enum mode_t {
  Remote = "remote",
  InPerson = "in_person",
}

export const modeLabels: Record<mode_t, string> = {
  [mode_t.Remote]: "Remote",
  [mode_t.InPerson]: "In-person",
};

export enum listingStatus_t {
  Open = "open",
  Pending = "pending",
  Sold = "sold",
  Canceled = "canceled",
}

export enum transactionStatus_t {
  Pending = "pending",
  Confirmed = "confirmed",
  Disputed = "disputed",
}
