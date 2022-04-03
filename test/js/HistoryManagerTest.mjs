import assert from 'assert';
import HistoryManager from "../../src/js/HistoryManager.mjs";

describe("HistoryManager", function() {

    const testRootDir = "test/snapshots/";

    describe("#getHistory", function() {

        const MISSING_INSTANCE = 11;
        const EMPTY_INSTANCE = 10;
        const EMPTY_HISTORY = {
            "start": "2022-03-24T10:01:50.085-04:00",
            "base": {},
            "current": {},
            "snapshots": [],
            "undo": [],
            "instance": 10,
            "currentTime": "2022-03-24T10:01:50.085-04:00"
        };

        it("should load history from disk", function() {
            const man = new HistoryManager(testRootDir);
            const history = man.getHistory(EMPTY_INSTANCE);
            assert.notEqual(history, null, "Should not be null or undefined.");
            assert.deepStrictEqual(history, EMPTY_HISTORY);
        });

        it("should return history that was loaded previously", function() {
            const man = new HistoryManager(testRootDir);
            const history = man.getHistory(EMPTY_INSTANCE);
            assert.notEqual(history, null, "Should not be null or undefined.");
            assert.deepStrictEqual(history, EMPTY_HISTORY);

            const historyAgain = man.getHistory(EMPTY_INSTANCE);
            assert.notEqual(historyAgain, null, "Should not be null or undefined.");
            assert.deepStrictEqual(historyAgain, EMPTY_HISTORY);
        });

        it("should throw an exception if no history", function() {
            const man = new HistoryManager(testRootDir);
            assert.throws(
                () => man.getHistory(MISSING_INSTANCE),
                /Failed to load history for 11. Cause: Could not find 'test\/snapshots\/11\/history.json'/
            );
        });
    });
});