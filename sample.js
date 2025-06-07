import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import fs from "fs";
import path from "path";
import sharp from "sharp"; // Ensure sharp is installed: npm install sharp

const token = process.env["GITHUB_TOKEN"]; 
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "Llama-4-Maverick-17B-128E-Instruct-FP8"; 

// Function to resize and encode image in PNG format
async function encodeImage(imagePath) {
    const resizedBuffer = await sharp(imagePath)    
        .resize(200, 150) // Reduce dimensions
        .png({ quality: 30 }) // Convert to PNG for better compatibility
        .toBuffer();
    return resizedBuffer.toString("base64");
}

async function sendTextPrompt(client) {
    return await client.path("/chat/completions").post({
        headers: { "x-ms-model-mesh-model-name": modelName },
        body: {
            model: modelName,
            messages: [
                { role: "system", content: "Create web pages." },
                { role: "user", content: [{ type: "text", text: "Generate HTML & CSS." }] },
            ],
        },
    });
}

async function sendImageRequest(client, base64Image) {
    return await client.path("/chat/completions").post({
        headers: { "x-ms-model-mesh-model-name": modelName },
        body: {
            model: modelName,
            messages: [
                { role: "user", content: [{ type: "image_url", url: `data:image/png;base64,${base64Image}` }] },
            ],
        },
    });
}

async function generateWebPageFromImage(imagePath) {
    const client = ModelClient(endpoint, new AzureKeyCredential(token));
    const base64Image = await encodeImage(imagePath);

    const textResponse = await sendTextPrompt(client);
    console.log("Text Response:", textResponse.body);

    const imageResponse = await sendImageRequest(client, base64Image);
    console.log("Image Response:", imageResponse.body);
}

// Example usage
const imagePath = path.join(process.cwd(), "contoso_layout_sketch.jpg"); // Change to PNG if needed
generateWebPageFromImage(imagePath).catch(console.error);