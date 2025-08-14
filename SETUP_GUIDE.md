# Comprehensive User Data Collection & Password Game Setup Guide

This guide will help you set up a comprehensive user data collection system that logs detailed user information along with password attempts to Google Sheets.

## 🎯 **What Data is Collected:**

### **1. IP Address & Location Data**
- IP Address
- City (approximate location)
- Region/State
- Country
- ISP (Internet Service Provider)

### **2. Browser Fingerprinting**
- Browser type & version (Chrome, Firefox, Safari, Edge)
- Full User Agent string
- Language settings
- Timezone information
- Cookie settings

### **3. Device Information**
- Device type (Mobile, Tablet, Desktop/Laptop)
- Operating System (Windows, macOS, Android, iOS, Linux)
- Screen resolution
- Color depth
- Pixel ratio

### **4. Advanced Fingerprinting**
- Canvas fingerprint (unique browser rendering)
- WebGL vendor & renderer
- Available fonts count
- Hardware concurrency (CPU cores)

## 📋 **Setup Instructions:**

### **Step 1: Create a Google Sheet**

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Note the Sheet ID from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`
   - Copy the `YOUR_SHEET_ID_HERE` part

### **Step 2: Set up Google Apps Script**

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the contents of `google-apps-script.js`
4. **Important**: Replace `'YOUR_SHEET_ID'` with your actual Sheet ID from Step 1
5. Save the project with a name like "Comprehensive User Data Logger"

### **Step 3: Deploy as Web App**

1. Click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click "Deploy"
5. Authorize the app when prompted
6. Copy the Web App URL (it will look like: `https://script.google.com/macros/s/...`)

### **Step 4: Connect to Your Webpage**

1. Open your `index.html` file in a web browser
2. Scroll down to the "Google Sheets Integration Setup" section
3. Paste the Web App URL from Step 3 into the input field
4. Click "Connect to Sheets"
5. You should see "Google Sheets: Connected" status

### **Step 5: Test the Integration**

1. The page will automatically collect all user data when loaded
2. Try guessing the password a few times
3. Check your Google Sheet - you should see new rows with comprehensive data
4. Each row will contain 26 columns of detailed information

## 📊 **Data Structure in Google Sheets:**

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | When the attempt was made | 2024-01-15T10:30:45.123Z |
| Password Guess | The password that was guessed | "password123" |
| Similarity % | How similar to correct password | "45%" |
| Feedback | Helpful message about the guess | "Quite different, but you're on the right track." |
| Attempt # | Which attempt number this was | 3 |
| Correct? | TRUE if correct, FALSE if incorrect | FALSE |
| IP Address | User's IP address | "192.168.1.100" |
| City | Approximate city location | "New York" |
| Region/State | State or region | "New York" |
| Country | Country name | "United States" |
| ISP | Internet Service Provider | "Comcast Cable" |
| Browser | Browser name | "Chrome" |
| Browser Version | Browser version number | "120.0" |
| User Agent | Full browser user agent | "Mozilla/5.0..." |
| Language | Browser language | "en-US" |
| Timezone | User's timezone | "America/New_York" |
| Device Type | Mobile/Tablet/Desktop | "Desktop" |
| Operating System | OS name | "Windows" |
| Screen Resolution | Screen dimensions | "1920x1080" |
| Color Depth | Color depth in bits | 24 |
| Pixel Ratio | Device pixel ratio | 1 |
| Canvas Fingerprint | Unique canvas fingerprint | "data:image/png;base64..." |
| WebGL Vendor | WebGL vendor string | "Intel Inc." |
| WebGL Renderer | WebGL renderer string | "Intel Iris OpenGL Engine" |
| Available Fonts | Number of detected fonts | 15 |
| Hardware Concurrency | CPU cores available | 8 |

## 🔧 **Advanced Features:**

### **Automatic Data Collection**
- All user data is collected automatically when the page loads
- No user interaction required for data collection
- Real-time display of collected information

### **Browser Fingerprinting**
- Canvas fingerprinting for unique device identification
- WebGL fingerprinting for graphics card identification
- Font detection for additional uniqueness
- Hardware concurrency detection

### **Location Services**
- IP-based geolocation using ipapi.co service
- City, region, country, and ISP information
- Timezone detection for regional analysis

### **Device Detection**
- Automatic device type detection (Mobile/Tablet/Desktop)
- Operating system detection
- Screen resolution and pixel ratio analysis

### **Summary Reports**
- Run `createSummaryReport()` function in Apps Script
- Creates a separate "Summary" sheet with statistics
- Shows device type, browser, and country distributions

## 🛠 **Troubleshooting:**

### **If you see "Google Sheets: Connection Error":**

1. Check that your Sheet ID is correct in the Apps Script
2. Make sure the Google Sheet is accessible (not private)
3. Verify the Web App URL is correct
4. Check that the Apps Script is deployed as a web app

### **If data isn't appearing in the sheet:**

1. Open the Apps Script editor
2. Go to "Executions" in the left sidebar
3. Check for any error messages
4. Run the `setupSheet()` function manually to create headers

### **If location data shows "Unknown":**

1. The ipapi.co service might be temporarily unavailable
2. User might be using a VPN or proxy
3. Network restrictions might block the API call

### **To manually set up the sheet headers:**

1. In the Apps Script editor, run the `setupSheet()` function
2. This will create all 26 column headers and format them

### **To create a summary report:**

1. In the Apps Script editor, run the `createSummaryReport()` function
2. This will create a "Summary" sheet with statistics

## 🔒 **Privacy & Security Notes:**

- **IP Addresses**: Logged for security and location analysis
- **Browser Fingerprints**: Used for device identification
- **Location Data**: Approximate city-level location only
- **No Personal Data**: No names, emails, or personal information collected
- **Password Security**: Only similarity analysis, not actual passwords stored

## 📈 **Analytics & Insights:**

The collected data can provide insights into:
- **Geographic distribution** of users
- **Device preferences** (mobile vs desktop)
- **Browser market share** among your users
- **Password guessing patterns** and success rates
- **User behavior** across different devices and locations

## 🚀 **Getting Started:**

1. Follow the setup steps above
2. Test with a few password attempts
3. Check your Google Sheet for comprehensive data
4. Run the summary report for analytics
5. Monitor the data collection in real-time

The system now provides comprehensive user data collection with detailed fingerprinting, location tracking, and device analysis - all logged to Google Sheets with timestamps!
