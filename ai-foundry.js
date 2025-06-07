import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config();

  const client = new ModelClient(
  process.env.AZURE_INFERENCE_SDK_ENDPOINT ?? "https://jsaibuildathon.services.ai.azure.com/", new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY ?? "30qiZeJcqE6ZOHdiEwm7o6VHtnH8b4oMukGy9idWurMYCOyKZ34VJQQJ99BFAC77bzfXJ3w3AAAAACOGggj2"));

var messages = [
  { role: "system", content: "You are an helpful assistant" },
  { role: "user", content: "What are 3 things to see in Seattle?" },
];

var response = await client.path("chat/completions").post({
  body: {
    messages: messages,
    max_tokens: 4096,
      temperature: 1,
      top_p: 1,
      model: "gpt-4o",
  },
});

console.log(JSON.stringify(response));
