import { TouchableOpacity, View, Text, StatusBar } from "react-native";
import { createStyles, useTheme } from "react-native-buildstrap";
import { customStyles } from "../styles/CustomStyles";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen(){
    const styles = createStyles(); 
    const customStyle = customStyles(); 
    const {toggleTheme, isDark} = useTheme();

    return(
        <View style={[styles.container, styles.bgToggle]}>
            <Text style={[styles.textToggle, styles.mb1, styles.fs1]}>Página Inicial</Text>
            <TouchableOpacity onPress={toggleTheme} style={[styles.bgInfo, styles.px2, styles.py1, styles.rounded1]}>
            {isDark ? <Ionicons name="sunny" size={24} color="white" /> :
            <Ionicons name="moon" size={24} color="white" />
            }
            </TouchableOpacity>
            <Text style={[styles.mt2, customStyle.textCustom]}>Meu estilo próprio</Text>
            <StatusBar barStyle={isDark? "light-content" : "dark-content"}/>
        </View>
    )
}