import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { DeduplicateFunctionDefinition } from "../functions/dedup.ts";

export const DeduplicateWorkflow = DefineWorkflow({
  callback_id: "dedup",
  title: "Deduplicate",
  input_parameters: {
    required: ["message"],
    properties: {
      message: {
        type: Schema.types.object,
        description: "message",
      },
    },
  },
});

DeduplicateWorkflow.addStep(DeduplicateFunctionDefinition, {
  message: DeduplicateWorkflow.inputs.message,
});
