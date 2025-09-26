import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'react-native';
// import { OnboardingProvider } from "../../Context/TaskifyContext"

const ria = require('../../assets/ria.jpg');


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <OnboardingProvider> */}
        <Drawer 
          screenOptions={{
            drawerStyle: {
              backgroundColor: "#292828ff"
            },
            headerStyle: {
              backgroundColor: "#000000"
            },
            drawerContentStyle: {
              backgroundColor: "#292828ff",
            },
            drawerActiveTintColor: "#e8ff54",
            drawerInactiveTintColor: "#000000",
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: "300",
              width: "100%",
              borderRadius: 0
            },
            headerTintColor: "#fff",
            headerTitle: "",
            headerRight: () => (
              <Image
                source={ria}
                style={{
                  backgroundColor: "#fff",
                  width: 45,
                  height: 45,
                  borderRadius: 20,
                  marginRight: 15,
                }}
                accessibilityLabel={'ria'}
                resizeMode='contain'
              />
            )
          }}
        />
      {/* </OnboardingProvider> */}
    </GestureHandlerRootView>
  )
}