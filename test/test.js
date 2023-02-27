import { expect } from "chai";
import config from "./test.config.js";
import fs, { mkdirSync, writeFileSync } from "fs";

import { fileURLToPath } from 'url';
import { dirname, join, relative, resolve, sep } from 'path';
import { exec } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));


function setupFolderStructure(config) {

    for (let [name, files] of Object.entries(config)) {
        files.forEach(file => {
            const parts = join(__dirname, "data", name, file).split(sep)
            const filename = parts.pop()

            mkdirSync(parts.join(sep), { recursive: true })
            writeFileSync(join(...parts, file), "")
        });
    }
}

describe("Test Font-Facer", function () {

    this.beforeAll(function () {
        setupFolderStructure(config)
    })

    describe("Test Arguments", function () {

        it("Fail when no arguments are passed", async function () {
            const indexFile = resolve(__dirname, "..", "index.js")
            exec(`node ${indexFile}`, function (error, stdout, stderr) {
                expect(stderr).to.contain('Error: No font directory specified!')
            })
        })

        it("Succeed when source is provided", async function () {
            const indexFile = resolve(__dirname, "..", "index.js")
            const sourceFolder = resolve(__dirname, "data", "all")
            const targetFile = resolve(__dirname, "data", "success.css")
            const rel = relative(resolve(), sourceFolder)

            const command = `node ${indexFile} -t ${targetFile} ${rel}`
            console.log(command)
            exec(command, function (error, stdout, stderr) {
                console.log({ error, stdout, stderr })
            })
        })


        // it("Succeed when source is provided", async function () {
        //     const indexFile = resolve(__dirname, "..", "index.js")
        //     const sourceFolder = resolve(__dirname, "data", "all")
        //     exec(`node ${indexFile} ${sourceFolder}`, function (error, stdout, stderr) {
        //         console.log({ error, stdout, stderr })
        //     })
        // })

    })
})