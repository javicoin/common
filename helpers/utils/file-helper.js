const fs = require('fs');

class FilesHelper {
    /**
     * Returns the content of a given JSON file
     *
     * @param {string} jsonFile - JSON file path
     * @returns {Object[]} - JSON file content
     */
    static processJson(jsonFile) {
        const fileContent = fs.readFileSync(jsonFile);
        if (fileContent.length === 0) {
            console.error(`ERROR! Empty file found: ${jsonFile}`);
        }
        return JSON.parse(fileContent);
    }

    /**
     * Edits a given JSON file by <key, value>
     *
     * @param {string} key - JSON parameter to be modified
     * @param {string} value - new value for the key parameter
     */
    static editJsonByKey(json, key, value) {
        try {
            let file = FilesHelper.processJson(json);
            file[key] = value;
            fs.writeFileSync(json, JSON.stringify(file));
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Creates backup directory if it doesn't exist or empties it if it does exist
     *
     * @param {string} directory - path to backup directory
     */
    static prepareBackupDirectory(directory) {
        if (fs.existsSync(directory)) {
            console.log(`Cleaning existing backup directory: ${directory}`);
            fs.readdirSync(directory).forEach(file => fs.unlinkSync(path.join(directory, file)));
        } else {
            console.log((`Creating backup directory: ${directory}`));
            fs.mkdirSync(directory);
        }
    }

    /**
     * Returns al list of 'extension' file absolute paths from given directory.
     * List will be sorted by creation time
     *
     * @param {string} directory - directory to check
     * @param {string} extension - file extension to consider (i.e.: 'json', 'feature', 'js'...)
     * @returns {string[]} - array of file path sorted by file creation time
     */
    static getFiles(directory, extension) {
        return fs.readdirSync(directory)
            .filter(file => path.parse(file).ext === `.${extension}`)
            .map(file => path.join(directory, file))
            .sort((a, b) => fs.statSync(a).ctimeMs - fs.statSync(b).ctimeMs);
    }

}
module.exports = FilesHelper;