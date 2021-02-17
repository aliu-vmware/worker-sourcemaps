import TestWorker from "./TestWorker.worker";
import { wrap, proxy, releaseProxy, transfer, createEndpoint } from "comlink";

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

window.uiVersion = __COMMIT_HASH__;

window.addEventListener("load", () => {
    console.log("initialized");
    main();
});