import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePathname, useRouter } from 'expo-router';
import { useTaskifyStore } from '../taskifyStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';


export default function index() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { username, setUsername } = useTaskifyStore();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    // Check if there's a username in AsyncStorage
    const checkUser = async() => {
      setIsLoading(true);
      try {
        const username = await AsyncStorage.getItem("username");
        console.log("username: ", username);
        if (username && pathname !== '/home') {
          router.replace('/home')
        }
      } finally {
        setIsLoading(false);
        console.log("loading: ", isLoading); 
      }
    }

    checkUser()
  }, [])

  // To login
  const handleContinue = async() => {
    if (username.trim().length > 0) {
      await AsyncStorage.setItem("username", username);
      router.replace('/home');
    } else {
      setError("Enter a username");
    }
  }

  // Loading component while asycn action takes place
  if (isLoading) {
    return (
      <View style={{ 
        backgroundColor: "#000000", 
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center" }}
      >
        <ActivityIndicator size={40} color={"#e8ff54"} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={"light"} />
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
          <TouchableOpacity style={styles.cntBtn} onPress={handleContinue}>
            <Text style={styles.cntTxt}>Continue</Text>
          </TouchableOpacity>
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
    color: "#24ac5fff",
    fontSize: 50,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5
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
    padding: 14,
    borderRadius: 8
  },
  cntBtn: {
    width: "100%",
    backgroundColor: "#24ac5fff",
    padding: 12,
    borderRadius: 8
  },
  cntTxt: {
    fontSize: 16,
    textAlign: "center"
  }
})