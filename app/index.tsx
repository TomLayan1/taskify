import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useNavigation } from 'expo-router';
import { useTaskifyStore } from '../taskifyStore';

export default function index() {
  const [error, setError] = useState<string>("")
  const { username, setUsername } = useTaskifyStore()

  const handleContinue = () => {
    username.trim().length > 0 
    ? router.push('/home')
    : setError("Enter a username");
  }

  return (
    
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.appName}>Taskify</Text>
        <Text style={styles.welcome}>Welcome</Text>
      </View>
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder='Enter your name'
              placeholderTextColor={"#a49d9dff"}
              onChangeText={setUsername}
            />
          </View>
          <Pressable style={styles.cntBtn} onPress={handleContinue}>
            <Text style={styles.cntTxt}>Continue</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000000",
    flex: 1,
    paddingTop: 70,
  },
  innerContainer: {
    backgroundColor: "purple",
    justifyContent: "space-between"
  },
  welcomeContainer: {
    marginBottom: 120
  },
  appName: {
    color: "#e8ff54",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20
  },
  welcome: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 27,
  },
  formContainer: {
    paddingHorizontal: 30
  },
  errorText: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 30
  },
  input: {
    color: "#ffffff",
    fontSize: 16,
    width: "100%",
    backgroundColor: "#545151ff",
    padding: 12,
    borderRadius: 8
  },
  cntBtn: {
    width: "100%",
    backgroundColor: "#e8ff54",
    padding: 12,
    borderRadius: 8
  },
  cntTxt: {
    fontSize: 16,
    textAlign: "center"
  }
})