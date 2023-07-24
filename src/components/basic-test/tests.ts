/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { has } from '../../helpers';

export const userAgentTest = (): {
  data: string;
  detected: boolean;
} => {
  if (
    navigator.userAgent.includes('puppeteer') ||
    navigator.userAgent.includes('HeadlessChrome') ||
    navigator.userAgent.includes('Headless')
  ) {
    return {
      data: navigator.userAgent,
      detected: true,
    };
  }
  return {
    data: navigator.userAgent,
    detected: false,
  };
};

export const webDriverTest = (): {
  data: string;
  detected: boolean;
} => {
  if (navigator.webdriver || has(navigator, 'webdriver')) {
    return {
      data: 'Detected webdriver',
      detected: true,
    };
  }
  return {
    data: 'No webdriver detected (passed)',
    detected: false,
  };
};

export const advancedWebDriverTest = (): { data: string; detected: boolean } => {
  const documentDetectionKeys: string[] = [
    '__webdriver_evaluate',
    '__selenium_evaluate',
    '__webdriver_script_function',
    '__webdriver_script_func',
    '__webdriver_script_fn',
    '__fxdriver_evaluate',
    '__driver_unwrapped',
    '__webdriver_unwrapped',
    '__driver_evaluate',
    '__selenium_unwrapped',
    '__fxdriver_unwrapped',
    '_Selenium_IDE_Recorder',
    '_selenium',
    'calledSelenium',
    '_WEBDRIVER_ELEM_CACHE',
    'ChromeDriverw',
    'driver-evaluate',
    'webdriver-evaluate',
    'selenium-evaluate',
    'webdriverCommand',
    'webdriver-evaluate-response',
    '__webdriverFunc',
    '__webdriver_script_fn',
    '__$webdriverAsyncExecutor',
    '__lastWatirAlert',
    '__lastWatirConfirm',
    '__lastWatirPrompt',
    '$chrome_asyncScriptInfo',
    '$cdc_asdjflasutopfhvcZLmcfl_',
  ];

  const windowDetectionKeys: string[] = [
    '_phantom',
    '__nightmare',
    '_selenium',
    'callPhantom',
    'callSelenium',
    '_Selenium_IDE_Recorder',
  ];

  for (const windowDetectionKey of windowDetectionKeys) {
    if ((window as any)[windowDetectionKey]) {
      return {
        data: `Detected webdriver through window key: ${windowDetectionKey}`,
        detected: true,
      };
    }
  }

  for (const documentDetectionKey of documentDetectionKeys) {
    if ((window.document as any)[documentDetectionKey]) {
      return {
        data: `Detected webdriver through document key: ${documentDetectionKey}`,
        detected: true,
      };
    }
  }

  for (const documentKey in window.document) {
    if (documentKey.match(/\$[a-z]dc_/) != null && (window.document as any)[documentKey].cache_) {
      return {
        data: `Detected webdriver through document key with cache: ${documentKey}`,
        detected: true,
      };
    }
  }

  // deprecated
  if (window.external && window.external.toString && window.external.toString().includes('Sequentum')) {
    return {
      data: `Detected webdriver through external toString`,
      detected: true,
    };
  }

  const documentElement = window.document.documentElement;
  if (
    documentElement.getAttribute('selenium') ||
    documentElement.getAttribute('webdriver') ||
    documentElement.getAttribute('driver')
  ) {
    return {
      data: `Detected webdriver through document element attribute`,
      detected: true,
    };
  }

  return {
    data: 'No webdriver detected (passed)',
    detected: false,
  };
};

export const isChromeTest = (): { data: string; detected: boolean } => {
  const isChrome = navigator.userAgent.includes('Chrome') && navigator.vendor.includes('Google Inc.');

  if (isChrome) {
    return {
      data: 'Detected Chrome',
      detected: false,
    };
  }

  return {
    data: 'Not Chrome',
    detected: true,
  };
};
