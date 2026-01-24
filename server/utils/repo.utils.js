import { clone } from "isomorphic-git";
import fs from "fs";
import http from "isomorphic-git/http/node";


export const createLocalRepo = async (repoID, url) => {
    try {
        const tmpDir = await fs.promises.mkdir(`./tmp/repo-${repoID}`, { recursive: true });
        
        await clone({
            fs,
            http,
            dir: tmpDir,
            url: url,
        })

        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}

export const  deleteLocalRepo = async (repoID) => {
    await fs.promises.rm(`./tmp/repo-${repoID}`, { recursive: true });
}