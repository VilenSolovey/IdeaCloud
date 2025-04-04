import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import ArchiveScreen from './screens/ArchiveScreen';
import AddScreen from './screens/AddScreen';
import EditScreen from './screens/EditScreen';
import CommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NotesProvider } from './Contexts/NotesContext';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name='Edit' component={EditScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

interface CustomTabBarButtonProps {
  onPress?: () => void;
  children?: React.ReactNode;
}

const CustomTabBarButton: React.FC<CustomTabBarButtonProps> = ({ onPress, children }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#86B1F1',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

const TabStyle = () => ({
  position: 'absolute',
  height: 80,
  backgroundColor: '#2f3650',
  left: 20,
  right: 20,
  bottom: 20,
  borderRadius: 11,
});

const TabNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: route.name === 'Edit' ? { display: 'none' } : TabStyle(),
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
          fontWeight: 'bold',
        },
        tabBarActiveTintColor: '#86B1F1',
        tabBarInactiveTintColor: '#86B1F1',
      })}
    >
      <Tab.Screen
        name='HomeStack'
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <MaterialIcons name='notes' color={focused ? '#86B1F1' : '#86B1F1'} size={30} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <MaterialIcons name='search' color={focused ? '#86B1F1' : '#86B1F1'} size={30} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name='Add'
        component={AddScreen}
        options={{
          tabBarIcon: () => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 10, left: 2 }}>
              <CommunityIcons name='playlist-plus' color={'#2f3650'} size={30} />
            </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
          tabBarStyle: { display: 'none' }, 
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <MaterialIcons name='category' color={focused ? '#86B1F1' : '#86B1F1'} size={30} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
      <Tab.Screen
        name='Archive'
        component={ArchiveScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 5 }}>
              <MaterialIcons name='archive' color={focused ? '#86B1F1' : '#86B1F1'} size={30} />
            </View>
          ),
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NotesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Main' component={TabNavigator} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NotesProvider>
  );
}
