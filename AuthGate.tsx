import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthGate() {
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async() => {
      const username = await AsyncStorage.getItem("username");
      console.log(username)
    }

    checkUser();
  }, [])

  return(
    <View>
      <ActivityIndicator />
    </View>
  )
}