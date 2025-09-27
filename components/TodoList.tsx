import { FlatList, StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useTaskifyStore } from '../taskifyStore';
import { Ionicons } from '@expo/vector-icons';

export default function TodoList() {
  const { tasks, checkedItems, toggleCheckbox, deleteTask } = useTaskifyStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODAY'S TASKS</Text>
      <FlatList
        data={tasks && tasks}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 23 }} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          // <View style={styles.emptyListContainer}>
            <Text style={styles.emptyList}>No task. Add a task.</Text>
          // </View>
        )}
        renderItem={({ item }) => {
          const isChecked = checkedItems[item.id] || false;

          return (
            <View style={styles.todoCard}>
              <Checkbox
                value={isChecked}
                onValueChange={(val) => toggleCheckbox(item.id, val)}
                color={isChecked ? "#000000" : undefined}
                style={styles.checkBox}
              />
              <View style={styles.todoContainer}>
                <Text
                  style={[
                    styles.todo,
                    isChecked && { textDecorationLine: "line-through", color: "gray" },
                  ]}
                >
                  {item.task}
                </Text>
                <Text
                  style={[
                    styles.todoTime,
                    isChecked && { textDecorationLine: "line-through", color: "gray" },
                  ]}
                >
                  {item.time}
                </Text>
              </View>
              <Ionicons name='trash-bin' size={22} color="#000000" onPress={() => deleteTask(item.id)} />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#24ac5fff",
    fontSize: 15,
    fontWeight: "200",
    marginBottom: 25,
  },
  emptyListContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  emptyList: {
    color: "#ffffff",
    fontSize: 18
  },
  todoCard: {
    backgroundColor: "#24ac5fff",
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    padding: 12,
    borderRadius: 15,
  },
  checkBox: {
    width: 22,
    height: 22,
  },
  todoContainer: {
    width: "70%",
    overflow: "hidden",
  },
  todo: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  todoTime: {
    color: "#000000",
    fontSize: 13,
  },
});
