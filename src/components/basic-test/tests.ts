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

export const isPluginsTypePluginArray = (): { data: string; detected: boolean } => {
  const isPluginArray = navigator.plugins instanceof PluginArray;

  if (isPluginArray) {
    return {
      data: 'navigator.plugins is of type PluginArray',
      detected: false,
    };
  }

  return {
    data: 'navigator.plugins is not of type PluginArray',
    detected: true,
  };
};

export const languagesTest = (): { data: string; detected: boolean } => {
  const primaryLanguage = navigator.language;
  const languages = navigator.languages;

  if (primaryLanguage && languages) {
    return {
      data: `Primary language is ${primaryLanguage}. User's preferred languages are ${languages.join(',')}`,
      detected: false,
    };
  }

  return {
    data: 'Unable to detect languages.',
    detected: true,
  };
};

export const webGLVendorTest = (): { data: string; detected: boolean } => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl && gl instanceof WebGLRenderingContext) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    if (debugInfo) {
      const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);

      return {
        data: `${vendor}`,
        detected: false,
      };
    }
  }

  return {
    data: 'Unable to detect WebGL vendor',
    detected: true,
  };
};

export const webGLRendererTest = (): { data: string; detected: boolean } => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  if (gl && gl instanceof WebGLRenderingContext) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');

    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

      return {
        data: `${renderer}`,
        detected: false,
      };
    }
  }

  return {
    data: 'Unable to detect WebGL renderer',
    detected: true,
  };
};

export const brokenImageDimensionsTest = async (): Promise<{
  data: string;
  detected: boolean;
}> => {
  const img = new Image();
  img.src = 'http://example.com/non-existent-image.jpg';

  return await new Promise((resolve, reject) => {
    img.onerror = () => {
      // Image load failed (likely broken), return dimensions
      resolve({
        data: `Image dimensions are width: ${img.width}, height: ${img.height}`,
        detected: img.width === 0 && img.height === 0,
      });
    };

    img.onload = () => {
      // This should never happen for a non-existent image
      resolve({
        data: 'Unexpectedly, the image loaded successfully',
        detected: false,
      });
    };

    setTimeout(() => {
      resolve({
        data: 'Image loading timed out',
        detected: false,
      });
    }, 5000); // 5 seconds timeout
  });
};
