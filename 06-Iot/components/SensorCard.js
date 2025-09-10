import React, { memo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

const SensorCard = (props) => {
  const styles = createStyles(useTheme());
  const progress =
    props.current !== null && props.min !== null && props.max !== null
      ? Math.min(
          Math.max(((props.current - props.min) / (props.max - props.min)) * 100, 0),
          100
        ) // Garante que o progresso esteja entre 0% e 100%
      : 0;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.icon}>
          <Text style={styles.iconText}>{props.icon}</Text>
        </View>
        <Text style={styles.cardTitle}>{props.title}</Text>
      </View>
      <View style={styles.valueDisplay}>
        <Text style={styles.value}>
          {props.value !== null ? props.value.toFixed(1) : "--"}
        </Text>
        <Text style={styles.unit}>{props.unit}</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Mínima</Text>
          <Text style={styles.statValue}>
            {props.min !== null
              ? `${props.min.toFixed(1)}${props.unit}`
              : `--${props.unit}`}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Máxima</Text>
          <Text style={styles.statValue}>
            {props.max !== null
              ? `${props.max.toFixed(1)}${props.unit}`
              : `--${props.unit}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.card,
      borderColor: theme.border,
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      marginTop: 16,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    icon: {
      backgroundColor: theme.iconBg,
      borderRadius: 25,
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 10,
    },
    iconText: {
      fontWeight: "bold",
      fontSize: 25,
      color: theme.text,
    },
    cardTitle: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 20,
    },
    valueDisplay: {
      flexDirection: "row",
      alignItems: "baseline",
      marginBottom: 10,
      backgroundColor: "#44cee3",
      borderRadius:15,
      justifyContent:"center",
    },
    value: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 32,
    },
    unit: {
      color: theme.text,
      fontWeight: "bold",
      fontSize: 18,
      marginLeft: 5,
    },
    progressBar: {
      height: 10,
      backgroundColor: theme.progressBarBg,
      borderRadius: 5,
      overflow: "hidden",
      marginTop: 10,
    },
    progressFill: {
      height: "100%",
      backgroundColor: theme.progressBarFill,
    },
    stats: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    stat: {
      alignItems: "center",
    },
    statLabel: {
      color: theme.label,
      fontSize: 14,
    },
    statValue: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });


export default memo(SensorCard);
