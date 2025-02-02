# Semantic Search leveraging YouTube

A local AI-powered YouTube transcript processor that:
- Downloads YouTube transcripts
- Summarises content using Ollama
- Performs sentiment & topic analysis
- Enables semantic search over transcripts

## 🚀 Getting Started

### **1️⃣ Build & Run with Docker**
```sh
docker build -t youtube-transcript-ai .
docker run --rm -it youtube-transcript-ai --video "https://youtu.be/NQ1p57yvQho" --query "What was said about AI?"
```

### **2️⃣ Run Locally (Using Bun)**
```sh
bun install
bun run src/index.ts --video "https://youtu.be/NQ1p57yvQho" --query "What was said about AI?"
```

## 🛠️ Tech Stack
- **Bun + TypeScript**
- **Ollama (Llama 2, Mistral, Phi-2)**
- **FAISS / ChromaDB**
- **yt-dlp / youtube-transcript-api**
- **TensorFlow (as fallback AI model)**

## 📂 Project Structure
```
youtube-transcript-ai/
│── Dockerfile
│── .dockerignore
│── .gitignore
│── README.md
│── LICENSE
│── bun.lock
│── package.json
│── tsconfig.json
│── src/
│   │── index.ts                # Main entry point
│   │── services/
│   │   │── transcriptFetcher.ts # YouTube transcript extraction
│   │   │── summariser.ts        # LLM-based summarisation
│   │   │── sentimentAnalyser.ts # Sentiment & topic extraction
│   │   │── searchEngine.ts      # FAISS/ChromaDB-based search
│   │── utils/
│   │   │── logger.ts            # Simple logging utility
│── data/                        # Store downloaded transcripts (optional)
│── scripts/
│   │── run.sh                   # Helper script to run the project
```

## 🔍 Using Semantic Search

### **Index a Transcript for Search**
```ts
import { indexTranscript } from "./services/searchEngine";
await indexTranscript("./data/sample-transcript.txt");
```

### **Perform a Semantic Search Query**
```ts
import { searchTranscript } from "./services/searchEngine";
const results = await searchTranscript("What was said about AI?");
console.log(results);
```

### **Example Output**
```
Relevant Sections:
1. "Artificial Intelligence is transforming industries..."
2. "AI models like GPT-4 and Mistral are leading innovations..."
3. "One of the key challenges in AI is bias in data..."
```

## 📜 Licence
This project is licensed under the [MIT Licence](LICENSE).
