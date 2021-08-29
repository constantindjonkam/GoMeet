import { auth } from "../config/firebase";
import { db } from "../config/firebase";

const updateUser = (username, imageUrl = "") => {
  const user = auth.currentUser;
  if (!user) return;

  if (username.length > 128)
    return Alert.alert("Username should have a maximum of 128 characters");

  if (username.length >= 3) {
    return user
      .updateProfile({ displayName: username, photoURL: imageUrl })
      .then(
        () =>
          db.collection("users").doc(user.uid).set({
            displayName: username,
            photoURL: imageUrl,
            uid: user.uid,
            phoneNumber: user.phoneNumber,
          })
        // .then(() => {
        //   console.log("Profile updated successfully");
        // })
        // .catch((ex) => alert("Profile couldn't be updated", ex))
      )
      .catch((ex) => alert(ex));
    //Goto Chat screen
  } else Alert.alert("Name is too short");
};

const getCurrentUserId = () => {
  const user = auth?.currentUser;
  if (!user) return user.uid;
};

export default { updateUser, getCurrentUserId };
