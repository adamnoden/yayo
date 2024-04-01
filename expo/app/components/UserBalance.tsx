import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { MOCK_USER_ID } from "../../constants";
import { fetchUserAccountBalance } from "../../services/user-service";

interface Props {
  tradeEventNonce: number;
}
const UserBalance: React.FC<Props> = ({ tradeEventNonce }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getBalance = async () => {
    setLoading(true);
    try {
      const response = await fetchUserAccountBalance(MOCK_USER_ID);
      setBalance(response.balance.toFixed(2));
    } catch (error) {
      Alert.alert("Error", "Failed to fetch account balance");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBalance();
  }, [tradeEventNonce]);

  return (
    <View style={styles.container}>
      <Text style={styles.balanceText}>
        {loading ? "Loading..." : `Balance: $${balance}`}
      </Text>
      <Button title="Refresh Balance" onPress={getBalance} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  balanceText: {
    // fontSize: 20,
    // marginBottom: 20,
  },
});

export default UserBalance;
