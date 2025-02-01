import { ChromaClient } from "chromadb";
import fs from "fs";
import path from "path";
import { Ollama } from "ollama";

const ollama = new Ollama();
const chroma = new ChromaClient();
const DATA_DIR = path.join(__dirname, "../../data");

/**
 * Indexes a transcript for semantic search
 * @param transcriptPath - The path to the transcript file
 */
export async function indexTranscript(transcriptPath: string): Promise<void> {
    try {
        if (!fs.existsSync(transcriptPath)) {
            throw new Error("Transcript file not found.");
        }
        
        const transcript = fs.readFileSync(transcriptPath, "utf-8");
        const response = await ollama.generate({
            model: "bge-m3",
            prompt: `Generate an embedding for the following transcript:\n\n${transcript}`
        });
        
        const embedding = response.text;
        
        await chroma.add({
            collection: "transcripts",
            documents: [transcript],
            metadatas: [{ source: transcriptPath }],
            embeddings: [embedding]
        });
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Error indexing transcript: ${error.message}`);
        } else {
            throw new Error("Error indexing transcript: Unknown error");
        }
    }
}

/**
 * Performs a semantic search on indexed transcripts
 * @param query - The search query
 * @returns Relevant transcript sections
 */
export async function searchTranscript(query: string): Promise<string[]> {
    try {
        const response = await ollama.generate({
            model: "bge-m3",
            prompt: `Generate an embedding for the search query:\n\n${query}`
        });
        
        const queryEmbedding = response.text;
        
        const results = await chroma.query({
            collection: "transcripts",
            queryEmbeddings: [queryEmbedding],
            nResults: 5
        });
        
        return results.documents.flat();
    } catch (error) {
        throw new Error(`Error searching transcripts: ${error.message}`);
    }
}
