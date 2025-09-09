import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Keyboard } from 'react-native';

export default function App() {
  const [valorEmReais, setValorEmReais] = useState("");
  const [resultadoDolar, setResultadoDolar] = useState(0);
  const [resultadoEuro, setResultadoEuro] = useState(0);
  const[showResult, setShowResults] = useState(false);

  const handleClear = () =>{
    setValorEmReais("");
    setResultadoDolar(""),
    setResultadoEuro("");
    setShowResults(false);
    Keyboard.dismiss()
  }
  const handleChange = (text) =>{
const cleanedText = text.replace(/[^0-9.]/g, "");
setValorEmReais(cleanedText);
setShowResults(false);
  }
  const convertCurrency = () =>{
    Keyboard.dismiss();
    const amountinReais = parseFloat(valorEmReais || "0");
    // Calcular o resultado da conversão usando as cotações físicas
    const dolarConvertido = amountinReais / COTACAO_DOLAR;
    const euroConvertido = amountinReais / COTACAO_EURO;

    setResultadoDolar(dolarConvertido.toFixed(2));
    setResultadoEuro(euroConvertido.toFixed(2));
    setShowResults(true);
  }
  //Cotações fixas no código
  const COTACAO_DOLAR = 5.42;
  const COTACAO_EURO = 6.32;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.title}>Conversor de Moedas</Text>
      <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Valor em R$</Text>
      <TextInput style={styles.input} placeholder='0.00'
      keyboardType='numeric'
      value={valorEmReais}
      onChangeText={handleChange}
      />
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={convertCurrency}>
          <Text style={styles.buttonText}>Converter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      {/* card de resultados */}
      {showResult &&(
      <View style={styles.card}>
        <Text style={styles.resultTitle}>Resultados da Conversão</Text>
        <Text style={styles.convertedValueText}>
          <Text style={{fontWeight:"bold"}}>
            R$'valorEmReais'
          </Text>
          <Text> equivalem a</Text>
        </Text>
          <Text style ={styles.finalResultText}>
            <Text style={{fontWeight:"bold"}}>$</Text>
            {resultadoDolar}{" "} Dólares
          </Text>
          <Text style ={styles.finalResultText}>
            <Text style={{fontWeight:"bold"}}>€</Text>
            {resultadoEuro}{" "} Euros
          </Text>
      </View>
)}
      {/* card de cotações físicas */}
      <View style={styles.cotacaoInfoContainer}>
        <Text style={styles.containerInfoTitle}>Cotações Fixas</Text>
        <Text style={styles.containerInfoText}>1 USD = R$ {COTACAO_DOLAR.toFixed(2)}</Text>
        <Text style={styles.containerInfoText}>1 EUR = R$ {COTACAO_EURO.toFixed(2)}</Text>
      </View>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding:20, //Padding direto do container principal
    justifyContent: 'center',//Centraliza o conteúdo verticalmente
  },
  title:{
    fontSize:28,
    fontWeight:"bold",
    color:"#333",
    textAlign:"center",
    marginBottom:30,
  },
  card:{
    backgroundColor:"#FFF",
    borderRadius:10,
    padding:20,
    marginBottom:20,
    shadowCollor:"#000",
    shadowOffset: {width:0, height:2},
    shadowRadius:4,
    elevation:5
  },
  inputContainer:{
    marginBottom: 15,
  },
  inputLabel:{
    fontSize:15,
color:"#555",
marginBottom:5,
  },
  input:{
    borderWidth:1,
    borderColor:"#ccc",
    borderRadius:8,
    padding: 12,
    fontSize: 10,
    textAlign:"right",
  },
  buttonGroup:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:10,
  },
  button:{
    backgroundColor:"#007bff",
    padding:12,
    borderRadius:18,
    alignItems:"center",
    flex: 1,
    marginHorizontal:5
  },
  clearButton:{
    backgroundColor:"#dc3545",
  },
  buttonText:{
    color:"#FFF",
    fontSize:16,
    fontWeight:"bold",
  },
  resultTitle:{
    fontSize:16,
    fontWeight:"bold",
    textAlign:"center",
    marginBottom:10,
    color: "#333"
  },
  convertedValueText:{
    fontSize:16,
    textAlign:"center",
    marginBottom:5,
    color:"#666"
  },
  finalResultText:{
    fontSize:22,
    fontWeight:"bold",
    textAlign:"center",
    marginTop:10,
    color:"#007bff"
  },
  cotacaoInfoContainer:{
marginTop:20,
padding:15,
borderTopWidth:1,
borderTopColor:"#eee",
alignItems:"center",
backgroundColor:"#fff",
borderRadius:10,
shadowColor:"#000",
shadowOffset:{width: 0, height: 1},
shadowOpacity:0.08,
shadowRadius:2,
elevation:3
  }
});
