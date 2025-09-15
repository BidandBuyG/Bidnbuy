/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../pages/Login";
import * as authService from "../../../services/auth";
import { toast } from "sonner";
import { jest } from "@jest/globals";


jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock image assets used by LoginForm
jest.mock("../../../assets/google.png", () => "google.png");
jest.mock("../../../assets/x.png", () => "x.png");

// Helper to override the exported authService for tests
const setAuthServiceMock = (impl: any) => {
  Object.defineProperty(authService, "authService", {
    value: impl,
    configurable: true,
  });
};

const createWrapper = (ui: React.ReactElement, route = "/login") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={ui} />
          <Route
            path="/marketing/referrals"
            element={<div>Referrals Page</div>}
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const fillAndSubmit = async (
  email = "user@example.com",
  password = "secret1"
) => {
  const emailInput = screen.getByPlaceholderText(/enter your email/i);
  const passwordInput = screen.getByPlaceholderText(/enter your password/i);
  fireEvent.change(emailInput, { target: { value: email } });
  fireEvent.change(passwordInput, { target: { value: password } });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("LoginForm", () => {
  test("shows validation errors for required fields when empty", async () => {
    setAuthServiceMock({ login: jest.fn() } as any);

    createWrapper(<Login />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password must be at least 6 characters/i)
    ).toBeInTheDocument();
  });

  test("disables button while submitting", async () => {
    let resolveLogin: (v: any) => void = () => {};
    const loginPromise = new Promise((res) => {
      resolveLogin = res as (v: any) => void;
    });

    setAuthServiceMock({ login: jest.fn(() => loginPromise) } as any);

    createWrapper(<Login />);

    await fillAndSubmit();

    const loadingBtn = await screen.findByRole("button", {
      name: /logging in/i,
    });
    expect(loadingBtn).toBeDisabled();

    (resolveLogin as any)({
      success: true,
      message: "ok",
      user: {
        id: "1",
        email: "user@example.com",
        name: "User",
        phoneNumber: "123",
        role: "customer",
      },
    });
  });

  test("shows API error on 401", async () => {
    const error = Object.assign(new Error("Unauthorized"), {
      response: { status: 401, data: { message: "Invalid credentials" } },
    });

    setAuthServiceMock({ login: jest.fn(() => Promise.reject(error)) } as any);

    createWrapper(<Login />);

    await fillAndSubmit();

    await waitFor(() => {
      expect(
        (toast.error as jest.Mock).mock.calls.some((c) =>
          /invalid credentials/i.test(String(c[0]))
        )
      ).toBe(true);
    });
  });

  test("saves token and redirects on success", async () => {
    setAuthServiceMock({
      login: jest.fn(() =>
        Promise.resolve({
          success: true,
          message: "ok",
          user: {
            id: "1",
            email: "user@example.com",
            name: "User",
            phoneNumber: "123",
            role: "vendor",
          },
        })
      ),
    } as any);

    createWrapper(<Login />);

    await fillAndSubmit();

    expect(await screen.findByText(/referrals page/i)).toBeInTheDocument();

    await waitFor(() => {
      const raw = localStorage.getItem("auth-storage");
      expect(raw).toBeTruthy();
      const parsed = JSON.parse(raw as string);
      const token = parsed?.state?.token;
      expect(token).toBeTruthy();
    });
  });
});
