import config from '../data/configData';
import axios from 'axios';
import UAParser from 'ua-parser-js';

const parser = new UAParser()
const device = [
    parser.getDevice().vendor || "UNKNOWN",
    parser.getDevice().model || "UNKNOWN"
].join("-")

const browser = [
    parser.getBrowser().name || "UNKNOWN",
    parser.getBrowser().version || "UNKNOWN"
].join("-")

const os = [
    parser.getOS().name || "UNKNOWN",
    parser.getOS().version || "UNKNOWN"
].join("-")

function sendAuditEvent(fields) {
    let url = config.url + config.ADDAUDIT
    return axios.post(url, {
        its_id: window.sessionStorage.getItem("userId"),
        miqat_id: window.sessionStorage.getItem("miqatId"),
        event_type: fields.event_type || "INVALID",
        device_type: device,
        browser_type: browser,
        operating_system: os
    })
}

function sendLoginEvent() {
    return sendAuditEvent({
        event_type: "LOGIN"
    })
}

function sendLogoutEvent() {
    return sendAuditEvent({
        event_type: "LOGOUT"
    })
}

export {
    sendLoginEvent,
    sendLogoutEvent
}