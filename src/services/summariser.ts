import fs from "fs";
import path from "path";
import { Ollama } from "ollama";

const ollama = new Ollama();
const DATA_DIR = path.join(__dirname, "../../data");

/**
 * Summarises a transcript using a local LLM (Ollama)
 * @param transcriptPath - The path to the transcript file
 * @returns The summarised text
 */
export async function summariseTranscript(transcriptPath: string): Promise<string> {
    try {
        if (!fs.existsSync(transcriptPath)) {
            throw new Error("Transcript file not found.");
        }
        
        const transcript = fs.readFileSync(transcriptPath, "utf-8");
        
        const response = await ollama.generate({
            model: "mistral",
            prompt: `Summarise the following transcript:\n\n${transcript}`
        });
        
        return response.text;
    } catch (error) {
        throw new Error(`Error summarising transcript: ${error.message}`);
    }
}