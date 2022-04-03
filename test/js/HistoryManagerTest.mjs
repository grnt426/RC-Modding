import assert from 'assert';
import HistoryManager from "../../src/js/HistoryManager.mjs";
import fs from "fs";
import structuredClone from "realistic-structured-clone";

describe("HistoryManager", function() {

    // HistoryManager instance under test
    let man = undefined;

    const testRootDir = "test/snapshots/";

    // Does not exist on the filesystem
    const MISSING_INSTANCE = 11;

    // Contains the bare minimum to count as a history instance.
    const EMPTY_INSTANCE = 10;
    const EMPTY_INSTANCE_PATH = testRootDir + EMPTY_INSTANCE + "/history.json";
    const EMPTY_HISTORY = {
        "start": "2022-03-24T10:01:50.085-04:00",
        "base": {stellar_systems:[],sectors:[]},
        "current": {stellar_systems:[],sectors:[]},
        "snapshots": [],
        "undo": [],
        "instance": 10,
        "currentTime": "2022-03-24T10:01:50.085-04:00"
    };

    // Creates a simple starting history file with one system in one sector
    const SIMPLE_INSTANCE = 20;
    const SIMPLE_INSTANCE_PATH = testRootDir + SIMPLE_INSTANCE + "/history.json";
    const SIMPLE_SECTOR = {
        "id":0,
        "name":"simple sector",
        "owner":null
    };
    const SIMPLE_SYSTEM = {
        "id": 1,
        "name":"system name",
        "owner":null,
        "sector_id": 0,
        "status":"uninhabited"
    };
    const SIMPLE_HISTORY = {
        "start": "2022-03-24T10:01:50.085-04:00",
        "base": {stellar_systems:[SIMPLE_SYSTEM],sectors:[SIMPLE_SECTOR]},
        "current": {stellar_systems:[SIMPLE_SYSTEM],sectors:[SIMPLE_SECTOR]},
        "snapshots": [],
        "undo": [],
        "instance": 20,
        "currentTime": "2022-03-24T10:01:50.085-04:00"
    };

    beforeEach(function() {

        fs.writeFileSync(EMPTY_INSTANCE_PATH, JSON.stringify(EMPTY_HISTORY), err => {
            if (err) {
                throw err;
            }
        });

        fs.writeFileSync(SIMPLE_INSTANCE_PATH, JSON.stringify(SIMPLE_HISTORY), err => {
            if (err) {
                throw err;
            }
        });

        man = new HistoryManager(testRootDir);
    });

    describe("#getHistory", function() {

        it("should load history from disk", function() {
            const history = man.getHistory(EMPTY_INSTANCE);
            assert.notEqual(history, null, "Should not be null or undefined.");
            assert.deepStrictEqual(history, EMPTY_HISTORY);
        });

        it("should return history that was loaded previously", function() {
            const history = man.getHistory(EMPTY_INSTANCE);
            assert.notEqual(history, null, "Should not be null or undefined.");
            assert.deepStrictEqual(history, EMPTY_HISTORY);

            const historyAgain = man.getHistory(EMPTY_INSTANCE);
            assert.notEqual(historyAgain, null, "Should not be null or undefined.");
            assert.deepStrictEqual(historyAgain, EMPTY_HISTORY);
        });

        it("should throw an exception if no history", function() {
            assert.throws(
                () => man.getHistory(MISSING_INSTANCE),
                /Failed to load history for 11. Cause: Could not find 'test\/snapshots\/11\/history.json'/
            );
        });
    });

    describe("#applySystemUpdate", function() {
        it("should throw an exception if system not in current", function(){
            assert.throws(
                () => man.applySystemUpdate(SIMPLE_SYSTEM, EMPTY_INSTANCE),
                /Null system ID: 1 from instance 10/
            );
        });

        it("should update owner when it changes", function(){
            const newSys = structuredClone(SIMPLE_SYSTEM);
            newSys.owner = "new owner";

            man.applySystemUpdate(newSys, SIMPLE_INSTANCE);
            const res = readAndParse(SIMPLE_INSTANCE_PATH);
            assert.notEqual(res, null, "Should not be null.");
            assert.equal(res.snapshots.length, 1, "Should have a snap record.");
            assert.equal(res.undo.length, 1, "Should have an undo record.");

            assert.strictEqual(res.snapshots[0].owner, newSys.owner, "Owner should be new one");
            assert.strictEqual(res.snapshots[0].type, "system", "Should be system type");

            assert.strictEqual(res.undo[0].owner, SIMPLE_SYSTEM.owner, "Owner should be new previous");
            assert.strictEqual(res.undo[0].type, "system", "Should be system type");

            assert.strictEqual(res.current.stellar_systems[0].owner, newSys.owner,
                "Current state should reflect changes.");
            assert.strictEqual(res.base.stellar_systems[0].owner, null,
                "Base state should still be null.");
        });

        it("should not update with no changes", function(){
            man.applySystemUpdate(SIMPLE_SYSTEM, SIMPLE_INSTANCE);
            const res = readAndParse(SIMPLE_INSTANCE_PATH);
            assert.notEqual(res, null, "Should not be null.");
            assert.equal(res.snapshots.length, 0, "Should not have a snap record.");
            assert.equal(res.undo.length, 0, "Should not have an undo record.");

            assert.strictEqual(res.current.stellar_systems[0].owner, null,
                "Current state should still be null for owner.");
            assert.strictEqual(res.base.stellar_systems[0].owner, null,
                "Base state should still be null.");
        });

        it("should not write unneeded information", function(){
            const newSys = structuredClone(SIMPLE_SYSTEM);
            newSys.position = "not needed";
            newSys.score = "not needed";
            newSys.receivedAt = "not needed";
            newSys.owner = "new owner";

            man.applySystemUpdate(newSys, SIMPLE_INSTANCE);
            const res = readAndParse(SIMPLE_INSTANCE_PATH);
            assert.notEqual(res, null, "Should not be null.");
            assert.equal(res.snapshots.length, 1, "Should have a snap record.");
            assert.equal(res.undo.length, 1, "Should have an undo record.");

            assert.strictEqual(res.snapshots[0].owner, newSys.owner, "Owner should be new one");
            assert.strictEqual(res.undo[0].owner, SIMPLE_SYSTEM.owner, "Owner should be new previous");

            assert.equal(res.current.stellar_systems[0].position, null, "Shouldn't have this.");
            assert.equal(res.current.stellar_systems[0].score, null, "Shouldn't have this.");
            assert.equal(res.current.stellar_systems[0].receivedAt, null, "Shouldn't have this.");
            assert.equal(res.snapshots[0].position, null, "Shouldn't have this.");
            assert.equal(res.snapshots[0].score, null, "Shouldn't have this.");
            assert.equal(res.snapshots[0].receivedAt, null, "Shouldn't have this.");
            assert.equal(res.undo[0].position, null, "Shouldn't have this.");
            assert.equal(res.undo[0].score, null, "Shouldn't have this.");
            assert.equal(res.undo[0].receivedAt, null, "Shouldn't have this.");

            assert.strictEqual(res.current.stellar_systems[0].owner, newSys.owner,
                "Current state should reflect changes.");
            assert.strictEqual(res.base.stellar_systems[0].owner, null,
                "Base state should still be null.");
        });
    });

    describe("#applySectorsUpdate", function() {
        it("should update if sector owner changes", function(){
            const newSec = structuredClone(SIMPLE_SECTOR);
            newSec.owner = "new owner";
            const sectors = [newSec];

            man.applySectorsUpdate(sectors, SIMPLE_INSTANCE);
            const res = readAndParse(SIMPLE_INSTANCE_PATH);

            assert.notEqual(res, null, "History file shouldn't be empty.");
            assert.equal(res.snapshots.length, 1, "Should have a snap record.");
            assert.equal(res.undo.length, 1, "Should have an undo record.");

            assert.strictEqual(res.snapshots[0].owner, newSec.owner, "Owner should update");
            assert.strictEqual(res.undo[0].owner, SIMPLE_SECTOR.owner, "Undo should have previous owner");

            assert.strictEqual(res.snapshots[0].type, "sector", "Should be sector type");
            assert.strictEqual(res.undo[0].type, "sector", "Should be sector type");
        });
    });
});

function readAndParse(file) {
    const res = fs.readFileSync(file, 'utf8');
    assert.notEqual(res, null, "File shouldn't be empty");
    return JSON.parse(res);
}