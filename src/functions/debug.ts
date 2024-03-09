import {Settings} from "../settings/Settings";

export const debug = (...args: any[]): void => {
    if (Settings.debugEnabled) console.info('[LktItemCrud] ', ...args);
};
export const debugLktItemCrud = (state: boolean = true): void => {
    Settings.debugEnabled = state;
};