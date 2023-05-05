import fs from "fs";
import path from "path";

var destination = process.argv.slice(2)[0];

const artifactContent = fs.readFileSync("./artifacts.json", "utf-8")

const artifacts: string[] = JSON.parse(artifactContent);

(async function(){
    for(const artifact of artifacts) {
        let content;
        try {
            content = JSON.stringify(await import(artifact));
        } catch(e) {
            content = fs.readFileSync(artifact, "utf-8")
        }
        const filename = path.basename(artifact, ".json")
        const file = path.join(destination, filename + ".ts")
        fs.writeFileSync(file, `const artifact = ${content.trimEnd()} as const; export default artifact;`)
        console.log(`Created/updated ${file}`)
    }
})()