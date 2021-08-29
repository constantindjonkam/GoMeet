const { useEffect, useState } = require("react");
import { Alert } from "react-native";
import { requestPermissionsAsync, getContactsAsync } from "expo-contacts";

export default function useContacts(params) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { granted } = await requestPermissionsAsync();
      if (!granted)
        return Alert.alert("Please enable contacts permission for this app");

      const { data } = await getContactsAsync();

      if (data.length > 0) {
        let newContacts = data.filter(
          ({ phoneNumbers, name }) => phoneNumbers && name
        );
        newContacts = newContacts.map(({ name, phoneNumbers }) => ({
          phoneNumber: phoneNumbers[0].number,
          name,
        }));
        setContacts(newContacts);
      }
    })();
  }, []);

  return contacts;
}
