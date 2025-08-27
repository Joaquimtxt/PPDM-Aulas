import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Alert,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [tasks, setTasks] = useState([]); //Estado para armazenar a lista de tarefas
  const [newTask, setNewTask] = useState(""); //Estado para o texto da nova tarefa

  const addTask = () => {
    if (newTask.trim().length > 0) {
      //Garante que a tarefa não seja vazia
      setTasks((prevTasks) => [
        ...prevTasks,
        //Cria uma nova tarefa com id único
        { id: Date.now().toString(), text: newTask.trim(), completed: false },
      ]);
      setNewTask(""); //Limpar o campo de input
      Keyboard.dismiss();
    } else {
      Alert.alert("Atenção", "Por favor, digite uma tarefa.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.topBar}>
        <Text style={styles.topBarTitle}>Minhas Tarefas</Text>
        <TouchableOpacity>
          <Text>🌛</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        {/* Local onde o user insere novas tarefas */}
        <TextInput
          style={styles.input}
          placeholder="Adicionar nova tarefa..."
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} //Adiciona a tarefa ao pressionar Enter no teclado
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      {/* Lista de tarefas do User */}
      <FlatList
        style={styles.flatList}
        data={tasks}
        keyExtractor={(item) => item.id} //é uma chave de extração primária, que vai pegar 1 por 1, ele substitui o Map, 
        // pq no expo se já tiver chamado um FlatList, não funciona o Mao
        renderItem={({ item }) => (
          <View key={item.id} style={styles.taskItem}>
            <Text>{item.text}</Text>
            <TouchableOpacity><Text>🗑️</Text></TouchableOpacity>
          </View>
  )}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText}>
            Nenhuma tarefa adicionada ainda.
          </Text>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0f7fa",
    flex: 1,
  },
  topBar: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50, //Ajuste para a barra de status
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  topBarTitle: {
    color: "#00796b",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#FFF",
    color: "#000",
    shadowColor: "#000",
    margin: 20,
    borderRadius: 15,
    padding: 20,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  input: {
    backgroundColor: "#FCFCFC",
    color: "#333",
    borderColor: "#b0bec5",
    borderWidth: 1,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#009688",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 10, //Espaçamento no final da Lista
  },
  taskItem: {
    backgroundColor: "FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: "#FFF",
    color: "#333",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1",
  },
  taskTextContainer: {
    flex: 1, //Permite que o texto ocupe o espaço disponível
    marginRight: 10,
  },
  taskText: {
    color: "#333",
    fontSize: 18,
    flexWrap: "wrap", //Permite que o texto quebre ao chegar no final da tela
  },
  completedTaskItem: {
    textDecorationLine: "line-through", //risca o texto
    opacity: 0.6,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    // color:"#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  emptyListText: {
    color: "#9e9e9e",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
