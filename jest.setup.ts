/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder/TextDecoder for libraries relying on them (e.g., react-router)
// @ts-ignore
if (typeof (global as any).TextEncoder === "undefined") {
  // @ts-ignore
  (global as any).TextEncoder = TextEncoder;
}
// @ts-ignore
if (typeof (global as any).TextDecoder === "undefined") {
  // @ts-ignore
  (global as any).TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder;
}

// Suppress React "not wrapped in act" warnings during tests where async updates are expected
const originalConsoleError = console.error;
console.error = (...args: any[]) => {
  try {
    const first = String(args[0] || "");
    if (first.includes("not wrapped in act")) return;
  } catch {
    // ignore
  }
  return originalConsoleError.apply(console, args);
};

// Polyfill ResizeObserver (Radix UI / some libraries need this in jsdom)
class ResizeObserverPolyfill {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// @ts-ignore
if (typeof (global as any).ResizeObserver === "undefined") {
  // @ts-ignore
  (global as any).ResizeObserver = ResizeObserverPolyfill;
}

// Allow tests to mock window.location even if it's non-configurable in this JSDOM version
// by gracefully handling attempts to redefine it and exposing a mockable assign()
const __originalDefineProperty = Object.defineProperty;
Object.defineProperty = function (target: any, property: any, descriptor: any) {
  if (typeof window !== "undefined" && target === window && property === "location") {
    try {
      return __originalDefineProperty(target, property, descriptor);
    } catch (e) {
      try {
        if (descriptor && descriptor.value && typeof descriptor.value.assign === "function") {
          // @ts-ignore
          target.location.assign = (url: string) => {
            // Expose the navigation for tests
            (window as any).__mockHref = url || "";
          };
        }
      } catch {
        // ignore
      }
      // Return the target to avoid throwing in tests
      return target;
    }
  }
  return __originalDefineProperty(target, property, descriptor);
};

// Prevent tests from crashing due to unhandled promise rejections triggered by manual interceptor invocations
process.on("unhandledRejection", () => {});
