export type PerformInput = {
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
};

export interface BaseResource {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
  };
}

export interface Endpoint extends BaseResource {
  spec: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body: string;
  };
}

export interface Env extends BaseResource {
  data: Record<string, string>;
}
