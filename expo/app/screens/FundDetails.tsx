import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useFunds } from "../context/FundContext";
import { useUserData } from "../context/UserDataContext";
import { CapitalAllocationForm } from "../components/CapitalAllocationForm";

interface Props {
  fundId: string;
  returnToOverView: () => void;
}
export const FundDetails: React.FC<Props> = ({ fundId, returnToOverView }) => {
  const { allFunds } = useFunds();
  const selectedFund = allFunds.find((fund) => fund.id === fundId);
  const { uid } = useUserData();

  if (!selectedFund) {
    return (
      <View style={styles.container}>
        <Text>Fund not found. This is.. unexpected</Text>
        <Button title="Go Back" onPress={returnToOverView} />
      </View>
    );
  }

  const userAllocation = selectedFund.capitalAllocations.find(
    (x) => x.uid === uid
  );

  console.log(selectedFund);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedFund.name}</Text>

      {!userAllocation ?? (
        <View style={styles.allocationForm}>
          <CapitalAllocationForm
            fundLevel={selectedFund.level}
            fundId={selectedFund.id}
          />
        </View>
      )}

      {selectedFund.capitalAllocations.length > 0 ? (
        <View style={styles.allocations}>
          {/* TODO: sort with user alloc at top */}
          {selectedFund.capitalAllocations.map((x) => {
            return (
              <Text>
                {x.uid.slice(0, 4)} - {x.stockSymbol} - {x.buyPrice}
              </Text>
            );
          })}
        </View>
      ) : (
        <View>
          <Text>Nobody has allocated</Text>
        </View>
      )}

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
  allocations: {
    borderColor: "#aaa",
    borderWidth: 1,
  },
  allocationForm: {
    borderColor: "green",
    borderWidth: 1,
    marginBottom: 20,
  },
  // Add more styles as needed
});
