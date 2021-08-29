import { db } from "../config/firebase";
import firebase from "firebase/app";
import usersApi from "./users";

export const addMessage = async (
  message = "",
  //   groupId,
  phoneNumber
  //   email,
  //   image = ""
) => {
  const date = firebase.firestore.FieldValue.serverTimestamp();

  const result = await db
    .collection("messages")
    .add({ message, phoneNumber, date });
  // .add({ message, name, date, groupId, email, image });
  if (result) console.log("Document successfully written!"); //render double tick icon

  //   db.collection("groups").doc(groupId).update({ date, lastMessage: message });
};

export const addPrivateMessage = async (message, chatId, phoneNumber) => {
  const date = firebase.firestore.FieldValue.serverTimestamp();

  const result = await db
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add({ message, phoneNumber, date });

  const increment = firebase.firestore.FieldValue.increment(1);

  await db
    .collection("chats")
    .doc(chatId)
    .update({ lastMessage: { message, time: date }, total: increment });
  if (result) return result; //render double tick icon
  return false;
};

// export const addPrivateMessage = async (message, recieverUid) => {
//   const date = firebase.firestore.FieldValue.serverTimestamp();
//   const uid = usersApi.getCurrentUserId();

//   const result = await db
//     .collection("private")
//     .doc(uid + recieverUid)
//     .collection("messages")
//     .add({ message, uid, recieverUid, date });
//   if (result) console.log("Document successfully written!"); //render double tick icon
// };

export const getMessages = (myFunction) => {
  db.collection("messages")
    .orderBy("date", "asc")
    .onSnapshot((snapshot) =>
      myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
};

export const getPrivateMessages = (myFunction, chatId) => {
  db.collection("chats")
    .doc(chatId)
    .collection("messages")
    .orderBy("date", "desc")
    .onSnapshot((snapshot) =>
      myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );
  // .where("members", "array-contains", userId ? userId : "")
  // .orderBy("date", "desc")
  // .onSnapshot((snapshot) =>
  //   myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  // );

  // db.collection("chats")
  //   .where("members", "array-contains", "LiQXjGDrg9R6ZZBY5ZXlEOx7K7D3")
  //   .get()
  //   .then(function (querySnapshot) {
  //     let groupIds = [];
  //     querySnapshot.forEach((doc) => groupIds.push(doc.id));
  //     myFunction(groupIds);
  //   });
};

// export const getPrivateMessages = (myFunction, recieverUid) => {
//   const uid = usersApi.getCurrentUserId();

//   db.collection("private")
//     .doc(uid + recieverUid)
//     .collection("messages")
//     .orderBy("date", "desc")
//     .onSnapshot((snapshot) =>
//       myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
//     );
// };
