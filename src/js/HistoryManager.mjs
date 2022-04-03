import fs from "fs";
import {DateTime} from "luxon";
import structuredClone from "realistic-structured-clone";

export default class HistoryManager {

    #loadedGalaxies = {};
    #rootDir = "/";

    constructor(rootDir = "snapshots/") {
        this.#rootDir = rootDir;
    }

    getHistory(instance) {
        try {
            let history = this.#loadedGalaxies[instance];
            if(!history) {
                const file = this.#getFilePathForHistory(instance);

                if(!fs.existsSync(file)) {
                    throw "Could not find '" + file + "'";
                }

                history = JSON.parse(fs.readFileSync(file, 'utf8'));
                this.#loadedGalaxies[instance] = history;
            }

            return history;
        }
        catch (err) {
            throw "Failed to load history for " + instance + ". Cause: " + err;
        }
    }

    processNewInstance(payload) {
        const file = this.#getFilePathForHistory(payload.instance);
        const historyData = {
            start:DateTime.now().toISO(), base:payload.data,
            current:structuredClone(payload.data), snapshots: [], undo: [], instance:payload.instance,
            currentTime:DateTime.now().toISO()
        }

        fs.writeFile(file, JSON.stringify(historyData), err => {
            if (err) {
                throw err;
            }
        });
    }

    applySystemUpdate(sys, instance) {
        const history = this.fetchHistory(instance);
        sys.type = "system";
        const curState = history.current;
        const storedSys = this.#getById(curState.stellar_systems, sys.id);

        if(storedSys === null) {
            throw "Null system ID: " + sys.id + " from instance " + instance;
        }

        if(storedSys.owner !== sys.owner || storedSys.status !== sys.status) {

            // Create a snapshot that allows us to undo this step
            const u = structuredClone(storedSys);
            delete u.position;
            delete u.score;
            delete u.receivedAt;
            u.time = history.currentTime;

            // Clean up the current snapshot
            sys.time = DateTime.now().toISO();
            delete sys.position;
            delete sys.score;
            delete sys.receivedAt;

            // Build the forwards/backwards snapshots
            history.undo.push(u);
            history.snapshots.push(sys);

            // Update the stored current state of the galaxy
            storedSys.owner = sys.owner;
            storedSys.faction = sys.faction;
            storedSys.status = sys.status;
            history.currentTime = sys.time;

            this.#saveHistoryToDisk(history);
        }
    }

    #getFilePathForHistory(instance) {
        return this.#rootDir + instance + "/history.json";
    }

    #getById(list, id) {
        let res = null;
        list.forEach(e => {
            if(e.id === id)
                res = e;
        });

        return res;
    }

    #saveHistoryToDisk(history) {
        fs.writeFileSync(this.#getFilePathForHistory(history.instance), JSON.stringify(history), err => {
            if(err) {
                throw "[CRITICAL] FAILED TO SAVE HISTORY UPDATE: " + err;
            }
        });
    }
}