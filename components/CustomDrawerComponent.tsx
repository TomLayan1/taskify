import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet } from "react-native";
import { useTaskifyStore } from "../taskifyStore";
import AsyncStorage from "@react-native-async-storage/async-storage";


function CustomDrawerContent(props: any) {
  const { setUsername } = useTaskifyStore();

  const handleLogout = async() => {
    // clear username or reset 
    await AsyncStorage.removeItem("username");
    // optionally navigate back to login/onboarding screen
    props.navigation.navigate("/");
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
          labelStyle={{ color: "red", fontWeight: "bold" }}
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
    paddingBottom: 20,
  },
});

export default CustomDrawerContent;
