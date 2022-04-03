import * as fs from "fs";
import {DateTime} from "luxon";
import structuredClone from 'realistic-structured-clone';
import prompt from 'prompt';

const numbersOnly = {
    properties: {
        instance: {
            pattern: /^[0-9]+$/,
            message: 'Instance must only be numbers',
            required: true
        }
    }
};

const v = await prompt.get(numbersOnly);
const instance = v.instance;


