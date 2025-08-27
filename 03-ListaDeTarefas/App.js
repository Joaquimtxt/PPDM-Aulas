import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
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

const themes = {
  light: {
    backgroundColor: '#e0f7fa',
    topBarBackground: '#fff',
    cardBackground: '#fff',
    textColor: '#000',
    placeholderColor: '#666',
    inputBackground: '#f5f5f5',
    inputBorder: '#ddd',
    buttonBackground: '#007bff',
    buttonText: '#fff',
    taskBackground: '#fff',
    taskBorder: '#eee',
    completedTaskBackground: '#f0f0f0',
    completedTextColor: '#888',
    emptyListColor: '#666',
    shadowColor: '#000',
    iconColor: '🌛',
  },
  dark: {
    backgroundColor: '#121212',
    topBarBackground: '#1e1e1e',
    cardBackground: '#2e2e2e',
    textColor: '#fff',
    placeholderColor: '#aaa',
    inputBackground: '#3e3e3e',
    inputBorder: '#555',
    buttonBackground: '#0d6efd',
    buttonText: '#fff',
    taskBackground: '#3e3e3e',
    taskBorder: '#555',
    completedTaskBackground: '#4e4e4e',
    completedTextColor: '#aaa',
    emptyListColor: '#aaa',
    shadowColor: '#fff',
    iconColor: '🌞',
  }
};

export default function App() {
  const [tasks, setTasks] = useState([]); //Estado para armazenar a lista de tarefas
  const [newTask, setNewTask] = useState(""); //Estado para o texto da nova tarefa
  const [light, setLight] = useState(true);
  
  const currentTheme = themes[light ? 'light' : 'dark'];

  const toggleTheme = () => {
    setLight(!light);
  };

  useEffect(()=>{
    const loadTasks = async () => {
      try{
       const savedTasks = await AsyncStorage.getItem("tasks");
       savedTasks && setTasks(JSON.parse(savedTasks))
      } catch(error){
        console.error("Erro ao carregar tarefas:", error);
      }
    };

    loadTasks();
  },[])
 
 
  useEffect(()=>{
    const saveTasks = async () => {
      try{
        await AsyncStorage.setItem("tasks", JSON.stringify(tasks))
      } catch(error){
        console.error("Erro ao salvar tarefas:", error);
      }
    };

    saveTasks();
  },[tasks])

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

  const toggleTaskCompleted = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () =>
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)),
        },
      ]
    );
  };

  const renderList = ({ item }) => (
    <View style={[styles.taskItem, { 
      backgroundColor: item.completed ? currentTheme.completedTaskBackground : currentTheme.taskBackground,
      borderColor: currentTheme.taskBorder 
    }]}>
      <TouchableOpacity 
        style={styles.taskContent}
        onPress={() => toggleTaskCompleted(item.id)}
      >
        <Text style={[
          styles.taskText, 
          { color: item.completed ? currentTheme.completedTextColor : currentTheme.textColor },
          item.completed && styles.completedTaskText
        ]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.backgroundColor }]}>
      {/* Cabeçalho */}
      <View style={[styles.topBar, { backgroundColor: currentTheme.topBarBackground }]}>
        <Text style={[styles.topBarTitle, { color: currentTheme.textColor }]}>
          Minhas Tarefas
        </Text>
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={styles.themeIcon}>{currentTheme.iconColor}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.card, { backgroundColor: currentTheme.cardBackground }]}>
        {/* Local onde o user insere novas tarefas */}
        <TextInput
          style={[styles.input, { 
            backgroundColor: currentTheme.inputBackground,
            borderColor: currentTheme.inputBorder,
            color: currentTheme.textColor
          }]}
          placeholder="Adicionar nova tarefa..."
          placeholderTextColor={currentTheme.placeholderColor}
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} //Adiciona a tarefa ao pressionar Enter no teclado
        />
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: currentTheme.buttonBackground }]} 
          onPress={addTask}
        >
          <Text style={[styles.buttonText, { color: currentTheme.buttonText }]}>
            Adicionar
          </Text>
        </TouchableOpacity>
      </View>
      {/* Lista de tarefas do User */}
      <FlatList
        style={styles.flatList}
        data={tasks}
        keyExtractor={(item) => item.id} //é uma chave de extração primária, que vai pegar 1 por 1, ele substitui o Map,
        // pq no expo se já tiver chamado um FlatList, não funciona o Mao
        renderItem={renderList}
        ListEmptyComponent={() => (
          <Text style={[styles.emptyListText, { color: currentTheme.emptyListColor }]}>
            Nenhuma tarefa adicionada ainda.
          </Text>
        )}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style={light ? "dark" : "light"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50, //Ajuste para a barra de status
    paddingBottom: 15,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topBarTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  themeIcon: {
    fontSize: 24,
  },
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  addButton: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  flatListContent: {
    paddingBottom: 10, //Espaçamento no final da Lista
  },
  taskItem: {
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
    borderWidth: 1,
  },
  taskContent: {
    flex: 1, //Permite que o texto ocupe o espaço disponível
    marginRight: 10,
  },
  taskText: {
    fontSize: 18,
    flexWrap: "wrap", //Permite que o texto quebre ao chegar no final da tela
  },
  completedTaskText: {
    textDecorationLine: "line-through", //risca o texto
  },
  deleteIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
  emptyListText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    fontStyle: "italic",
  },
});
