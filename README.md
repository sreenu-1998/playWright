# Playwright Automation Framework

## Table of Contents

- [Introduction](#introduction)
- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)

## Introduction

This is a basic automation framework built using Playwright for end-to-end testing of web applications. It supports writing and running tests across different browsers like Chrome, Firefox, and WebKit.

## Pre-requisites

Before you begin, ensure that you have the following installed on your machine:
1. Node.js (v14 or higher) 
2. Git (to clone the repository) 

## Installation

### 1. Clone the Repository

First, clone this repository to your local machine:

```
git clone https://github.com/your-username/playwright-framework.git
cd playwright-framework
```
### 2. Install Dependencies
```
npm install
npm install @playwright/test
```
### 3. Install Browsers
```
npx playwright install
```


## Project Structure
```

├── tests/                  # Test scripts
│   └── example.spec.js      # Sample test file
├── test-data/               # Test data files (JSON, CSV, etc.)
│   └── data.json            # Example JSON data file
├── playwright.config.js     # Playwright configuration
├── package.json             # Node.js dependencies and scripts
├── README.md                # Documentation
└── .gitignore               # Git ignore rules
```
## Running Tests

### 1. **Running All Tests:**
```
npx playwright test
```

### 2. **Running a Specific Test:**
```
npx playwright test tests/example.spec.js
```

### 3. **Run Tests in a Specific Browser:**
```
npx playwright test --project=chromium
```

#### 4. **Run Tests in Headed Mode:**
```
npx playwright test --headed
```

### 5. **Generate HTML Reports:**
```
npx playwright show-report
```
