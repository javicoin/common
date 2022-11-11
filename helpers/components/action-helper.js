class ActionHelper {

    /**
     * Launches a native app in the driver
     *
     */
    static async launchApp() {
        await driver.launchApp();
    }

    /**
     * Launches a fresh native app in the driver
     *
     */
     static async launchFreshApp() {
        await driver.resetApp();
        await this.launchApp();
    }     

    /**
     * Switches the driver to native context
     *
     */
    static async switchToNativeContext() {
        await browser.switchContext('NATIVE_APP');
    }

    /**
     * Stops the driver for a given amount of time
     *
     * @param miliseconds
     *
     */
    static async pause(miliseconds = 2000) {
        await browser.pause(miliseconds);
    }

    /**
     * Clicks on a displayed element
     *
     * @param {String} locator
     * @param waitTimeInMiliSeconds
     *
     */
    static async click(locator, waitTimeInMiliSeconds = 100) {
        try {
            const elem = await $(locator);
            await this.waitForDisplayed(locator);
            await elem.click();
            await this.pause(waitTimeInMiliSeconds);
        } catch (error) {
            throw new Error(`Error while clicking on element '${locator}'\n` + error);
        }
    }

    /**
     * Get Elements list of a given locator
     *
     * @param {String} locator
     * @param waitTimeInMiliSeconds
     * @returns {string[]} - array of elements sharing same locator
     */
     static async getElementList(locator, waitTimeInMiliSeconds = 3000) {
        try {
            await this.waitForDisplayed(locator, waitTimeInMiliSeconds);
            return await $$(locator);
        } catch (error) {
            throw new Error(`Error while getting elements list '${locator}'\n` + error);
        }
    }

    /**
     * Waits for an element to be displayed
     *
     * @param {String} locator
     * @param waitTimeInMiliSeconds
     *
     */
    static async waitForDisplayed(locator, waitTimeInMiliSeconds = 3000) {
        try{
            const elem = await $(locator);
            await elem.waitForDisplayed(waitTimeInMiliSeconds);
        } catch (error) {
            throw new Error(`Element is not displayed '${locator}'\n` + error);
        }
    }

    /**
     * Waits for an element to be clickable
     *
     * @param {String} locator
     * @param waitTimeInMiliSeconds
     *
     */
     static async waitForClickable(locator, waitTimeInMiliSeconds = 3000) {
        try{
            const elem = await $(locator);
            await elem.waitForClickable(waitTimeInMiliSeconds);
        } catch (error) {
            throw new Error(`Element is not clickable '${locator}'\n` + error);
        }
    }

    /**
     * Gets the text value of a given element
     *
     * @param {String} locator
     * @returns {String} - text value of the given element
     */
    static async getText(locator) {
        try {
            const elem = await $(locator);
            await this.waitForDisplayed(elem);
            return await elem.getText();
        } catch (error) {
            throw new Error(`Error while getting text on element '${locator}'\n` + error);
        }
    }

    /**
     * Sets the text value of a given element
     *
     * @param {String} locator
     * @param {String} textValue
     *
     */
     static async setText(locator, textValue) {
        try {
            const elem = await $(locator);
            await this.waitForDisplayed(elem);
            return await elem.setValue(textValue);
        } catch (error) {
            throw new Error(`Error while setting text on element '${locator}'\n` + error);
        }
    }

    /**
     * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
     *
     * @param {object} from Example { x: 50, y: 50 }
     * @param {object} to Example { x: 25, y: 25 }
     *
     */
    static async swipe (from, to) {
        await driver.touchPerform([
            { action: 'press', options: from},
            { action: 'wait', options: { ms: 1000 },},
            { action: 'moveTo', options: to},
            { action: 'release' }
        ]);
        await this.pause(200)
    }
}

module.exports = ActionHelper;
