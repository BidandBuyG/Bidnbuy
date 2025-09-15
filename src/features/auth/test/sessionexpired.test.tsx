/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../../lib/axios";
import { useAuthStore } from "../../../store/auth";

describe("SessionExpired", () => {
  it("dispatches sessionExpired and redirects", () => {
    // Arrange: ensure there's an authenticated session
    useAuthStore.getState().setAuth("old-token", {
      id: "1",
      email: "user@example.com",
      name: "Test User",
      role: "customer",
    } as any);

    // Persisted storage should exist
    expect(localStorage.getItem("auth-storage")).not.toBeNull();

    // Spy on the logout method so we can assert it was called
    const logoutSpy = jest.spyOn(useAuthStore.getState(), "logout");

    const error = Object.assign(new Error("Unauthorized"), {
      response: { status: 401, data: { message: "Session expired" } },
    });

    // Act: trigger the response interceptor handlers (simulate a 401)
    const handlers = (axiosInstance.interceptors.response as any).handlers || [];
    handlers.forEach((h: any) => {
      if (typeof h.rejected === "function") {
        try {
          h.rejected(error);
        } catch (e) {
          // ignore test-time invocation errors
        }
      }
    });

    // Assert: logout should have been called and storage cleared
    expect(logoutSpy).toHaveBeenCalled();
    expect(localStorage.getItem("auth-storage")).toBeNull();

    // In our test-friendly interceptor we set __mockHref on window for redirects
    expect((window as any).__mockHref).toBe("/login");

    logoutSpy.mockRestore();
  });
});
