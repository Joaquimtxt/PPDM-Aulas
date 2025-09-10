import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const lightTheme = {
  background: '#f0f0f0',
  textColor: '#212121',
  placeholderColor: '#888',
  resultColor: '#007bff',
  buttonBackground: '#fff',
  operatorButtonBackground:'#ff9500',
  buttonTextColor: '#fff',
  buttonAccent: '#ff5252',
  borderColor: '#ccc',
};

const darkTheme = {
  background: '#121212',
  textColor: '#f5f5f5',
  placeholderColor: '#aaa',
  resultColor: '#66ccff',
  buttonBackground: '#333',
  operatorButtonBackground:'#ff9500',
  buttonTextColor: '#fff',
  buttonAccent: '#ff4d4d',
  borderColor: '#444',
};

export default function App() {
  const [numerosTela, setNumerosTela] = useState("");
  const [resultado, setResultado] = useState("");

  // Detecta o tema do sistema
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const styles = createStyles(theme);

  const numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operadores = ["+", "-", "*", "/", "**", "**0.5"];

  const handleClear = () => {
    setNumerosTela("");
    setResultado("");
  };

  const handleNumerosPressionado = (numero) => {
    setNumerosTela((prev) => prev + numero.toString());
  };

  const handleOperadoresPressionado = (operador) => {
    const ultimoCaracter = numerosTela.slice(-1);
    if (operadores.includes(ultimoCaracter)) {
      return;
    }

    const operadorFormatado = operador === '*' ? 'x' : operador === '/' ? '÷' : operador ==='**'? '^' :  operador ==='**0.5'? '√': operador;
    setNumerosTela((prev) => prev + operadorFormatado);
  };

  const handleCalculate = () => {
    try {
      let expressao = numerosTela.replace(/x/g, '*').replace(/÷/g, '/').replace(/\^/g, '**').replace(/\√/g, '**0.5');
      if (!expressao.trim()) {
        return;
      }
      const regex = /^[0-9+\-*/.()]+$/;
      if (!regex.test(expressao)) {
        throw new Error('Expressão Inválida');
      }
      const resultadoCalculado = eval(expressao);

      setResultado(resultadoCalculado.toString());
    } catch (error) {
      setResultado("Erro");
      console.log("Erro no cálculo: " + error.message);
    }
  };

  const handleDecimal = () => {
    const ultimoNumero = numerosTela.split(/[+\-*/]/).pop();
    if (!ultimoNumero.includes('.')) {
      setNumerosTela((prev) => prev + '.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <View style={styles.resultadoContainer}>
        <TextInput
          style={[styles.input, { color: theme.textColor }]}
          value={numerosTela}
          placeholder="Digite os números"
          placeholderTextColor={theme.placeholderColor}
          editable={false}
        />
        <Text style={[styles.resultadoText, { color: theme.resultColor }]}>
          {resultado}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        {/* Primeira linha de botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.buttonAccent }]}
            onPress={handleClear}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}>AC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleNumerosPressionado('(')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> ( </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleNumerosPressionado(')')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> ) </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperadoresPressionado('**')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> ^ </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperadoresPressionado('/')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> ÷ </Text>
          </TouchableOpacity>
        </View>

        {/* Segunda linha de botões */}
        <View style={styles.buttonRow}>
          {[7, 8, 9].map((numero) => (
            <TouchableOpacity
              key={numero}
              style={styles.button}
              onPress={() => handleNumerosPressionado(numero)}
            >
              <Text style={[styles.buttonText, { color: theme.textColor }]}>{numero}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperadoresPressionado('*')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> × </Text>
          </TouchableOpacity>
        </View>

        {/* Terceira linha de botões */}
        <View style={styles.buttonRow}>
          {[4, 5, 6].map((numero) => (
            <TouchableOpacity
              key={numero}
              style={styles.button}
              onPress={() => handleNumerosPressionado(numero)}
            >
              <Text style={[styles.buttonText, { color: theme.textColor }]}>{numero}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperadoresPressionado('-')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> − </Text>
          </TouchableOpacity>
        </View>

        {/* Quarta linha de botões */}
        <View style={styles.buttonRow}>
          {[1, 2, 3].map((numero) => (
            <TouchableOpacity
              key={numero}
              style={styles.button}
              onPress={() => handleNumerosPressionado(numero)}
            >
              <Text style={[styles.buttonText, { color: theme.textColor }]}>{numero}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperadoresPressionado('+')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> + </Text>
          </TouchableOpacity>
        </View>

        {/* Última linha de botões */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={() => handleNumerosPressionado(0)}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDecimal}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.operatorButton} onPress={() => handleOperadoresPressionado('**0.5')}>
            <Text style={[styles.buttonText, { color: theme.textColor }]}> √ </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.resultColor }]}
            onPress={handleCalculate}
          >
            <Text style={[styles.buttonText, { color: theme.buttonTextColor }]}> = </Text>
          </TouchableOpacity>
        </View>
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
  resultadoContainer: {
    marginBottom: 5,
    padding: 20,
    borderRadius: 10
  },
  input: {
    fontSize: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    marginBottom: 10,
    textAlign: 'right',
  },
  resultadoText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin:2,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.buttonBackground,
  },
  operatorButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.operatorButtonBackground,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});