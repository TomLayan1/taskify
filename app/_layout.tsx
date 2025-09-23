import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Image } from 'react-native';

const ria = require('../assets/ria.jpg');


export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer 
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#292828ff"
          },
          headerStyle: {
            backgroundColor: "#000000"
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
    </GestureHandlerRootView>
  )
}