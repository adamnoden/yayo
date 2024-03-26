import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="money-bill-transfer" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="funds"
        options={{
          title: "Funds",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name="money-bill-trend-up" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="bank"
        options={{
          title: "Bank",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bank" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Penthouse",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="palm-tree" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rolodex"
        options={{
          title: "Rolodex",
          tabBarIcon: ({ color }) => (
            <AntDesign size={28} name="contacts" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
