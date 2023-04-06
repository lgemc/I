import { log } from "@cli/logger";
import { LogLevel } from "@i/shared/logger/types";
import openai from "@i/shared/openai/lib";
import { listModelsResponse } from "@i/shared/openai/prettify/tables/tables";
import { Command } from "commander";

const listModels = new Command().name("list-models").action(async () => {
  const response = await openai.listModels();
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

  const pretty = listModelsResponse(response.value.data);

  console.log(pretty);
});

export default listModels;
