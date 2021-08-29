import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Modal,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

import colors from "../config/colors";

function Picker({
  placeholder,
  PickerItemComponent,
  items,
  selectedItem,
  onSelectItem,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [input, setInput] = useState("");

  const filtered = items.filter((item) =>
    item.country.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}
          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={colors.dark}
          />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.header}>
          <Ionicons
            name="ios-arrow-back"
            size={48}
            color={colors.primary}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.search}>
            <TextInput style={styles.input} onChangeText={setInput} />
            <FontAwesome name="search" size={24} color={colors.primary} />
          </View>
        </View>
        <FlatList
          data={filtered}
          style={styles.flatlist}
          keyExtractor={(item) => item.country}
          renderItem={({ item }) => (
            <PickerItemComponent
              country={item.country}
              code={item.code}
              onPress={() => {
                onSelectItem(item);
                setInput("");
                setModalVisible(false);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    flex: 1,
    color: colors.yelow,
  },
  text: {
    flex: 1,
  },
  flatlist: {
    margin: -1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.light,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  search: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 30,
    alignItems: "center",
    padding: 4,
    flex: 0.95,
  },
  input: {
    flex: 1,
  },
});

export default Picker;
