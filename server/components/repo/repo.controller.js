import { clone } from "isomorphic-git";
import http from "isomorphic-git/http/node";
import fs from "fs";

export async function cloneRepo(req, res) {
    try {
        await fs.promises.rm('./tmp/repo', { recursive: true, force: true });
        const tmpDir = await fs.promises.mkdir('./tmp/repo', { recursive: true });

        await clone({
            fs,
            http,
            dir: tmpDir,
            url: req.body.url,
        })
    } catch (error) {
        return res.status(500).json({status: 500});
    }
    return res.status(200).json({status: 200});
}