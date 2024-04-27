import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import { getFunctions, httpsCallable } from "firebase/functions";
import { useFunds } from "../context/FundContext";

interface Props {
  handleFundSelect: (fundId: string) => void;
}
export const FundsOverview: React.FC<Props> = ({ handleFundSelect }) => {
  const {
    adminFunds,
    loadingAdminFunds,
    errorAdminFunds,
    // refetchAdminFunds,
    memberFunds,
    loadingMemberFunds,
    errorMemberFunds,
  } = useFunds();
  const [fundName, setFundName] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  const createFund = useCallback(async () => {
    // TODO: trim() and other client side cleanup
    // TODO: remove any special chars?
    if (!fundName || fundName.length < 5 || fundName.length > 16) {
      Alert.alert(
        "Validation Error",
        "Fund name must be between 5 and 16 characters."
      );
      return;
    }
    setLoadingCreate(true);

    const functions = getFunctions(); // Get a Functions instance
    const createFundCallable = httpsCallable(functions, "createFund");

    console.log("creating fund", fundName);
    try {
      const result = await createFundCallable({ name: fundName });
      Alert.alert(
        "Success",
        `Fund created with ID: ${(result.data as any).fundId}`
      );
      setFundName("");
      // refetchAdminFunds();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", (error as any).message || "Could not create fund.");
    } finally {
      setLoadingCreate(false);
    }
  }, [fundName]);

  const onChangeText = (name: string) => {
    setFundName(name);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.componentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter fund name (5-16 chars)"
          value={fundName}
          onChangeText={onChangeText}
          editable={!loadingCreate}
          spellCheck={false}
        />
        <Button
          title={loadingCreate ? "Creating..." : "Create New Fund"}
          onPress={createFund}
          disabled={
            fundName.length < 5 || fundName.length > 16 || loadingCreate
          }
        />
        {loadingAdminFunds || loadingMemberFunds ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <>
            <Text style={styles.header}>Admin Funds</Text>
            <Text>{errorAdminFunds ? errorAdminFunds.message : ""}</Text>
            {adminFunds?.length ? (
              adminFunds.map((fund: any) => (
                <Pressable
                  key={fund.id}
                  style={styles.button}
                  onPress={() => handleFundSelect(fund.id)}
                >
                  <Text style={styles.buttonText}>{fund.name}</Text>
                </Pressable>
              ))
            ) : (
              <Text>No funds found as Admin.</Text>
            )}

            <Text style={styles.header}>Member Funds</Text>

            <Text>{errorMemberFunds ? errorMemberFunds.message : ""}</Text>
            {memberFunds?.length ? (
              memberFunds.map((fund: any) => (
                <Pressable
                  key={fund.id}
                  style={styles.button}
                  onPress={() => handleFundSelect(fund.id)}
                >
                  <Text style={styles.buttonText}>{fund.name}</Text>
                </Pressable>
              ))
            ) : (
              <Text>No funds found as Member.</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 20,
  },
  componentContainer: {
    width: "90%",
  },
  button: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 5,
    backgroundColor: "white",
    alignItems: "center",
  },
  buttonText: {
    color: "#007BFF",
    fontSize: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  loader: {
    marginTop: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
