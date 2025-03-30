import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import { resolve } from 'node:path';
import Papa from 'papaparse';

// Load names from a CSV file
const csvFilePath = resolve(__dirname, '..', 'names.csv'); // Path to your CSV file
const csvData = fs.readFileSync(csvFilePath, 'utf8');
const names = Papa.parse<{ firstName: string; lastName: string }>(csvData, {
	header: true,
}).data;

test.describe('navigate to nsopw.gov for each name', () => {
	// Use a single browser context for all tests
	test.use({ contextOptions: { viewport: { width: 1280, height: 720 } } });

	for (const { firstName, lastName } of names) {
		test(`search for ${firstName} ${lastName}`, async ({ page }) => {
			await page.goto('https://www.nsopw.gov/');

			// Find and fill the "First Name" input
			const firstNameInput = page.locator(
				'input[placeholder="First Name (Required)"]',
			);
			await firstNameInput.fill(firstName); // Fill in the first name input

			// Find and fill the "Last Name" input
			const lastNameInput = page.locator(
				'input[placeholder="Last Name (Required)"]',
			);
			await lastNameInput.fill(lastName); // Fill in the last name input

			// Find and click the "Name Search" button
			const submitButton = page.locator('button:has-text("Name Search")');
			await submitButton.click(); // Click the submit button

			// Wait for the validation dialog to appear
			const validationDialog = page.locator('#validationDialog');
			try {
				await validationDialog.waitFor({ state: 'visible', timeout: 10000 }); // Wait up to 10 seconds
				const continueButton = validationDialog.locator(
					'button:has-text("Continue")',
				);
				await continueButton.click(); // Click the "Continue" button
			} catch (error) {
				console.log(
					'Validation dialog did not appear within 10 seconds. Proceeding without clicking "Continue".',
				);
			}

			// Check if a table with id "nsopwdt" exists
			const table = page.locator('#nsopwdt');
			await table.waitFor({ state: 'visible', timeout: 10000 });
			await expect(table).toBeVisible(); // Fail the test if the table is not visible

			// Check for a <td> element with the content "No data available in table"
			const noDataCell = table.locator(
				'td:has-text("No data available in table")',
			);
			await expect(noDataCell).toBeVisible(); // Fail the test if the <td> element is not visible

			// Add a delay of 10-20 seconds before the next test
			const delay = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000; // Random delay between 10-20 seconds
			await page.waitForTimeout(delay);
		});
	}
});
