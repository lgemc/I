import { CreateChatCompletionResponse, ListModelsResponse } from "openai";
import AsciiTable from "ascii-table";
import wrap from "wordwrap";

const wrapper = wrap(80);

export function listModelsResponse(response: ListModelsResponse): string {
  const table = new AsciiTable("Models");
  table.setHeading("id", "name");

  for (let r of response.data) {
    table.addRow(r.id, r.object);
  }

  return table.toString();
}

export function createChatCompletionResponse(
  response: CreateChatCompletionResponse
): string {
  if (!(response.choices?.length > 0)) {
    return "No response found";
  }

  let result = "";
  for (let r of response.choices) {
    const role = r.message?.role;
    const pretty = wrapper(r.message?.content);

    result += "🤖 " + role + "\n" + pretty;
  }

  return result;
}
