#!/usr/bin/node

import fs from "fs";
import path from "path";

var destination = process.argv.slice(2)[0];

const artifacts: string[] = JSON.parse(fs.readFileSync("./artifacts.json", "utf-8"))

artifacts.forEach((artifact) => {
    const content = fs.readFileSync(artifact, "utf-8");
    const filename = path.basename(artifact, ".json")
    fs.writeFileSync(path.join(destination, filename + ".ts"), `const artifact = ${content.trimEnd()} as const; export default artifact;`)
})