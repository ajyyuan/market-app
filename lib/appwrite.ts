import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.andrew.market",
  projectId: "672a76f90006efc0fbee",
  databaseId: "672fb048001458368661",
  userCollectionId: "672fb06d0021d4003463",
  listingCollectionId: "672fbcc8001cfd981286",
  transactionCollectionId: "674b4aec001ba3ec529b",
  chatCollectionId: "674b6469000d968a0fb6",
  messageCollectionId: "674b67de00318c173564",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(`${error}`);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error();

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error();

    return currentUser.documents[0];
  } catch (error) {
    console.log(`${error}`);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.listingCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.listingCollectionId,
      [Query.equal("buyer", userId), Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export type createListingProps = {
  buyer: string;
  eatery: string;
  order: string;
  addOnPrice: number;
  bid: number;
  quantity: number;
  paymentMethod: string;
  mode: string;
};

export const createListing = async (form: createListingProps) => {
  try {
    const newPost = await databases.createDocument(
      config.databaseId,
      config.listingCollectionId,
      ID.unique(),
      {
        ...form,
        createdAt: new Date().toISOString(),
        buyer: form.buyer,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const cancelListing = async (listingId: string) => {
  try {
    const post = await databases.deleteDocument(
      config.databaseId,
      config.listingCollectionId,
      listingId
    );

    return post;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", userId)]
    );

    return user.documents[0];
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const createChat = async (
  senderId: string,
  receiverId: string,
  message: string
) => {
  try {
    console.log("start");
    const sender = await getUser(senderId);
    const receiver = await getUser(receiverId);

    // const currentTime = new Date().toISOString();

    const newSelfChat = await databases.createDocument(
      config.databaseId,
      config.chatCollectionId,
      ID.unique(),
      {
        self1: sender.$id,
        other1: receiver.$id,
        lastSender: "self",
        lastMessage: message,
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        messages: [],
      }
    );

    const newOtherChat = await databases.createDocument(
      config.databaseId,
      config.chatCollectionId,
      ID.unique(),
      {
        self1: receiver.$id,
        other1: sender.$id,
        lastSender: "other",
        lastMessage: message,
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        messages: [],
      }
    );

    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      sender.$id,
      {
        chats: [...sender.chats, newSelfChat.$id],
      }
    );

    await databases.updateDocument(
      config.databaseId,
      config.userCollectionId,
      receiver.$id,
      {
        chats: [...receiver.chats, newOtherChat.$id],
      }
    );

    // @todo notify the other user?

    return newSelfChat;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getUserChats = async (userId: string) => {
  try {
    const user = await getUser(userId);
    console.log("user:", user.username);

    // const chats = user.chats;

    // console.log("chats:", chats.members);

    const chats = await databases.listDocuments(
      config.databaseId,
      config.chatCollectionId,
      [
        // Query.equal("self.accountId", userId),
        Query.orderDesc("$createdAt"),
      ]
    );
    // console.log("chats:", chats);
    return chats.documents;

    // const res = user.chats.sort(
    //   (a: chat_t, b: chat_t) =>
    //     new Date(b.lastMessageTime).getTime() -
    //     new Date(a.lastMessageTime).getTime()
    // );
    // console.log("res:", res);

    // return chats;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
