export type Message = {
  message_id: string;
  from: string;
  to: string;
  type: "text";
  text?: {
    body: string;
  };
};

export type CreateInput = {
  type: "text";
  from: string;
  to: string;
  text?: {
    body: string;
  };
};
