import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const DeduplicateFunctionDefinition = DefineFunction({
  callback_id: "dedup_function",
  title: "Deduplicate",
  description: "Deduplicate",
  source_file: "functions/dedup.ts",
  input_parameters: {
    properties: {
      message: {
        type: Schema.types.object,
        description: "message",
      },
    },
    required: ["message"],
  },
});

export default SlackFunction(
  DeduplicateFunctionDefinition,
  async ({ inputs, client }) => {
    const { message } = inputs;

    const channel = message["channel"];

    let result;
    try {
      result = await client.conversations.history({
        limit: 1,
        channel: channel,
      });
    } catch {
      await client.conversations.join({
        channel: channel,
      });
      result = await client.conversations.history({
        limit: 1,
        channel: channel,
      });
    }

    const lastMessage = result.messages[0];

    if (lastMessage) {
      const thisMessageContents = message["attachments"];
      const lastMessageContents = lastMessage.attachments;

      if (
        thisMessageContents &&
        lastMessageContents &&
        thisMessageContents.length == lastMessageContents.length
      ) {
        for (let i = 0; i < thisMessageContents.length; i += 1) {
          const thisContents = thisMessageContents[i];
          const lastContents = lastMessageContents[i];
          const sameText = thisContents.text == lastContents.text;
          const timeDiff = Math.abs(thisContents.ts - lastContents.ts);
          console.log(sameText);
          console.log(timeDiff);

          if (sameText && timeDiff < 59) {
            //a duplicate so skip it
            return { outputs: {} };
          }
        }
      }
    }

    await client.chat.postMessage(message);

    return { outputs: {} };
  },
);
