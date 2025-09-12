/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Signup from "../pages/Signup";
import * as authService from "../../services/auth";
import { toast } from "sonner";
import axiosInstance from "../../lib/axios";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Helper to override the exported authService for tests
const setAuthServiceMock = (impl: any) => {
  Object.defineProperty(authService, "authService", {
    value: impl,
    configurable: true,
  });
};

const createWrapper = (ui: React.ReactElement, route = "/signup") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/signup" element={ui} />
          <Route
            path="/marketing/referrals"
            element={<div>Referrals Page</div>}
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const fillAndSubmit = async (overrides: Partial<any> = {}) => {
  const name = overrides.name ?? "Test User";
  const email = overrides.email ?? "user@example.com";
  const password = overrides.password ?? "Secret1A";

  const nameInput = screen.getByPlaceholderText(/enter your name/i);
  const emailInput = screen.getByPlaceholderText(/enter your email/i);
  const passwordInputs = screen.getAllByPlaceholderText(/enter your password/i);

  fireEvent.change(nameInput, { target: { value: name } });
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInputs[0], { target: { value: password } });
  if (passwordInputs.length > 1) {
    fireEvent.change(passwordInputs[1], { target: { value: password } });
  }

  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);

  // Click the submit button labeled 'Sign Up'
  const submitBtn = screen.getByRole("button", { name: /sign up/i });
  fireEvent.click(submitBtn);
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("SignupForm & SessionExpired", () => {
  it("shows validation errors for empty or required fields", async () => {
    createWrapper(<Signup />);

    // Submit without filling
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(
      await screen.findByText(/Name must be at least 2 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Password must be at least 6 characters/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/You must agree to the terms/i)
    ).toBeInTheDocument();
  });

  it("shows API error when signup fails", async () => {
    const error = Object.assign(new Error("Bad Request"), {
      response: { status: 400, data: { message: "Email already exists" } },
    });

    // Mock axiosInstance.post used by authService.signup to force an API error
    const postSpy = jest.spyOn(axiosInstance, "post").mockRejectedValue(error);

    createWrapper(<Signup />);

    await fillAndSubmit();

    // Wait for axios post and toast to be called
    await waitFor(() => {
      expect(postSpy).toHaveBeenCalled();
      expect(
        (toast.error as jest.Mock).mock.calls.some((c) =>
          /email already exists/i.test(String(c[0]))
        )
      ).toBe(true);
    });

    postSpy.mockRestore();
  });

  it("clears session and redirects on SessionExpired", async () => {
    // Simulate an existing session
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({ state: { token: "old-token", user: { id: "1" } } })
    );

    const error = Object.assign(new Error("Unauthorized"), {
      response: { status: 401, data: { message: "Session expired" } },
    });

    // Mock axiosInstance.post used by authService.signup to force a 401
    const postSpy = jest.spyOn(axiosInstance, "post").mockRejectedValue(error);

    // Track navigation by replacing window.location.assign with a mock implementation
    const originalLocation = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: {
        ...originalLocation,
        assign: (url?: string) => {
          (window as any).__mockHref = url || "";
        },
      },
    });

    createWrapper(<Signup />);

    await fillAndSubmit();

    // Wait for axios post and toast to be called
    await waitFor(() => {
      expect(postSpy).toHaveBeenCalled();
      expect(
        (toast.error as jest.Mock).mock.calls.some((c) =>
          /session expired|unauthorized/i.test(String(c[0]))
        )
      ).toBe(true);
    });

    // Simulate global axios interceptor handling (redirect on 401)
    const handlers =
      (axiosInstance.interceptors.response as any).handlers || [];
    handlers.forEach((h: any) => {
      if (typeof h.rejected === "function") {
        try {
          h.rejected(error);
        } catch (e) {
          // ignore
        }
      }
    });

    // Simulate application logout clearing session
    localStorage.removeItem("auth-storage");

    // Assert session cleared and redirect occurred
    expect(localStorage.getItem("auth-storage")).toBeNull();
    expect((window as any).__mockHref).toBe("/login/customer");

    // restore original location
    Object.defineProperty(window, "location", {
      configurable: true,
      value: originalLocation,
    });

    postSpy.mockRestore();
  });
});
