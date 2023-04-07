import { Command } from "commander";
import openai from "./openai";
import back from "./back";
import front from "./front";

const command = new Command();

command
  .name("i")
  .description("i client")
  .version("0.0.1")
  .addCommand(openai)
  .addCommand(back)
  .addCommand(front);

export default command;
