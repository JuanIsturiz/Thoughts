const emotions = [
  { value: "contempt", color: "#FFF75E" },
  { value: "fear", color: "#212529" },
  { value: "anger", color: "#EB3C51" },
  { value: "shame", color: "#95A7D0" },
  { value: "surprise", color: "#CCDBFD" },
  { value: "disgust", color: "#ABE69F" },
  { value: "joy", color: "#F4A261" },
  { value: "distress", color: "#B799C9" },
  { value: "interest", color: "#FFAFCC" },
  { value: "guilt", color: "#B08968" },
];

export const indexOfEmotion = (emotion) =>
  emotions.findIndex((e) => e.value === emotion);

export const emotionTextColor = (emotion) =>
  emotion === "fear" ||
  emotion === "shame" ||
  emotion === "disgust" ||
  emotion === "distress" ||
  emotion === "guilt"
    ? "#fff"
    : "#000";

export default emotions;
