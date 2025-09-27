import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { useTaskifyStore } from "../taskifyStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


function CustomDrawerContent(props: any) {
  const router = useRouter();
  const handleLogout = async() => {
    // clear username or reset 
    await AsyncStorage.clear();
    // optionally navigate back to login/onboarding screen
    router.replace("/");
  };

  return (
    <View style={{ flex: 1 }}>
      {/* default drawer items */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* logout button at the bottom */}
      <View style={styles.logoutContainer}>
        <DrawerItem
          label="Logout"
          labelStyle={{ color: "#ea486bff", fontWeight: "bold", fontSize: 17 }}
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    borderTopWidth: 1,
    borderTopColor: "#444",
    padding: 10,
  },
});

export default CustomDrawerContent;
