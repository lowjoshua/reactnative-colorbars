import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BlockRGB from "./components/BlockRGB";


function HomeScreen({ navigation }) {
  const [colorArray, setColorArray] = useState([]);

  useEffect(() => {
    navigation.setOptions ({
      headerRight: () => <Button onPress={addColor} title="Add Color" />, 
      headerLeft: () => <Button onPress={resetColor} title="Reset" />,
    });
  });

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailsScreen", { ...item })}
      >
        <BlockRGB red={item.red} green={item.green} blue={item.blue} />
      </TouchableOpacity>
    );
  }
 
  
 function addColor() {
  setColorArray([
    ...colorArray,
    {
      red: Math.floor(Math.random() * 256),
      green: Math.floor(Math.random() * 256),
      blue: Math.floor(Math.random() * 256),
      id: `${colorArray.length}`,
    },
  ]);
}

function resetColor() {
  setColorArray([]);
}

return (
  <View style={styles.container}>


    <FlatList style={styles.list} data={colorArray} renderItem={renderItem} />

  </View>
);
}

function DetailsScreen({navigation,route }){
  const {red,green,blue} = route.params
  // define contrasting colors for Text
  const TextColor = {textRed: red > 125? 255-red-20:255+red+20, textGreen: green > 125? 255-green-20:255+green+20, textBlue:blue > 125? 255-blue-20:255+blue+20 } 
  return( 
  <View style={{flex:1, backgroundColor:`rgb(${red},${green},${blue})`}}>
    <Text style={{color:`rgb(${TextColor.textRed},${TextColor.textGreen},${TextColor.textBlue})`, fontSize:36, textAlign:"center", fontWeight:"bold"}}>Red: {red}</Text>
    <Text style={{color:`rgb(${TextColor.textRed},${TextColor.textGreen},${TextColor.textBlue})`, fontSize:36, textAlign:"center", fontWeight:"bold"}}>Green: {green}</Text>
    <Text style={{color:`rgb(${TextColor.textRed},${TextColor.textGreen},${TextColor.textBlue})`, fontSize:36, textAlign:"center", fontWeight:"bold"}}>Blue: {blue}</Text>
  </View>
  )
}
 

const Stack = createStackNavigator();

export default function App() {
 return (
   <NavigationContainer>
     <Stack.Navigator>
       <Stack.Screen name="Colour List" component={HomeScreen} />
       <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
     </Stack.Navigator>
   </NavigationContainer>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: "#fff",
   alignItems: "center",
 },
 list: {
   width: "100%",
 },
});
