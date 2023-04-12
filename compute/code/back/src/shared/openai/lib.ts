import {
  CreateChatCompletionRequest,
  CreateChatCompletionResponse,
  OpenAIApi,
} from "openai";
import env from "../env/lib";
import { Vars } from "@i/shared/env/Vars";
import { Result, err, ok } from "neverthrow";
import { AxiosError, AxiosResponse } from "axios";
import { Context } from "@i/core/context";

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

async function listModels(): Promise<Result<any, AxiosError>> {
  try {
    const response = await $openai.listModels({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.string(Vars.OPENAI_API_KEY)}`,
      },
    });
    return ok(response);
  } catch (e) {
    return err(e);
  }
}

async function createChatCompletion(
  ctx: Context,
  input: CreateChatCompletionRequest
): Promise<Result<CreateChatCompletionResponse, AxiosError>> {
  try {
    const response = await $openai.createChatCompletion(input, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.string(Vars.OPENAI_API_KEY)}`,
      },
    });

    return ok(response.data);
  } catch (e) {
    return err(e);
  }
}

init();

const openai = {
  init,
  listModels,
  createChatCompletion,
};

export default openai;
