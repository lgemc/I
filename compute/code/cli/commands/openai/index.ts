import { Command } from "commander";
import listModels from "./list-models";
import createChatCompletion from "./create-chat-completion";

const command = new Command();

command.name("openai").addCommand(listModels).addCommand(createChatCompletion);

export default command;
