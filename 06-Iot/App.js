import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import SensorCard from './components/SensorCard';

export default function App() {
  const [refreshing, setRefreshing] = useState(false);
const [isConnected, setIsConnected] = useState(false);
  
  const onRefresh = () =>{

  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <ScrollView contentContainerStyle={[styles.scrollContainer, {paddingTop:70}]}
      refreshControl={
        <RefreshControl
        refreshing = {refreshing}
        onRefresh = {onRefresh}
        tintColor={"#8faaff"}
        />
      }
      showsVerticalScrollIndicator={false}
      ></ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🌡️ Dashboard IoT</Text>
        <View style={[styles.connectionStatus, {marginTop:10}]}>
          <Text style={styles.connectionText}>
            {isConnected ? "🟢Conectado": "🔴Desconectado"}
          </Text>
        </View>
          <SensorCard funcionou={'Sim'}/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

});

