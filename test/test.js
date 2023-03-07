import { expect } from "chai";

import config from "./test.config.js";
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "fs";

import { fileURLToPath } from 'url';
import path, { dirname, join, relative, resolve, sep } from 'path';
import { exec } from "child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));

const DashFontLocation = resolve(__dirname, "data", "DashFont")
const DashFontLocationRelative = relative(resolve(), DashFontLocation)


function setupFolderStructure(config) {

    // Create the output directory if it doesn't exists
    const outdir = path.join(__dirname, "output")
    if (!existsSync(outdir))
        mkdirSync(outdir)

    // Create file structure as described in 'test.config.js
    for (let [name, files] of Object.entries(config)) {
        files.forEach(file => {
            const fontDir = join(__dirname, "data", name)
            if (!existsSync(fontDir))
                mkdirSync(fontDir, { recursive: true })

            const fontFile = join(__dirname, "data", name, file)
            writeFileSync(fontFile, "")
        });
    }
}

describe("Font-Facer", function () {

    this.beforeAll(function () {
        setupFolderStructure(config)
    })

    describe("Arguments", function () {

        it("Fail when no arguments are passed", async function () {
            const indexFile = resolve(__dirname, "..", "index.js")
            exec(`node ${indexFile}`, function (error, stdout, stderr) {
                expect(stderr).to.contain('Error: No font directory specified!')
            })
        })

        it("Succeed when source is provided", function (done) {
            const indexFile = resolve(__dirname, "..", "index.js")
            const targetFile = resolve(__dirname, "output", "success.css")
            const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

            const command = `node ${indexFile} -o -t ${targetFile} ${DashFontLocationRelative}`
            exec(command, function (error, stdout, stderr) {
                const file = readFileSync(targetFile, { encoding: "utf-8" })
                const truth = readFileSync(compareFile, { encoding: "utf-8" })
                expect(file).to.be.equal(truth)
                done()
            })
        })

        describe("'Source' Argument (-s, --source, last-argument)", async function () {

            it("full name", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-source.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

                const command = `node ${indexFile} --source ${DashFontLocationRelative} -o  -t ${targetFile}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })

            it("abbrevation", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-source-abb.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

                const command = `node ${indexFile} -s ${DashFontLocationRelative} -o  -t ${targetFile}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })

            it("as last-argument", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-source-last-arg.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

                const command = `node ${indexFile} -o  -t ${targetFile} ${DashFontLocationRelative}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })
        })


        describe("'Target' argument (-t, --target)", async function () {

            it("full name", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-target.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

                const command = `node ${indexFile} -o  --target ${targetFile} ${DashFontLocationRelative}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })

            it("abbrevation", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-target-abb.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

                const command = `node ${indexFile} -o  -t ${targetFile} ${DashFontLocationRelative}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })
        })

        describe("'Font Name' Argument (-f, --font-name)", async function () {

            it("full name", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-font-name.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-font-name.css")

                const command = `node ${indexFile} -o --font-name FontName  -t ${targetFile} ${DashFontLocationRelative}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })

            it("abbrevation", function (done) {
                const indexFile = resolve(__dirname, "..", "index.js")
                const targetFile = resolve(__dirname, "output", "DashFont-font-name-abb.css")
                const compareFile = resolve(__dirname, "compare", "DashFont-font-name.css")

                const command = `node ${indexFile} -o -f FontName  -t ${targetFile} ${DashFontLocationRelative}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })
        })
    })

    describe("Append / Override", function () {

        it("Override", function (done) {
            const indexFile = resolve(__dirname, "..", "index.js")
            const targetFile = resolve(__dirname, "output", "DashFont-override.css")
            const compareFile = resolve(__dirname, "compare", "DashFont-success.css")

            const command = `node ${indexFile} -o  -t ${targetFile} ${DashFontLocationRelative}`
            exec(command, function (error, stdout, stderr) {
                const command = `node ${indexFile} -o  -t ${targetFile} ${DashFontLocationRelative}`
                exec(command, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.equal(truth)
                    done()
                })
            })
        })

        it("Append", function (done) {
            const indexFile = resolve(__dirname, "..", "index.js")
            const targetFile = resolve(__dirname, "output", "DashFont-appended.css")
            const compareFile = resolve(__dirname, "compare", "DashFont-appended.css")

            const baseFile = `node ${indexFile} -o  -t ${targetFile} ${DashFontLocationRelative}`
            exec(baseFile, function (error, stdout, stderr) {
                const baseFile = `node ${indexFile}  -t ${targetFile} ${DashFontLocationRelative}`
                exec(baseFile, function (error, stdout, stderr) {
                    const file = readFileSync(targetFile, { encoding: "utf-8" })
                    const truth = readFileSync(compareFile, { encoding: "utf-8" })
                    expect(file).to.be.equal(truth)
                    done()
                })
            })
        })
    })
})