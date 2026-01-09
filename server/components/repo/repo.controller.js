import { clone } from "isomorphic-git";
import http from "isomorphic-git/http/node";
import fs from "fs";
import { getRepoIdByName, createRepo } from "../../models/repos.model.js";

export async function cloneRepo(req, res) {
    try {

        const repoName = req.body.url;

        const id = await getRepoIdByName(repoName);
        if (id <= 0) {
            const newID = await createRepo(repoName);
            const tmpDir = await fs.promises.mkdir(`./tmp/repo-${newID}`, { recursive: true });

            await clone({
                fs,
                http,
                dir: tmpDir,
                url: req.body.url,
            })
        }
        
    } catch (error) {
        return res.status(500).json({status: 500});
    }
    return res.status(200).json({status: 200});
}