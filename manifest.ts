import { Manifest } from "deno-slack-sdk/mod.ts";
import { DeduplicateWorkflow } from "./workflows/dedup_workflow.ts";
import { DeduplicateFunctionDefinition } from "./functions/dedup.ts";
/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "Deduper",
  description: "Deduplicate Slack alerts",
  icon: "assets/default_new_app_icon.png",
  functions: [DeduplicateFunctionDefinition],
  workflows: [DeduplicateWorkflow],
  outgoingDomains: [],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "channels:history",
    "im:history",
    "groups:history",
    "channels:join",
  ],
});
