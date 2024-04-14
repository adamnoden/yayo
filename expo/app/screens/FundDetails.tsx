import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useFunds } from "../context/FundContext";

interface Props {
  fundId: string;
  returnToOverView: () => void;
}
export const FundDetails: React.FC<Props> = ({ fundId, returnToOverView }) => {
  const { allFunds } = useFunds();
  const selectedFund = allFunds.find((fund) => fund.id === fundId);

  if (!selectedFund) {
    return (
      <View style={styles.container}>
        <Text>Fund not found. This is.. unexpected</Text>
        <Button title="Go Back" onPress={returnToOverView} />
      </View>
    );
  }

  console.log(selectedFund);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedFund.name}</Text>

      <Button title="Go Back" onPress={returnToOverView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  // Add more styles as needed
});
