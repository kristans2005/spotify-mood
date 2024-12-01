export default function Mood() {
    return (
        {
            "mood": {
                "happy": {
                    "energy": 0.8,
                    "intensity": 0.7,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["pop", "dance", "happy", "party"]
                },
                "sad": {
                    "energy": 0.3,
                    "intensity": 0.8,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["acoustic", "piano", "indie", "folk"]
                },
                "neutral": {
                    "energy": 0.5,
                    "intensity": 0.3,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["ambient", "classical", "jazz", "study"]
                },
                "angry": {
                    "energy": 0.9,
                    "intensity": 0.9,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["metal", "rock", "punk", "hardcore"]
                },
                "surprised": {
                    "energy": 0.7,
                    "genres": ["electronic", "edm", "dance", "house"]
                },
                "disgusted": {
                    "energy": 0.6,
                    "intensity": 0.7,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["metal", "heavy-metal", "industrial", "rock"]
                },
                "fear": {
                    "energy": 0.8,
                    "intensity": 0.9,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["ambient", "industrial", "electronic", "metal"]
                }
            },
            "metadata": {
                "version": "1.0",
                "scale": {
                    "energy": "0.0 to 1.0",
                    "intensity": "0.0 to 1.0"
                }
            }
        }
    );
}