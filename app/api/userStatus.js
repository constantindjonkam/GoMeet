import { database } from "firebase";

export const spyUserStatus = (phoneNumber) => {
  const userStatusDatabaseRef = database().ref("/status/" + phoneNumber);

  const isOfflineForDatabase = {
    state: "offline",
    last_changed: database.ServerValue.TIMESTAMP,
  };

  const isOnlineForDatabase = {
    state: "online",
    last_changed: database.ServerValue.TIMESTAMP,
  };

  database()
    .ref(".info/connected")
    .on("value", (snapshot) => {
      if (snapshot.val() == false) {
        return;
      }

      userStatusDatabaseRef
        .onDisconnect()
        .set(isOfflineForDatabase)
        .then(() => {
          userStatusDatabaseRef.set(isOnlineForDatabase);
        });
    });
};

export const getUserStatus = (phoneNumber, myFunction) => {
  const starCountRef = database().ref("status/" + phoneNumber);
  starCountRef.on("value", (snapshot) => {
    myFunction(snapshot.val());
  });
};

export const storeScrollIndex = (phoneNumber, index) => {
  const userStatusDatabaseRef = database().ref("/scroll/" + phoneNumber);

  userStatusDatabaseRef
    .set({ scrollIndex: index })
    .then(() => console.log("Success!"))
    .catch(() => console.log("Failed to update db"));
};

export const getUserScrollStatus = (phoneNumber, myFunction) => {
  const starCountRef = database().ref("scroll/" + phoneNumber);
  starCountRef.on("value", (snapshot) => {
    myFunction(snapshot.val().scrollIndex);
  });
};
