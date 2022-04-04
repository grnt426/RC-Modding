/**
 * I shouldn't need this file, but I haven't yet isolate where all the errors are coming from, and there
 * are errors from fixed bugs that haven't been corrected. To make this process less annoying, this tool
 * exists to make the process faster and easier to work with.
 */

import * as fs from "fs";
import {DateTime} from "luxon";
import structuredClone from 'realistic-structured-clone';
import prompt from 'prompt';
import HistoryManager from "./src/js/HistoryManager.mjs";

const numbersOnly = {
    properties: {
        value: {
            pattern: /^[0-9]+$/,
            message: 'Instance must only be numbers',
            required: true
        }
    }
};

const man = new HistoryManager("snapshots/");
let instance = 0;
let history = null;
let running = true;

while(running) {

    try {

        console.info(
            "0. Load instance\n" +
            "1. Check missing types\n" +
            "2. Fix missing types\n" +
            "99. Quit\n");

        if(history) {
            console.info("Instance " + history.instance + " Loaded");
        } else {
            console.info("No Instance Loaded");
        }

        let v = await readInt();
        console.info("=================");

        switch(v) {
            case 0:
                console.info("Instance ID: ");
                instance = await readInt()
                history = man.getHistory(instance);
                break;
            case 1:
                console.info("Snaps missing types: " + checkMissingTypes(history).length);
                break;
            case 2:
                fixMissingTypes(checkMissingTypes(history));
                man.saveHistoryToDisk(history);
                break;
            case 99:
                running = false;
                break;
            default:
                console.error("Unknown number");
        }

        console.info("=================\n");
    }
    catch(err) {

        // Sending the kill signal interrupts prompt causing it to throw an exception with this message
        if(err.message === "canceled")
            break;

        console.error("ERROR: " + err);
    }
}

async function readInt() {
    return parseInt((await prompt.get(numbersOnly)).value);
}

function checkMissingTypes(history) {
    let missingSnaps = [];
    history.snapshots.forEach(s => {
        if(!s.type) missingSnaps.push(s);
    });
    history.undo.forEach(s => {
        if(!s.type) missingSnaps.push(s);
    });
    console.info("Snapshots and Undo missing type: " + missingSnaps.length);

    return missingSnaps;
}

function fixMissingTypes(snaps) {
    snaps.forEach(s => {
        if(s.status) {
            s.type = "system";
        }
        else {
            s.type = "sector";
        }
    });
}