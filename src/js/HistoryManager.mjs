import fs from "fs";
import {DateTime} from "luxon";
import structuredClone from "realistic-structured-clone";

export default class HistoryManager {

    #loadedGalaxies = {};
    #rootDir = "/";

    constructor(rootDir = "snapshots/") {
        this.#rootDir = rootDir;
    }

    hasHistory(instance) {
        try {
            let history = this.#loadedGalaxies[instance];
            if(history)
                return true;

            const file = this.#getFilePathForHistory(instance);
            return fs.existsSync(file);
        }
        catch (err) {
            throw "Failed to check if history exists for " + instance + ". Cause: " + err;
        }
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

    /**
     * Given a galaxy data dump from the game, will create a new history file with no snapshot/undo entries.
     *
     * @param payload   Full galactic data dump from the game.
     */
    processNewInstance(payload) {

        if(this.hasHistory(payload.instance)) {
            throw "History file already exists for instance " + payload.instance;
        }

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

    /**
     * Given a system, will check for differences and apply as needed.
     *
     * @param sys   The System to check against.
     * @param instance  The galaxy to check against.
     */
    applySystemUpdate(sys, instance) {
        const history = this.getHistory(instance);
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
            u.type = "system";

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

    /**
     * Checks all the provided sectors against the current state of the galaxy based on the instance
     * provided. Updates sectors if ownership changed.
     *
     * @param sectors   List of sectors to check for differences.
     * @param instance  Integer representing the game instance to check against.
     */
    applySectorsUpdate(sectors, instance) {
        if(!sectors)
            return;

        let history = this.getHistory(instance);

        sectors.forEach(sec => {
            let id = sec.id;
            let curr = this.#getById(history.current.sectors, id);
            if(curr.owner !== sec.owner) {
                sec.type = "sector";
                sec.time = DateTime.now().toISO();
                delete sec.adjacent;
                delete sec.centroid;
                delete sec.points;

                const u = structuredClone(curr);
                u.time = history.currentTime;
                u.type = "sector";

                history.snapshots.push(sec);
                history.undo.push(u);

                curr.owner = sec.owner;
                curr.division = sec.division;

                this.#saveHistoryToDisk(history);
            }
        });
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