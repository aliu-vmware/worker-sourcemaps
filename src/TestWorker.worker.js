import { transfer, expose } from "comlink";

class TestWorker {
    run() {
        console.trace("worker code!");
        myUndefinedFunction();
        return "value";
    }
}

expose(TestWorker);