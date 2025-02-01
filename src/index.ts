import { fetchTranscript } from "./services/transcriptFetcher";
import { summariseTranscript } from "./services/summariser";
import { analyseSentiment } from "./services/sentimentAnalyser";
import { indexTranscript, searchTranscript } from "./services/searchEngine";
import { logInfo, logError } from "./utils/logger";
import path from "path";

// Parse command-line arguments
const args = process.argv.slice(2);
const videoArgIndex = args.indexOf("--video");
const queryArgIndex = args.indexOf("--query");

const videoUrl: string = videoArgIndex !== -1 ? args[videoArgIndex + 1] || "" : "";
const query: string = queryArgIndex !== -1 ? args[queryArgIndex + 1] || "" : "";

if (!videoUrl) {
    console.error("❌ Error: Please provide a YouTube video URL using --video");
    process.exit(1);
}

async function main() {
    try {
        logInfo("Fetching transcript...");
        const transcriptPath = await fetchTranscript(videoUrl);
        logInfo(`Transcript saved at: ${transcriptPath}`);

        logInfo("Summarising transcript...");
        const summary = await summariseTranscript(transcriptPath);
        logInfo(`Summary:\n${summary}`);

        logInfo("Analysing sentiment...");
        const sentiment = await analyseSentiment(transcriptPath);
        logInfo(`Sentiment Analysis:\n${sentiment}`);

        logInfo("Indexing transcript for search...");
        await indexTranscript(transcriptPath);
        logInfo("Transcript indexed successfully.");

        if (query) {
            logInfo(`Performing search query: '${query}'`);
            const searchResults = await searchTranscript(query);
            logInfo(`Search Results:\n${searchResults.join("\n")}`);
        }
    } catch (error) {
        logError(`❌ Error in main execution: ${error.message}`);
    }
}

main();