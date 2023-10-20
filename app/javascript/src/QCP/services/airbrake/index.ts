// Set Airbrake configuration for embedded-qcp project

import { Notifier } from "@airbrake/browser";
import { getEnvironment } from "@utils/env";

// https://simplybusiness.airbrake.io/projects/512949/edit#tab-access
const projectId = 512949;
const projectKey = "4e25197d8faea61c10fbb97702200780";

export const airbrake = new Notifier({
  projectId: +projectId,
  projectKey,
  environment: getEnvironment(),
});
