import { Command } from "commander";
import listModels from "./list-models";
import createChatCompletion from "./create-chat-completion";

export default function build() {
  const command = new Command();

  command
    .name("openai")
    .addCommand(listModels)
    .addCommand(createChatCompletion);
  return command;
}
