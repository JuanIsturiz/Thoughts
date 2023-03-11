const emotions = [
  {
    value: "contempt",
    color: "#FFF75E",
    emoji: String.fromCodePoint("0x1F603"),
  },
  { value: "fear", color: "#212529", emoji: String.fromCodePoint("0x1F616") },
  { value: "anger", color: "#EB3C51", emoji: String.fromCodePoint("0x1F621") },
  { value: "shame", color: "#95A7D0", emoji: String.fromCodePoint("0x1F614") },
  {
    value: "surprise",
    color: "#CCDBFD",
    emoji: String.fromCodePoint("0x1F62E"),
  },
  {
    value: "disgust",
    color: "#ABE69F",
    emoji: String.fromCodePoint("0x1F922"),
  },
  { value: "joy", color: "#F4A261", emoji: String.fromCodePoint("0x1F60A") },
  {
    value: "distress",
    color: "#B799C9",
    emoji: String.fromCodePoint("0x1F612"),
  },
  {
    value: "interest",
    color: "#FFAFCC",
    emoji: String.fromCodePoint("0x1F914"),
  },
  { value: "guilt", color: "#B08968", emoji: String.fromCodePoint("0x1F613") },
];

export const indexOfEmotion = (emotion) =>
  emotions.findIndex((e) => e.value === emotion);

export const emotionTextColor = (emotion) =>
  emotion === "fear" ? "#fff" : "#000";

export default emotions;
