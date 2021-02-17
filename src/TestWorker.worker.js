import { transfer, expose } from "comlink";

class TestWorker {
    run() {
        console.trace("worker code!");
        return "value";
    }
}

expose(TestWorker);