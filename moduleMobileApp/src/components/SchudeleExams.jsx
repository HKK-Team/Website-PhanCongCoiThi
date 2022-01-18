import React, { useEffect } from "react";
import { useState } from "react";
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SchudeleExams() {
  const [user, SetUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const email = await AsyncStorage.getItem('UserEmail');
      SetUser(email);
    }
    getUser();
  }, [user]);
  return <Text>{user}</Text>;
}
