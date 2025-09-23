import { FlatList, StyleSheet, Text, View } from 'react-native'
import { TODODEMO } from '../data'
import { TodoDemoType } from '../interface'
import { useState } from 'react'
import Checkbox from 'expo-checkbox';

export default function TodoList() {
  const todos: TodoDemoType[] = TODODEMO;
  
  // store checked state for each todo by id
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  console.log(checkedItems)

  const toggleCheckbox = (id: string | number, value: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODAY'S TASKS</Text>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 23 }} />}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const isChecked = checkedItems[item.id] || false;
          const isTodoChecked = isChecked;
          return (
            <View style={styles.todoCard}>
              <Checkbox 
                value={isChecked}
                onValueChange={(val) => toggleCheckbox(item.id, val)}
                color={isChecked ? "#000000" : undefined}
                style={styles.checkBox}
              />
              <View style={styles.todoContainer}>
                <Text style={[styles.todo,
                  isTodoChecked && { textDecorationLine: "line-through", color: "gray" }
                ]}>{item.todo}</Text>
                <Text style={[styles.todoTime,
                  isTodoChecked && { textDecorationLine: "line-through", color: "gray" }
                ]}>{item.time}</Text>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    color: "#e8ff54",
    fontSize: 15,
    fontWeight: "200",
    marginBottom: 25
  },
  todoCard: {
    backgroundColor: "#e8ff54",
    flexDirection: "row",
    alignItems: "center",
    gap: 27,
    padding: 12,
    borderRadius: 15
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
    fontWeight: "bold"
  },
  todoTime: {
    color: "#000000",
    fontSize: 13
  }
})