import context from "@i/core/context";
import { LogLevel } from "@i/shared/logger/types";
import { Models } from "@i/shared/openai/Models";
import { Roles } from "@i/shared/openai/Roles";
import openai from "@i/shared/openai/lib";
import { createChatCompletionResponse } from "@i/shared/openai/prettify/tables/tables";
import { Command } from "commander";
import { log } from "console";

const createChatCompletion = new Command()
  .name("create-chat-completion")
  .requiredOption("-m, --model <string>", "Model to use")
  .requiredOption("-p, --prompt <string>", "Prompt to use")
  .action(async ({ prompt, model }) => {
    const response = await openai.createChatCompletion(context.Background(), {
      model: model,
      messages: [
        {
          content: prompt,
          role: Roles.User,
        },
      ],
    });
    if (response.isErr()) {
      log({
        event: "error_response_arrived",
        level: LogLevel.Error,
        data: {
          message: response.error.message,
          data: response.error.response?.data,
        },
      });

      return;
    }

    console.log(createChatCompletionResponse(response.value));
  });

export default createChatCompletion;
