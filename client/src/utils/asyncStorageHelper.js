import AsyncStorage from "@react-native-async-storage/async-storage";

export const setAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const getAsyncStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value === null ? null : JSON.parse(value);
  } catch (err) {
    console.log(err.message);
  }
};

export const removeAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.log(err.message);
  }
};
