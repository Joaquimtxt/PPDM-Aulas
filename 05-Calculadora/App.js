import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';

const [numerosTela, setNumerosTela] = useState("");
const [resultado, setResultado] = useState("");


const handleClear = () =>{
setNumerosTela("");
setResultado("");

}
const handleChange = () =>{
setNumerosTela()
}


export default function App() {
    const scheme = useColorScheme();
    const theme = scheme === "dark"? darkTheme : lightTheme;
  const styles = createStyles(theme);
  const lightTheme = {
    background: "#f0f0f0",
    
  }
  const darkTheme = {
     background: "#121212",
 
  
  }
 

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.Resultado}>
      <TextInput onChangeText={handleChange} value={numerosTela}>{numerosTela}</TextInput>
      <Text>{resultado}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleClear}>AC</TouchableOpacity>
        <TouchableOpacity>{"()"}</TouchableOpacity>
        <TouchableOpacity>{"% "}</TouchableOpacity>
        <TouchableOpacity value="/">{"÷"}</TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity value="7">7</TouchableOpacity>
        <TouchableOpacity value="8">8</TouchableOpacity>
        <TouchableOpacity value="9">9</TouchableOpacity>
        <TouchableOpacity value="*">{"X"}</TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity value="4">4</TouchableOpacity>
        <TouchableOpacity value="5">5</TouchableOpacity>
        <TouchableOpacity value="6">6</TouchableOpacity>
        <TouchableOpacity value="-">-</TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity value="1">1</TouchableOpacity>
        <TouchableOpacity value="2">2</TouchableOpacity>
        <TouchableOpacity value="3">3</TouchableOpacity>
        <TouchableOpacity value="+">+</TouchableOpacity>
      </View>
      <View>
      <TouchableOpacity value="0">0</TouchableOpacity>
        <TouchableOpacity value=".">.</TouchableOpacity>
        <TouchableOpacity  >EXC</TouchableOpacity>
        <TouchableOpacity onPress={}>=</TouchableOpacity>
      </View>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
    justifyContent: 'center',
  },
})