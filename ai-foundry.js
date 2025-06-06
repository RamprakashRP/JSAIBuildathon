import ModelClient from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import dotenv from 'dotenv';

dotenv.config();

  const client = new ModelClient(
  process.env.AZURE_INFERENCE_SDK_ENDPOINT ?? "https://rampr-mbkvv9bo-eastus2.services.ai.azure.com/models", new AzureKeyCredential(process.env.AZURE_INFERENCE_SDK_KEY ?? "EGGDtXsW6iGerhFLzDiO4ScJuR0PXcxzosZqeHJlbzheYnjvQfHbJQQJ99BFACHYHv6XJ3w3AAAAACOGj86W"));

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
      model: "gpt-4o-mini",
  },
});

console.log(JSON.stringify(response));
