import React, {memo}  from 'react'
import { StyleSheet, Text, View, useColorScheme } from 'react-native';

const lightTheme = {
  background: "#f0f0f0"
}
const darkTheme = {
   background: "#121212"

}

const SensorCard = (props) => {
  const scheme = useColorScheme();
   const theme = scheme === "dark"? darkTheme : lightTheme;
  const styles = createStyles(theme);

  return(
<View>
    <Text style={{color: "#FFF"}}>Funcionou? {props.funcionou}</Text>                                                                                                  
</View>
  )

};
const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
    justifyContent: 'center',
  },})
export default memo(SensorCard)