import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { STOCK_LIST } from "../../constants/stock-list";

const transformedStockList = STOCK_LIST.map((stock) => ({
  label: `${stock.name} (${stock.ticker})`,
  value: stock.ticker,
}));

interface Props {
  onChange: (ticker: string) => void;
}
export const StockPicker: React.FC<Props> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(transformedStockList);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        searchable={true}
        searchPlaceholder="Search..."
        placeholder="Select a stock"
        onChangeValue={(value) => {
          console.log("Selected stock ticker:", value);
          if (value) {
            onChange(value);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // paddingTop: 50, // Adjust based on your screen layout
  },
});
