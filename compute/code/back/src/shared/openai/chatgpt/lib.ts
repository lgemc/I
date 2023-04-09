import { Vars } from "@i/shared/env/Vars";
import env from "@i/shared/env/lib";
import { ChatGPTAPI, ChatMessage, SendMessageOptions } from "chatgpt";
import { Result, err, ok } from "neverthrow";

const api = new ChatGPTAPI({
  apiKey: env.string(Vars.OPENAI_API_KEY),
});

async function sendMessage({
  message,
  options,
}: {
  message: string;
  options?: SendMessageOptions;
}): Promise<Result<ChatMessage, Error>> {
  try {
    const res = await api.sendMessage(message, options);
    return ok(res);
  } catch (e) {
    return err(e);
  }
}

const lib = {
  sendMessage,
};

export default lib;
