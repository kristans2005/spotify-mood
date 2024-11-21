export default function Mood() {
    return (
        {
            "mood": {
                "happy": {
                    "energy": 0.8,
                    "intensity": 0.7,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["pop", "dance", "happy", "disco", "funk"]
                },
                "sad": {
                    "energy": 0.3,
                    "intensity": 0.8,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["acoustic", "piano", "sad", "indie", "folk"]
                },
                "neutral": {
                    "energy": 0.5,
                    "intensity": 0.3,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["ambient", "chill", "study", "classical", "jazz"]
                },
                "angry": {
                    "energy": 0.9,
                    "intensity": 0.9,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["metal", "rock", "punk", "hardcore", "industrial"]
                },
                "surprised": {
                    "energy": 0.7,
                    "genres": ["electronic", "dubstep", "edm", "dance", "pop"]
                },
                "disgusted": {
                    "energy": 0.6,
                    "intensity": 0.7,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["death-metal", "black-metal", "grindcore", "doom-metal", "sludge"]
                },
                "fear": {
                    "energy": 0.8,
                    "intensity": 0.9,
                    "timestamp": "2024-03-21T10:30:00Z",
                    "genres": ["dark-ambient", "industrial-metal", "gothic-metal", "horror-synth", "darkwave"]
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