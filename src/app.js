import TestWorker from "./TestWorker.worker";
import { wrap, proxy, releaseProxy, transfer, createEndpoint } from "comlink";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";

Sentry.init({
  dsn: "https://77d51ee5aad14e9ebbc81fa6aa82381d@o448817.ingest.sentry.io/5640392",
  release: __COMMIT_HASH__,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

async function createAsyncWorker() {
  const port = new TestWorker();
  const TestWorkerWrapper = wrap(port);

  const testClass = await new TestWorkerWrapper();

  return { port, testClass };
}

async function main() {
  const {port, testClass: worker} = await createAsyncWorker();
  await worker.run();
  () => console.log("done");
}

console.log("compiled");

window.addEventListener("load", () => {
    console.log("initialized");
    main();
});