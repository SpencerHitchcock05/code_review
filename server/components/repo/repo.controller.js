import { getRepoIdByName, createRepo, deleteRepo, setRepoInCache } from "../../models/repos.model.js";
import { createLocalRepo, deleteLocalRepo } from "../../utils/repo.utils.js";

export async function cloneRepo(req, res) {
    let newID = -1;
    try {
        const repoName = req.body.url;
        const id = await getRepoIdByName(repoName);
        if (id <= 0) {
            //insert entry to database
            newID = await createRepo(repoName);
            if (newID <= -1) {
                throw new Error("unsuccessful database creation")
            }
            
            const successfullyCreated = await createLocalRepo(newID, req.body.url)
            if (!successfullyCreated) {
                throw new Error("unsuccessful repository clone")
            }
            await setRepoInCache(newID, true);
        }
        
    } catch (error) {
        if (newID > -1) {
            await deleteRepo(newID);
            await deleteLocalRepo(newID)
        }
        return res.status(500).json({status: 500, error: error.message});
    }
    return res.status(200).json({status: 200});
}
