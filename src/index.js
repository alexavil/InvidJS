import { VideoInfo } from '../classes/videoInfo.js';
import { InstanceInfo } from '../classes/instanceInfo.js';
import * as fs from "fs-extra";
import * as ffmpeg from "ffmpeg-static";
import fetch from "node-fetch";

let Constants = {
    allowedTypes: ["https", "i2p", "onion", "all"]
}

let InvJS = {
    fetchInstanceLinks: async function(type) {
        if (!Constants.allowedTypes.includes(type)) throw new Error("Invalid type!");
        let instances = [];
        await fetch("https://api.invidious.io/instances.json").then(res => res.json().then(json => {
            json.forEach(element => {
                if (type === element[1].type || type === "all") instances.push(element[1].uri);
            });
        }));
        return instances;
    },

    getInstance: async function(uri) {
        if (!uri) throw new Error("You must provide a valid instance!");
        let info = new InstanceInfo();
        await fetch("https://api.invidious.io/instances.json").then(res => res.json().then(json => {
            let found = json.some((instance) => instance[1].uri === uri);
            if (!found) throw new Error("You must provide a valid instance!");
            json.forEach(element => {
                if (uri === element[1].uri) {
                    info.region = element[1].region;
                    info.cors_active = element[1].cors;
                    info.api_active = element[1].api;
                    info.type = element[1].type;
                    info.uri = element[1].uri;
                }
            });
        }));
        return info;
    },

    fetchVideoInfo: async function(instance, id) {
        if (!instance) throw new Error("You must provide an instance to fetch videos!")
        if (!id) throw new Error("You must provide a video ID to fetch it!")
        if ((await this.getInstance(instance)).api_active === false) throw new Error("The instance you provided does not support API requests!")
        let info = new VideoInfo();
        await fetch(`${instance}/api/v1/videos/${id}`).then(res => res.json().then(json => {
            info.title = json.title;
            info.description = json.description;
            info.published = json.publishedText;
            info.views = json.viewCount;
            info.likes = json.likeCount;
            info.dislikes = json.dislikeCount;
            info.length = json.lengthSeconds;
        }))
        return info;
    }
}