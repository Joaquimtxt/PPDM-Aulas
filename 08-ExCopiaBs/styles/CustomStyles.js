import { StyleSheet } from "react-native";

export function customStyles() {
    const body = {
        textCustom: { 
            fontSize: 20, 
            fontWeight: "bold", 
            color: "red" 
        }
    };
    
    return StyleSheet.create(body);
}