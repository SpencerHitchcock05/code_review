import { clone } from "isomorphic-git";
import http from "isomorphic-git/http/node";
import fs from "fs";
import { getRepoIdByName, createRepo, deleteRepo, setRepoInCache } from "../../models/repos.model.js";

// export async function cloneRepo(req, res) {
//     setRepoInCache(4, true);
// }

export async function cloneRepo(req, res) {
    let newID = -1;
    try {
        const repoName = req.body.url;
        const id = await getRepoIdByName(repoName);
        if (id <= 0) {
            //insert entry to database
            const newID = await createRepo(repoName);
            if (newID <= -1) {
                throw new Error("unsucessful database creation")
            }
            const tmpDir = await fs.promises.mkdir(`./tmp/repo-${newID}`, { recursive: true });

            // add/fix error handling when error is thrown here
            await clone({
                fs,
                http,
                dir: tmpDir,
                url: req.body.url,
            })

            await setRepoInCache(newID, true);
        }
        
    } catch (error) {
        if (newID >= -1) {
            await deleteRepo(newID);
        }
        return res.status(500).json({status: 500, error: error.message});
    }
    return res.status(200).json({status: 200});
}