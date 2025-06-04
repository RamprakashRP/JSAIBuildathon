import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from "dotenv";
dotenv.config();

const token = process.env["GITHUB_TOKEN"];
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "Llama-4-Maverick-17B-128E-Instruct-FP8";

export async function main() {
  console.log("Running main...");

  const client = ModelClient(endpoint, new AzureKeyCredential(token));
  console.log("Client initialized");

  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: "What are the top 10 web technologies to learn?" }
        ],
        temperature: 1.0,
        top_p: 1.0,
        max_tokens: 1000,
        model: modelName
      }
    });

    console.log("Response received");

    if (isUnexpected(response)) {
      throw response.body.error;
    }

    console.log("AI Response:\n", response.body.choices[0].message.content);
  } catch (err) {
    console.error("The sample encountered an error:", err);
  }
}

main();
