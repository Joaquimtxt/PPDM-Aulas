import { useColorScheme } from "react-native"
import { darkTheme } from "../themes/dark";
import { lightTheme } from "../themes/light";

export const useTheme =()=>{
const scheme = useColorScheme();
return scheme === "dark"? darkTheme : lightTheme;

}