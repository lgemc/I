import { Command } from "commander";
import buildOpenAI from "./openai";

const command = new Command();

command
  .name("i")
  .description("i client")
  .version("0.0.1")
  .addCommand(buildOpenAI());

export default command;
