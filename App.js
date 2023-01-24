import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const [visible, setVisible] = useState(false);
  const goalsTextHandler = (enteredText) => {
    setGoals(enteredText);
  };
  const goalsButtonHandler = () => {
    setGoalsList((prevGoalsList) => [
      ...prevGoalsList,
      { text: goals, id: Math.random().toString() },
    ]);
    setVisible(false);
  };
  const handleDelete = (id) => {
    const newState = goalsList.filter((goal) => goal.id !== id);
    setGoalsList(newState);
  };

  const createTwoButtonAlert = (id) =>
    Alert.alert(
      "confirm delete",
      "are you sure you want to delete this todo?",
      [
        { text: "cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => handleDelete(id),
        },
      ]
    );
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.mainPage}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require("./assets/adaptive-icon.png")}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="add new goal"
            color="#c2c2c2"
            onPress={() => setVisible(true)}
          />
        </View>
        <View style={styles.goalsContainer}>
          {/* {goals !== "" && <Text>list of goals</Text>} */}
          <FlatList
            data={goalsList}
            renderItem={(dataItem) => (
              <View style={styles.goalsItem}>
                <Pressable
                  android_ripple={{ color: "#210644" }}
                  style={({ pressed }) => pressed && styles.pressedItem}
                  onLongPress={() => createTwoButtonAlert(dataItem.item.id)}
                >
                  <Text style={styles.goalsText}>{dataItem.item.text}</Text>
                </Pressable>
              </View>
            )}
            keyExtractor={(item) => {
              return item.id;
            }}
            // alwaysBounceVertical={false}
          />
        </View>
      </View>
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.inputsContainer}>
            <TextInput
              value={goals}
              style={styles.textInput}
              placeholder="type your goal here"
              onChangeText={goalsTextHandler}
            />
            <Button
              title="add a goal"
              onPress={goalsButtonHandler}
              color="#ffff"
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  mainPage: {
    flex: 1,
    paddingTop: 32,
    backgroundColor: "#9c27b0",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
  },
  button: {
    backgroundColor: "#0277bd",
    marginHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#ab47bc",
  },
  inputsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#cccccc",
    color: "#ffff",
    padding: 16,
    borderRadius: 10,
  },
  goalsContainer: {
    padding: 16,
  },
  goalsItem: {
    margin: 8,
    backgroundColor: "#5a0ecc",
    borderRadius: 6,
  },
  goalsText: {
    padding: 8,
    color: "#ffffff",
  },
  pressedItem: {
    opacity: 0.5,
  },
});
