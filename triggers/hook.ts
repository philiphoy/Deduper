import { Trigger } from "deno-slack-api/types.ts";
import { DeduplicateWorkflow } from "../workflows/dedup_workflow.ts";
import { TriggerTypes } from "deno-slack-api/mod.ts";

const trigger: Trigger<typeof DeduplicateWorkflow.definition> = {
  type: TriggerTypes.Webhook,
  name: "alert",
  description: "deduplicates messages",
  // "myWorkflow" must be a valid callback_id of a workflow
  workflow: "#/workflows/dedup",
  inputs: {
    message: {
      value: "{{data}}",
    },
  },
};

export default trigger;
