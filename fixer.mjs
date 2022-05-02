/**
 * I shouldn't need this file, but I haven't yet isolated where all the errors are coming from, and there
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
            message: 'Must only be numbers',
            required: true
        }
    }
};

const yesNo = {
    properties: {
        value: {
            pattern: /^[YNyn]?$/,
            message: 'Only Y, N, n, y are accepted',
            required: false
        }
    }
};

const man = new HistoryManager("snapshots/");
let instance = 0;
let history = null;
let running = true;
prompt.start();

while(running) {

    try {

        console.info(
            "0. Load instance\n" +
            "1. Health Check\n" +
            "2. Fix missing types\n" +
            "3. Fix Sectors' Times\n" +
            "4. Fix Players Joining\n" +
            "5. Mark as Legacy\n" +
            "90. Save to Disk\n" +
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
                console.info("Snapshots: " + history.snapshots.length);
                break;
            case 1:
                console.info("Snaps missing types: " + checkMissingTypes(history).length);
                console.info("Players Joined Marked as Colonized: " + findJoiningPlayers(history).length);
                console.info("Missing Types: " + checkMissingTypes(history).length);
                break;
            case 2:
                fixMissingTypes(checkMissingTypes(history));
                break;
            case 3:
                await askToChangeDateOnEachSector(findSectorsInSnapshots(history));
                break;
            case 4:
                await fixJoiningPlayers(findJoiningPlayers(history));
                break;
            case 90:
                man.saveHistoryToDisk(history);
                console.info("Saved to disk.")
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

function findJoiningPlayers(history) {
    const playersInBaseImage = [];
    const playersWhoJoined = [];

    // first pass: find out who is in the base image
    Object.values(history.base.stellar_systems).forEach(s =>  {
        if(s.owner) {
            playersInBaseImage.push(s.owner);
        }
    });

    // Next, find all players who have snaps with them taking ownership and not marked as joining
    Object.values(history.snapshots).forEach(s => {
        if(s.type === "system" && s.joined) {
            playersInBaseImage.push(s.owner);
        }
        if(s.type === "system" && !s.joined && !playersInBaseImage.includes(s.owner)) {
            playersInBaseImage.push(s.owner);
            playersWhoJoined.push(s);
        }
    });

    return playersWhoJoined;
}

async function fixJoiningPlayers(snaps) {
    Object.values(snaps).forEach(s => {
        s.joined = true;
    });
}

async function readInt() {
    return parseInt((await prompt.get(numbersOnly)).value);
}

function findSectorsInSnapshots(history) {
    let sectors = [];

    history.snapshots.forEach(s => {
        if(s.type === "sector" && ![3, 4, 5].includes(s.id)) {
            sectors.push(s);
        }
    });

    return sectors;
}

async function askToChangeDateOnEachSector(sectors) {
    for(const s of sectors) {
        console.info(s.name + " (" + s.id + ") @ " + s.time);
        console.info("Change time? Y/N");
        let v = (await prompt.get(yesNo)).value;
        if(v && (v === "Y" || v === "y")) {
            s.time = (await prompt.get('date')).date;
        }
    }
}

function checkMissingTypes(history) {
    let missingSnaps = [];
    history.snapshots.forEach(s => {
        if(!s.type) missingSnaps.push(s);
    });
    history.undo.forEach(s => {
        if(!s.type) missingSnaps.push(s);
    });

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