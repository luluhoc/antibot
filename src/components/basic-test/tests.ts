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

  return await new Promise((resolve) => {
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

export const mouseMovementTest = async (): Promise<{ data: string; detected: boolean }> => {
  return await new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      // If no mouse movement detected after 2 seconds, assume it's a bot
      resolve({
        data: 'No mouse movement detected',
        detected: true,
      });
    }, 2000);

    window.addEventListener(
      'pointermove',
      () => {
        // If mouse movement is detected, clear the timeout and assume it's not a bot
        clearTimeout(timeoutId);
        resolve({
          data: 'Mouse movement detected',
          detected: false,
        });
      },
      { once: true },
    );
  });
};

export const interactionSpeedTest = (
  setInteraction: React.Dispatch<
    React.SetStateAction<{
      data: string;
      detected: boolean;
    }>
  >,
): { data: string; detected: boolean } => {
  const startTime = Date.now();

  // This event could be any interaction event like 'click', 'keydown', etc.
  window.addEventListener(
    'mousemove',
    () => {
      const interactionTime = Date.now() - startTime;

      if (interactionTime < 10000) {
        // If interaction happened within 1 second
        setInteraction({
          data: `Interaction happened in ${interactionTime} ms`,
          detected: true,
        });
      } else {
        // If interaction happened after 1 second
        setInteraction({
          data: `Interaction happened in ${interactionTime} ms`,
          detected: false,
        });
      }
    },
    { once: true },
  );

  return {
    data: 'No interaction yet',
    detected: false,
  };
};

export const getComprehensiveBrowserInfo = (): any => {
  let webglVendor: string | undefined;
  let webglRenderer: string | undefined;
  try {
    const canvas = document.createElement('canvas');
    const glContext = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext;
    const debugInfo = glContext.getExtension('WEBGL_debug_renderer_info');
    webglVendor = glContext.getParameter(debugInfo?.UNMASKED_VENDOR_WEBGL ?? 0);
    webglRenderer = glContext.getParameter(debugInfo?.UNMASKED_RENDERER_WEBGL ?? 0);
  } catch (e) {
    webglVendor = undefined;
    webglRenderer = undefined;
  }

  const audioContext = window.AudioContext || (window as any).webkitAudioContext;
  const audioContextFingerprint = audioContext ? new audioContext().destination.maxChannelCount.toString() : 'N/A';

  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0;

  // This would be a synchronous, blocking operation. Use it cautiously!
  const cpuBenchmark = (): number => {
    const start = performance.now();
    for (let i = 0; i < 1e7; i++) {}
    return performance.now() - start;
  };

  return {
    userAgent: navigator.userAgent,
    languages: navigator.languages,
    hardwareConcurrency: navigator.hardwareConcurrency,
    platform: navigator.platform,
    cookiesEnabled: navigator.cookieEnabled,
    doNotTrack: navigator.doNotTrack,
    appVersion: navigator.appVersion,
    appName: navigator.appName,
    product: navigator.product,
    productSub: navigator.productSub,
    vendor: navigator.vendor,
    vendorSub: navigator.vendorSub,
    geolocation: navigator.geolocation,
    screen: {
      width: screen.width,
      height: screen.height,
      colorDepth: screen.colorDepth,
      pixelDepth: screen.pixelDepth,
      orientation: screen.orientation,
    },
    location: window.location,
    localStorage: !!window.localStorage,
    sessionStorage: !!window.sessionStorage,
    indexedDB: 'indexedDB' in window,
    openDatabase: 'openDatabase' in window,
    cpuClass: (navigator as any).cpuClass,
    plugins: Array.from(navigator.plugins),
    mimeTypes: Array.from(navigator.mimeTypes),
    chrome: (window as any).chrome,
    permissions: navigator.permissions,
    mediaDevices: navigator.mediaDevices,
    serviceWorker: navigator.serviceWorker,
    webgl: { vendor: webglVendor, renderer: webglRenderer },
    audioContext: audioContextFingerprint,
    maxTouchPoints: navigator.maxTouchPoints,
    deviceMemory: (navigator as any).deviceMemory,
    videoPlaybackQuality: (document as any).videoPlaybackQuality,
    performanceTiming: window.performance.timing,
    visualViewport: window.visualViewport,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
    outerWidth: window.outerWidth,
    outerHeight: window.outerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    pageXOffset: window.pageXOffset,
    pageYOffset: window.pageYOffset,
    screenX: window.screenX,
    screenY: window.screenY,
    screenLeft: window.screenLeft,
    screenTop: window.screenTop,
    currentTime: new Date().toString(),
    memoryStatus: (window.performance as any).memory,
    devicePixelRatio: window.devicePixelRatio,
    historyLength: window.history.length,
    hasTouch,
    isJavaEnabled: navigator.javaEnabled(),
    onlineStatus: navigator.onLine,
    preferredColorScheme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
    timezoneOffset: new Date().getTimezoneOffset(),
    sessionStorageSize: sessionStorage.length,
    localStorageSize: localStorage.length,
    cookies: document.cookie.split('; ').length,
    cpuBenchmark: cpuBenchmark(),
    // Additional info
    documentCharset: document.charset,
    documentReadyState: document.readyState,
    documentReferer: document.referrer,
    documentLastModified: document.lastModified,
    documentTitle: document.title,
    documentURL: document.URL,
    documentDomain: document.domain,
    documentCookie: document.cookie,
    documentBodyOffsetWidth: document.body.offsetWidth,
    documentBodyOffsetHeight: document.body.offsetHeight,
    documentBodyScrollWidth: document.body.scrollWidth,
    documentBodyScrollHeight: document.body.scrollHeight,
    windowNavigator: window.navigator,
    windowHistory: window.history,
    windowScreen: window.screen,
    windowInnerWidth: window.innerWidth,
    windowInnerHeight: window.innerHeight,
    windowOuterWidth: window.outerWidth,
    windowOuterHeight: window.outerHeight,
    windowPageXOffset: window.pageXOffset,
    windowPageYOffset: window.pageYOffset,
    windowDevicePixelRatio: window.devicePixelRatio,
    windowScreenLeft: window.screenLeft,
    windowScreenTop: window.screenTop,
    windowScrollX: window.scrollX,
    windowScrollY: window.scrollY,
    documentImages: document.images.length,
    documentEmbeds: document.embeds.length,
    documentLinks: document.links.length,
    documentForms: document.forms.length,
    documentScripts: document.scripts.length,
  };
};
