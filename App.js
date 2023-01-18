import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [goals, setGoals] = useState("");
  const [goalsList, setGoalsList] = useState([]);
  const goalsTextHandler = (enteredText) => {
    setGoals(enteredText);
  };
  const goalsButtonHandler = () => {
    setGoalsList((prevGoalsList) => [
      ...prevGoalsList,
      { text: goals, id: Math.random().toString() },
    ]);
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputsContainer}>
        <TextInput
          value={goals}
          style={styles.textInput}
          placeholder="type your goal here"
          onChangeText={goalsTextHandler}
        />
        <Button title="add a goal" onPress={goalsButtonHandler} />
      </View>
      <View style={styles.goalsContainer}>
        {goals !== "" && <Text>list of goals</Text>}
        <FlatList
          data={goalsList}
          renderItem={(dataItem) => (
            <View style={styles.goalsItem}>
              <Text style={styles.goalsText}>{dataItem.item.text}</Text>
            </View>
          )}
          keyExtractor={(item) => {
            return item.id;
          }}
          // alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  inputsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#cccccc",
    padding: 16,
    borderRadius: 10,
  },
  goalsContainer: {
    flex: 6,
  },
  goalsItem: {
    padding: 8,
    margin: 8,
    backgroundColor: "#5a0ecc",
    borderRadius: 6,
  },
  goalsText: {
    color: "#ffffff",
  },
});
