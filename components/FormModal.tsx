import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import TimePicker from './TimePicker';
import DropDown from './DropDown';
import { useTaskifyStore } from '../taskifyStore';

type FormModalType = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function FormModal({ showModal, setShowModal}: FormModalType) {
  const [task, setTask] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // import tasks and addtask store
  const { tasks, addTask } = useTaskifyStore();

  const handleCloseModal = () => {
    setShowModal(false);
    setTask("");
    setCategory("");
    setTime("");
  }

  const handleAddTask = () => {
    addTask({
      id: Date.now(),
      task: task,
      time: time,
      category: category
    })
    handleCloseModal();
  }

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeaderContainer}>
            <Text style={styles.modalTitle}>Add Tasks</Text>
            <Pressable onPress={handleCloseModal}>
              <FontAwesome name="times" size={25} color="#000000" />
            </Pressable>
          </View>

          {/* Form */}
          <View>
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldTitle}>Task</Text>
              <TextInput
                style={styles.taskInput}
                placeholder='Enter task'
                placeholderTextColor={"#a49d9dff"}
                onChangeText={setTask}
              />
            </View>
            
            {/* Dropdown */}
            <DropDown setCategory={setCategory} />
          </View>

          {/* Time Picker */}
          {
            !isEditing && time.length > 0 ? 
            <View style={styles.timedisplay}>
              <Text style={styles.fieldTitle}>Time</Text>
              <View style={styles.timeEditContainer}>
                <Text style={styles.time}>{time.length > 0 && time}</Text>
                <Pressable onPress={() => setIsEditing(true)}>
                  <Text style={styles.edit}>Edit</Text>
                </Pressable>
              </View>
            </View>
            :
            <TimePicker setTime={setTime} setIsEditing={setIsEditing} />
          }

          {/* Add Button */}
          {task && category && time && <Pressable style={styles.addTodoBtn} onPress={() => handleAddTask()}>
            <Text style={styles.btnText}>Add Task</Text>
          </Pressable>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#0000008d",
    justifyContent: "flex-end"
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#24ac5fff",
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },
  modalHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30
  },
  modalTitle: {
    color: "#000000",
    fontSize: 27,
    fontWeight: "bold"
  },
  modalX: {
    color: "#000000",
    fontSize: 27
  },
  fieldContainer: {
    marginBottom: 23
  },
  fieldTitle: {
    color: "#000000",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 10
  },
  taskInput: {
    width: "100%",
    backgroundColor: "#292828ff",
    borderColor: "#000000",
    padding: 14,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 0.5,
    color: "#ffffff"
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 10
  },
  dropdown: {
    backgroundColor: "#292828ff",
    width: "100%",
    fontSize: 16
  },
  timedisplay: {
    marginBottom: 20
  },
  timeEditContainer: {
    backgroundColor: "#292828ff",
    borderRadius: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  time: {
    color: "#ffffff",
    fontSize: 16
  },
  edit:{
    color: '#24ac5fff',
    fontSize: 16,
    fontWeight: "200"
  },
  addTodoBtn: {
    width: "100%",
    backgroundColor: "#000000",
    padding: 14,
    borderRadius: 10
  },
  btnText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center"
  }
})