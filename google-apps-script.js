// Google Apps Script for Essential User Data Collection & Password Game Logging
// Copy this entire code to https://script.google.com

// Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
const SHEET_ID = '1WTXQrlfxco6CehaADF5_kFVro-8_6GA1QIPj9nz2zzA'; // Your actual Google Sheet ID

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getActiveSheet();
    
    // Prepare the row data with essential user information
    const rowData = [
      data.timestamp,                    // Timestamp
      data.guess,                       // Password guess
      data.similarity,                  // Similarity percentage
      data.feedback,                    // Feedback message
      data.attemptNumber,               // Attempt number
      data.isCorrect,                   // Whether correct or not
      // IP & Location Data
      data.ip,                          // IP Address
      data.city,                        // City
      data.region,                      // Region/State
      data.country,                     // Country
      data.isp,                         // ISP
      // Device Information
      data.deviceType,                  // Device type (Mobile/Tablet/Desktop)
      data.operatingSystem,             // Operating System & Version
      // Browser Information
      data.browser,                     // Browser name
      data.browserVersion,              // Browser version
      data.screenResolution,            // Screen resolution
      data.language,                    // Language
      data.timezone,                    // Timezone
      // Additional Data
      data.batteryLevel,                // Battery percentage
      data.batteryCharging,             // Charging status
      data.darkMode,                    // Dark/Light mode
      data.copyPasteEnabled             // Copy-paste detection
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Set up headers if this is the first entry
    if (sheet.getLastRow() === 1) {
      const headers = [
        'Timestamp',
        'Password Guess',
        'Similarity %',
        'Feedback',
        'Attempt #',
        'Correct?',
        'IP Address',
        'City',
        'Region/State',
        'Country',
        'ISP',
        'Device Type',
        'Operating System',
        'Browser',
        'Browser Version',
        'Screen Resolution',
        'Language',
        'Timezone',
        'Battery Level',
        'Battery Charging',
        'Dark Mode',
        'Copy-Paste Enabled'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
    }
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 22);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Data logged successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Error logging data: ' + error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle GET requests (for testing)
  return ContentService
    .createTextOutput('Essential User Data Collection & Password Game Logger is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

// Function to manually set up the sheet headers
function setupSheet() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  
  // Clear existing data
  sheet.clear();
  
  // Set headers
  const headers = [
    'Timestamp',
    'Password Guess',
    'Similarity %',
    'Feedback',
    'Attempt #',
    'Correct?',
    'IP Address',
    'City',
    'Region/State',
    'Country',
    'ISP',
    'Device Type',
    'Operating System',
    'Browser',
    'Browser Version',
    'Screen Resolution',
    'Language',
    'Timezone',
    'Battery Level',
    'Battery Charging',
    'Dark Mode',
    'Copy-Paste Enabled'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format headers
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.getRange(1, 1, 1, headers.length).setBackground('#f0f0f0');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Sheet setup completed with essential user data columns!');
}

// Function to test the connection with sample data
function testConnection() {
  const testData = {
    timestamp: new Date().toISOString(),
    guess: 'test123',
    similarity: '50%',
    feedback: 'Test feedback',
    attemptNumber: 0,
    isCorrect: false,
    // IP & Location
    ip: '192.168.1.1',
    city: 'Test City',
    region: 'Test Region',
    country: 'Test Country',
    isp: 'Test ISP',
    // Device
    deviceType: 'Desktop',
    operatingSystem: 'Windows 10',
    // Browser
    browser: 'Chrome',
    browserVersion: '120.0',
    screenResolution: '1920x1080',
    language: 'en-US',
    timezone: 'America/New_York',
    // Additional
    batteryLevel: '75%',
    batteryCharging: false,
    darkMode: 'Light Mode',
    copyPasteEnabled: 'Enabled'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}

// Function to create a summary report
function createSummaryReport() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  
  // Get all data
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  if (rows.length === 0) {
    Logger.log('No data to analyze');
    return;
  }
  
  // Create summary sheet
  let summarySheet = spreadsheet.getSheetByName('Summary');
  if (!summarySheet) {
    summarySheet = spreadsheet.insertSheet('Summary');
  } else {
    summarySheet.clear();
  }
  
  // Calculate statistics
  const totalAttempts = rows.length;
  const correctAttempts = rows.filter(row => row[5] === true).length; // Correct? column
  const successRate = (correctAttempts / totalAttempts * 100).toFixed(2);
  
  // Device type distribution
  const deviceTypes = {};
  rows.forEach(row => {
    const deviceType = row[11]; // Device Type column
    deviceTypes[deviceType] = (deviceTypes[deviceType] || 0) + 1;
  });
  
  // Browser distribution
  const browsers = {};
  rows.forEach(row => {
    const browser = row[13]; // Browser column
    browsers[browser] = (browsers[browser] || 0) + 1;
  });
  
  // Location distribution
  const countries = {};
  rows.forEach(row => {
    const country = row[9]; // Country column
    countries[country] = (countries[country] || 0) + 1;
  });
  
  // Dark mode distribution
  const darkModes = {};
  rows.forEach(row => {
    const darkMode = row[20]; // Dark Mode column
    darkModes[darkMode] = (darkModes[darkMode] || 0) + 1;
  });
  
  // Write summary
  summarySheet.getRange(1, 1, 1, 2).setValues([['Metric', 'Value']]);
  summarySheet.getRange(2, 1, 1, 2).setValues([['Total Attempts', totalAttempts]]);
  summarySheet.getRange(3, 1, 1, 2).setValues([['Correct Attempts', correctAttempts]]);
  summarySheet.getRange(4, 1, 1, 2).setValues([['Success Rate', successRate + '%']]);
  
  // Device types
  summarySheet.getRange(6, 1, 1, 2).setValues([['Device Types', 'Count']]);
  let row = 7;
  Object.entries(deviceTypes).forEach(([device, count]) => {
    summarySheet.getRange(row, 1, 1, 2).setValues([[device, count]]);
    row++;
  });
  
  // Browsers
  summarySheet.getRange(row + 1, 1, 1, 2).setValues([['Browsers', 'Count']]);
  row += 2;
  Object.entries(browsers).forEach(([browser, count]) => {
    summarySheet.getRange(row, 1, 1, 2).setValues([[browser, count]]);
    row++;
  });
  
  // Countries
  summarySheet.getRange(row + 1, 1, 1, 2).setValues([['Countries', 'Count']]);
  row += 2;
  Object.entries(countries).forEach(([country, count]) => {
    summarySheet.getRange(row, 1, 1, 2).setValues([[country, count]]);
    row++;
  });
  
  // Dark mode
  summarySheet.getRange(row + 1, 1, 1, 2).setValues([['Dark Mode', 'Count']]);
  row += 2;
  Object.entries(darkModes).forEach(([mode, count]) => {
    summarySheet.getRange(row, 1, 1, 2).setValues([[mode, count]]);
    row++;
  });
  
  // Format summary
  summarySheet.getRange(1, 1, 1, 2).setFontWeight('bold');
  summarySheet.getRange(1, 1, 1, 2).setBackground('#f0f0f0');
  summarySheet.autoResizeColumns(1, 2);
  
  Logger.log('Summary report created successfully!');
}
