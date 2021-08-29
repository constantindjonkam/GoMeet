import { db } from "../config/firebase";
import firebase from "firebase/app";

export const getChats = (myFunction, phoneNumber) => {
  db.collection("chats")
    .where("members", "array-contains", phoneNumber)
    .get()
    .then(function (querySnapshot) {
      let groups = [];
      querySnapshot.forEach((doc) =>
        groups.push({ id: doc.id, ...doc.data() })
      );
      myFunction(groups);
    });
};

// export const getChats = (myFunction) => {
//   db.collection("chats")
//     .doc()
//     .collection("messages")
//     .orderBy("date", "desc")
//     .onSnapshot((snapshot) =>
//       myFunction(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
//     );
// };

export const addMemberToChat = async (chatId, phoneNumber) => {
  const result = await db
    .collection("chats")
    .doc(chatId)
    .update({ members: firebase.firestore.FieldValue.arrayUnion(phoneNumber) });
  if (result) console.log("Document successfully written!"); //render double tick icon
};

export const startPrivateChat = async (myPhone, recieverPhone) => {
  const result = await db.collection("chats").add({
    date: firebase.firestore.FieldValue.serverTimestamp(),
    members: [myPhone, recieverPhone],
  });
  if (result) console.log("Group Added!");
};
