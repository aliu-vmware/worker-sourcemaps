import TestWorker from "./TestWorker.worker";
import { wrap, proxy, releaseProxy, transfer, createEndpoint } from "comlink";

async createAsyncWorker() {
  const port = new TestWorker();
  const TestWorkerWrapper = wrap(port);

  const testClass = await new TestWorkerWrapper();

  return { port, testClass };
}

window.addEventListener("load", async () => {
  worker = await createAsyncWorker();
  worker.run().then(() => console.log("done"));
});