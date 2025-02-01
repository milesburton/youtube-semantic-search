import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";

const execPromise = promisify(exec);
const DATA_DIR = path.join(__dirname, "../../data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Fetches a YouTube transcript using yt-dlp
 * @param videoUrl - The URL of the YouTube video
 * @returns The path to the downloaded transcript
 */
export async function fetchTranscript(videoUrl: string): Promise<string> {
    try {
        const transcriptFile = path.join(DATA_DIR, "transcript.txt");
        
        const command = `yt-dlp --write-auto-sub --skip-download --sub-lang en --output "${transcriptFile}" "${videoUrl}"`;
        
        await execPromise(command);
        
        if (!fs.existsSync(transcriptFile)) {
            throw new Error("Transcript file not found.");
        }
        
        return transcriptFile;
    } catch (error) {
        throw new Error(`Error fetching transcript: ${error.message}`);
    }
}
