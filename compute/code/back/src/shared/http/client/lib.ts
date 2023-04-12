import { Result, err, ok } from "neverthrow";

export function $fetch<T>(
  input: string | Request,
  init?: RequestInit
): Promise<Result<T, Error>> {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then((response) => {
        if (!response.ok) {
          reject(err(new Error(response.statusText)));
        }

        resolve(ok(response.json() as any));
      })
      .catch((e) => {
        resolve(err(e));
      });
  });
}

const client = {
  fetch: $fetch,
};

export default client;
