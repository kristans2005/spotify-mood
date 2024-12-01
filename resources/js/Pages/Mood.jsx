export default function Mood() {
    const moodData = [
        {
            name: "Happy",
            emoji: "😊",
            energy: 0.8,
            intensity: 0.7,
            genres: ["pop", "dance", "happy", "party"]
        },
        {
            name: "Sad",
            emoji: "😢",
            energy: 0.3,
            intensity: 0.8,
            genres: ["acoustic", "piano", "indie", "folk"]
        },
        {
            name: "Neutral",
            emoji: "😐",
            energy: 0.5,
            intensity: 0.3,
            genres: ["ambient", "classical", "jazz", "study"]
        },
        {
            name: "Angry",
            emoji: "😠",
            energy: 0.9,
            intensity: 0.9,
            genres: ["metal", "rock", "punk", "hardcore"]
        },
        {
            name: "Surprised",
            emoji: "😲",
            energy: 0.7,
            genres: ["electronic", "edm", "dance", "house"]
        },
        {
            name: "Disgusted",
            emoji: "🤢",
            energy: 0.6,
            intensity: 0.7,
            genres: ["metal", "heavy-metal", "industrial", "rock"]
        },
        {
            name: "Fear",
            emoji: "😨",
            energy: 0.8,
            intensity: 0.9,
            genres: ["ambient", "industrial", "electronic", "metal"]
        }
    ];
    return moodData;
}