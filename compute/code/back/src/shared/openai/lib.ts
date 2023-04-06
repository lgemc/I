import { OpenAIApi } from "openai";
import env from "../env/lib";
import { Vars } from "@i/shared/env/Vars";
import { Result, err } from "neverthrow";

let $openai: OpenAIApi;

function init() {
  if ($openai) {
    return;
  }

  const apiKey = env.string(Vars.OPENAI_API_KEY);
  if (!apiKey) {
    throw new Error("No OpenAI key found");
  }

  /* @ts-ignore */
  $openai = new OpenAIApi({ apiKey });
}

async function listModels(): Promise<Result<any, Error>> {
  try {
    const response = await $openai.listModels();
    response.console.log(response);
  } catch (error) {
    console.log(error);
    return err(error);
  }
}

init();

listModels();
const openai = {
  init,
  listModels,
};

export default openai;
