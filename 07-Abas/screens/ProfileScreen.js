import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

//importa polyfill que habilita geração de valores aleatórios seguros
import "react-native-get-random-values";
import{v4 as uuidv4} from 'uuid';

export default function ProfileScreen(){
    const [userId] = useState(uuidv4());
    return(
<SafeAreaView style={styles.container}>
    <Text style={styles.text}>👤Tela de Perfil</Text>
    <Text style={styles.subText}>Seu ID único:{userId}</Text>

    <TextInput />
</SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center" },
    text: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
    subText:{fontSize:16, color:"#666"},
    button: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    buttonText: { color: "#fff", fontSize: 18 },
  });