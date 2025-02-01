import fs from "fs";
import path from "path";
import { Ollama } from "ollama";

const ollama = new Ollama();
const DATA_DIR = path.join(__dirname, "../../data");

/**
 * Analyses the sentiment of a transcript using a local LLM (Ollama)
 * @param transcriptPath - The path to the transcript file
 * @returns The sentiment analysis result
 */
export async function analyseSentiment(transcriptPath: string): Promise<string> {
    try {
        if (!fs.existsSync(transcriptPath)) {
            throw new Error("Transcript file not found.");
        }
        
        const transcript = fs.readFileSync(transcriptPath, "utf-8");
        
        const response = await ollama.generate({
            model: "mistral",
            prompt: `Analyse the sentiment of the following transcript and provide a summary (positive, negative, neutral) along with reasoning:\n\n${transcript}`
        });
        
        return response.text;
    } catch (error) {
        throw new Error(`Error analysing sentiment: ${error.message}`);
    }
}