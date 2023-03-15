import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { update } from "../redux/slices/AuthSlice";
import { useTheme } from "@react-navigation/native";

const Editable = ({
  title,
  input,
  initValue,
  value,
  setValue,
  placeHolder,
  edit,
  setEdit,
  user,
  trim,
}) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  const onConfirm = async () => {
    if (!value) return;
    if (input === "email") {
      const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (!reg.test(value)) {
        alert("Email is Not Valid");
        return;
      }
    }
    await dispatch(
      update({
        userId: user.id,
        token: user.token,
        changes: {
          [input]: value.trim(),
        },
      })
    );
    trim();
    setEdit(false);
  };

  const onCancel = () => {
    setValue(initValue);
    setEdit(false);
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.font }]}>{title}</Text>
      {!edit ? (
        <View style={[styles.innerView, { borderColor: colors.lightBorder }]}>
          <Text style={{ fontSize: 22, color: colors.font }}>{value}</Text>
          <TouchableOpacity onPress={() => setEdit(true)}>
            <MaterialIcons name="edit" size={24} color={colors.lightblue} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.innerView}>
          <TextInput
            style={{
              color: colors.font,
              fontSize: 22,
            }}
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder={placeHolder}
            placeholderTextColor={colors.ph}
          />
          <View style={{ flexDirection: "row", gap: 5 }}>
            <TouchableOpacity onPress={onConfirm}>
              <MaterialIcons name="check" size={24} color={colors.lightblue} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <MaterialIcons
                name="edit-off"
                size={24}
                color={colors.lightblue}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: "flex-start",
  },
  title: {
    fontSize: 24,
    textTransform: "capitalize",
    marginLeft: 5,
    marginBottom: 5,
  },
  innerView: {
    width: 350,
    padding: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Editable;
