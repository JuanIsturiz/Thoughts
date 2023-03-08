import React from "react";
import { Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/AuthSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  return <Button onPress={() => dispatch(logout())} title="Logout" />;
};

export default LogoutButton;
