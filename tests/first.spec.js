const { test, expect, chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Define the path to the JSON data file
const jsonPath = path.resolve(__dirname, '../test-data/data.json');

let browser;
let page;

// Set up the browser and page before each test
test.beforeEach(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    await page.goto('https://testpages.herokuapp.com/styled/tag/dynamic-table.html', { waitUntil: 'load' });
});

// Close the browser after each test
test.afterEach(async () => {
    await browser.close();
});

// Test to verify the table data
test("Verify Table data", async () => {
    // Locators for elements
    const tableDataToggle = page.locator('div.centered details summary');
    const textBox = page.locator('#jsondata');
    const refreshTableBtn = page.getByRole('button', { name: 'Refresh Table' });

    // Click to toggle table data
    await tableDataToggle.click();
    await page.waitForTimeout(2000); // Wait for the table to become visible

    // Ensure the text box is visible
    const isTextBoxVisible = await textBox.isVisible();
    if (!isTextBoxVisible) {
        // Retry clicking the toggle if the text box is not visible
        await tableDataToggle.click();
        await page.waitForSelector('#jsondata', { state: 'visible' });
    }

    // Clear the text box and read JSON data from file
    await textBox.fill(''); // Clear any existing text
    const jsonData = await readJsonFile(jsonPath); // Read JSON data from the file
    await textBox.fill(jsonData); // Fill the text box with JSON data
    await page.waitForTimeout(1000); // Wait for any potential processing

    // Ensure the Refresh Table button is visible and click it
    await refreshTableBtn.isVisible();
    await refreshTableBtn.click();

    // Retrieve the table data from the UI
    const jsonDataFromUI = await getTableData();
    

    // Assert that the data from the table matches the input data
    expect(jsonDataFromUI, 'Data from Table is not the same as the input data').toBe(jsonData);
});

// Function to read JSON data from a file
function readJsonFile(filePath) {
    const jsonData = fs.readFileSync(filePath, 'utf-8'); // Read file synchronously
    return JSON.stringify(JSON.parse(jsonData)); // Parse and return as a JSON string
}

// Function to get table data from the UI
async function getTableData() {
    await page.locator('#dynamictable', { state: 'visible' }); // Wait for the table to be visible

    const tableData = await page.evaluate(() => {
        const table = document.querySelector('table#dynamictable');
        const headers = Array.from(table.querySelectorAll('th')).map(header => header.innerText.trim());
        const rows = Array.from(table.querySelectorAll('tr')).map(row => {
            const cells = Array.from(row.querySelectorAll('td')).map(cell => cell.innerText.trim());
            return cells;
        });

        // Map the rows into objects using headers as keys
        const tableJson = rows
            .filter(row => row.length === headers.length) // Ensure the row has the same number of cells as headers
            .map(row => {
                const obj = {};
                headers.forEach((header, index) => {
                    // Convert age to a number if the header is 'age'
                    obj[header] = header === 'age' ? Number(row[index]) : row[index];
                });
                return obj;
            });

        return tableJson; // Return the array of objects
    });

    // Return a compact JSON string without spaces
    return JSON.stringify(tableData);
}
