/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

class MergeReport {
    /**
     * Reads given file and merges the contents into the final report
     * WARNING! mergedReport is modified in place
     *
     * @param {Object[]} mergedReport - array of feature reports representing the final merged report
     * @param {string} file - path to json file
     * @param {string} backupDirectory - directory where json file is going to be stored as backup
     */
    static mergeFile(mergedReport, file, backupDirectory) {
        console.log(`Processing file: ${file}`);
        const fileContent = fs.readFileSync(file);
        if (fileContent.length === 0) {
            console.warn(`WARNING! Empty file found: ${file}`);
        } else {
            const report = JSON.parse(fileContent);
            mergedReport.push(...report);
        }
        console.log(`Moving parsed ${file} to backup directory`);
        fs.renameSync(file, path.join(backupDirectory, path.basename(file)));
    }

    /**
     * Processes given report JSON files and merges them into a single report with results of last runs for each example
     * @param {string[]} jsonFiles - array of file paths
     * @returns {Object[]} - cucumber result JSON (always an array of feature objects)
     */
    static mergeFiles(jsonFiles) {
        const mergedReport = [];
        jsonFiles.forEach(file => this.mergeFile(mergedReport, file));
        return mergedReport;
    }

    /**
     * Stringifies given report array and writes it to the output file
     *
     * @param {string} outputFile - output file path
     * @param {Object[]} report - cucumber result JSON (it always is an array of feature objects
     */
    static writeMergedReport(outputFile, report) {
        console.log(`Writing merged report to ${outputFile}`);
        fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));
        console.log(`Wrote merged report to ${outputFile}`);
    }

}

module.exports =  MergeReport;