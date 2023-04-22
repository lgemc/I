import { Result, err, ok } from "neverthrow";
import nunjucks from "nunjucks";

function renderString(input: {
  template: string;
  context: any;
}): Result<string, Error> {
  try {
    const response = nunjucks.renderString(input.template, input.context);

    return ok(response);
  } catch (e) {
    return err(e);
  }
}

const templates = {
  renderString,
};

export default templates;
