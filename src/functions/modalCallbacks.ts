import {ModalCallbackConfig} from "../types/ModalCallbackConfig";
import {debug} from "./debug";
import {closeModal, openModal, reOpenModal, refreshModal, execModal} from "lkt-modal";

export const runModalCallback = (cfg: ModalCallbackConfig) => {
    debug('runModalCallback -> init', cfg);

    let modalKey = cfg.modalKey ? cfg.modalKey : '_',
        args = cfg.args ? cfg.args : {};

    switch (cfg.action) {
        case "reOpen":
            //@ts-ignore
            return reOpenModal(cfg.modalName, modalKey, args);

        case "open":
            //@ts-ignore
            return openModal(cfg.modalName, modalKey, args);

        case "close":
            //@ts-ignore
            return closeModal(cfg.modalName, modalKey);

        case "refresh":
            //@ts-ignore
            return refreshModal(cfg.modalName, modalKey, args);

        case "exec":
            let method = cfg.method;
            if (!method) return;
            //@ts-ignore
            return execModal(cfg.modalName, modalKey, method, args);

    }
}