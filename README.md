# NSOPW Name Search

This project is a [Playwright](https://playwright.dev/) test suite that navigates to the National Sex Offender Public Website (NSOPW) and performs searches by name from a provided CSV file.

The intent of this project is automate the process of checking for names on the NSOPW website, to help organizations ensure they are in compliance with Utah state law [SB0158](https://le.utah.gov/~2024/bills/sbillamd/SB0158.htm).

## Setup Instructions

1. **Clone the repository:**

   ```
   git clone https://github.com/ericgibby/nsopw-name-search.git
   cd nsopw-name-search
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Prepare the CSV file:**
   Ensure you have a CSV file named `names.csv` in the root directory of the project.
   Use the provided `names.example.csv` as a template.
   This file should contain the names you want to search for on the NSOPW website.

4. **Run the tests:**

   ```
   npm start
   ```
   This will open the Playwright test UI.
   Running the tests in this way is useful because it will capture the browser content for each test,
   allowing you to see the first page of search results for failed tests.

   Alternatively, you can run the tests without the UI with the following command:

   ```
   npm test
   ```

   Note: Tests can take a while to run. There is a delay of 10-20 seconds between each test to avoid rate-limiting on the NSOPW website.
