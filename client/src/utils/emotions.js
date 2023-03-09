const emotions = [
  { value: "contempt", color: "yellow" },
  { value: "fear", color: "black" },
  { value: "anger", color: "red" },
  { value: "shame", color: "blue" },
  { value: "surprise", color: "lightblue" },
  { value: "disgust", color: "green" },
  { value: "joy", color: "orange" },
  { value: "distress", color: "purple" },
  { value: "interest", color: "pink" },
  { value: "guilt", color: "brown" },
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
