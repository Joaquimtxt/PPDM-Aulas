import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);
  handleContadorAumentar = ()=>{
setContador(contador+1);
  }
  handleContadorDiminuir = ()=>{
contador > 0 && setContador(contador-1)
  }
  handleContadorZerar = ()=>{
setContador(0);
      }


  return (
    <View style={styles.container}>
 <Text style={styles.title}>Contador</Text>
 <Text style={styles.counterText}>{contador}</Text>
 <View style ={styles.buttonContainer}>
  <TouchableOpacity style={styles.button} onPress={handleContadorAumentar}>
    <Text style={styles.buttonText} >Aumentar</Text>
  </TouchableOpacity >
  <TouchableOpacity style={styles.button}  onPress={handleContadorDiminuir}>
    <Text style={styles.buttonText} >Diminuir</Text>
  </TouchableOpacity>
  <TouchableOpacity style={[styles.button, styles.resetButton]}  onPress={handleContadorZerar}>
    <Text>Zerar</Text>
  </TouchableOpacity>
 </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
fontSize:32,
fontWeight: "bold",
color:"#333",
marginBottom: 20,

  },
  counterText:{
    fontSize:64,
    fontWeight: "bold",
    color:"#333",
    marginBottom: 30,
  },
  buttonContainer:{
flexDirection:"row-reverse",
marginBottom:20,
  },
  button:{
backgroundColor: "#007bff",
paddingVertical:15,
paddingHorizontal:40,
borderRadius: 10,

  },
  buttonText:{
color: "#fff",
fontSize:18,
fontWeight: "bold",
  },
  resetButton:{
backgroundColor:"#dc3545"
  }
});
