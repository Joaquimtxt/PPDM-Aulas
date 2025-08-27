import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [contador, setContador] = useState(0);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [scoreText, setScoreText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const animationRef = useRef(null);
  
  const showScore = (text) => {
    if (animationRef.current) {
      animationRef.current.stop();
    }
        setScoreText(text);
        setScoreVisible(true);

        fadeAnim.setValue(0);
        animationRef.current = Animated.sequence([
          Animated.timing(fadeAnim,{
            toValue: 1,
            duration:300,
            useNativeDriver:true,
          }),
          Animated.delay(1700),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver:true,
          }) 
        ]);
        animationRef.current.start((finished)=>{
          if (finished){
            setScoreVisible(false);
            animationRef.current = null;
          }
        })
      }
      const handleContadorAumentar = ()=>{
    setContador(contador+1);
    showScore('+1');
      }
     const handleContadorDiminuir = ()=>{
    contador > 0 && setContador(contador-1)
    showScore('-1');
      }
     const handleContadorZerar = ()=>{
      const numeroAnterior = contador;
    setContador(0);
    showScore(`-${numeroAnterior}`);
          }
      
  return (
    <View style={styles.container}>
      <View style={styles.screen}>
 <Text style={styles.title}>Contador</Text>
 <Text style={styles.counterText}>{contador}</Text>
 {scoreVisible && (
  <Animated.View
  style={[
    styles.scoreContainer,
  {opacity: fadeAnim}
  ]} >
<Text style={styles.scoreText}>{scoreText}</Text>
  </Animated.View>
 )}
 </View>
 <View style ={styles.buttonContainer}>
  <TouchableOpacity style={[styles.button, styles.resetButton]}  onPress={handleContadorZerar}>
    <Text>0</Text>
  </TouchableOpacity>
  <View style={styles.aumentarDiminuir}>
  <TouchableOpacity style={styles.button} onPress={handleContadorAumentar}>
    <Text style={styles.buttonText} >+</Text>
  </TouchableOpacity >
  <TouchableOpacity style={styles.button}  onPress={handleContadorDiminuir}>
    <Text style={styles.buttonText} >-</Text>
  </TouchableOpacity>
  </View>
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
  screen:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#67C090",
    width:"75%",
    height:"60%",
    borderRadius:30,
  },
  title:{
fontSize:32,
fontWeight: "bold",
color:"#DDF4E7",
marginBottom: 20,

  },
  counterText:{
    fontSize:64,
    fontWeight: "bold",
    color:"#DDF4E7",
    marginBottom: 30,
  },
  scoreContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    paddingHorizontal: 15,
    paddingVertical: 8,
 
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff'
  },
  buttonContainer:{
flexDirection:"row-reverse",
marginBottom:20,
justifyContent:"space-between",
flexDirection:"row",
width:"75%"
  },
  button:{
backgroundColor: "#007bff",
paddingVertical: 15,
paddingHorizontal: 15,
borderRadius: 30,
width: 60,
height: 60,
justifyContent: 'center',
alignItems: 'center',
marginTop:10

  },
  buttonText:{
color: "#fff",
fontSize:18,
fontWeight: "bold",
  },
  resetButton:{
backgroundColor:"#dc3545",

  },
  aumentarDiminuir:{
    flexDirection:"row",
    gap:10
  }

});
