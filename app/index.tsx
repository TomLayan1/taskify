import { Platform, Pressable, StyleSheet, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Categories from '../components/Categories'
import TodoList from '../components/TodoList'
import { StatusBar } from 'expo-status-bar'
import FormModal from '../components/FormModal'

export default function index() {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <SafeAreaView edges={["left", "top", "right"]} style={styles.container}>
      <StatusBar style={"light"} />
      <Text style={styles.welcomeTxt}>What's up, Victoria!</Text>
      <Categories />
      <TodoList />
      <FormModal showModal={showModal} setShowModal={setShowModal} />
      <Pressable style={styles.addBtn} onPress={() => setShowModal(true)}>
        <Text style={styles.add}>+</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    position: "relative"
  },
  welcomeTxt: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 25,
    marginLeft: 20
  },
  addBtn: {
    backgroundColor: "#000000",
    width: 60,
    height: 60,
    borderRadius: "100%",
    borderWidth: 1,
    borderColor: "#e8ff54",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 18
  },
  add: {
    color: "#ffffff",
    fontSize: 30,
    textAlign: "center"
  }
})