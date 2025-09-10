/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Mock axios to avoid import.meta usage during Jest runs
jest.mock("../../lib/axios", () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
    interceptors: { response: { handlers: [] } },
  },
}));

import MarketerSignup from "../../marketing/pages/Signup";
import * as authService from "../../services/auth";
import { toast } from "sonner";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const setAuthServiceMock = (impl: any) => {
  Object.defineProperty(authService, "authService", {
    value: impl,
    configurable: true,
  });
};

const createWrapper = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={ui} />
          <Route path="/marketing/referrals" element={<div>Referrals Page</div>} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

const proceedToStep2 = async () => {
  fireEvent.click(screen.getByRole("button", { name: /proceed/i }));
  // wait for state input to appear
  await screen.findByPlaceholderText(/state of residence/i);
};

const proceedToStep3 = async () => {
  await proceedToStep2();
  fireEvent.click(screen.getByRole("button", { name: /proceed/i }));
  // wait for nin input to appear
  await screen.findByPlaceholderText(/nin/i);
};

const fillStep1 = () => {
  fireEvent.change(screen.getByPlaceholderText(/enter your first name/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your last name/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
    target: { value: "john@example.com" },
  });
};

const fillStep2 = () => {
  fireEvent.change(screen.getByPlaceholderText(/state of residence/i), {
    target: { value: "LA" },
  });
  const address = screen.getByPlaceholderText(/your address/i);
  fireEvent.change(address, { target: { value: "123 Main St" } });
};

const fillStep3 = () => {
  fireEvent.change(screen.getByPlaceholderText(/nin/i), {
    target: { value: "12345678901" },
  });
};

const submitFinal = () => {
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
};

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

describe("MarketingSignup", () => {
  it("shows validation errors for empty or required fields", async () => {
    createWrapper(<MarketerSignup />);

    // Try to go to next step without filling anything
    fireEvent.click(screen.getByRole("button", { name: /proceed/i }));

    expect(
      await screen.findAllByText(/minimum of 2 characters is required/i)
    ).toHaveLength(2);
    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
  });

  it("shows unique email error on submit", async () => {
    const signupSpy = jest
      .spyOn(authService.authService, "signupMarketer")
      .mockRejectedValue(
        Object.assign(new Error("Bad Request"), {
          response: { status: 400, data: { message: "Email already exists" } },
        })
      );

    const getReferralSpy = jest
      .spyOn(authService.authService, "getMarketingReferralLink")
      .mockResolvedValue({ referralCode: "", referralLink: "" });

    createWrapper(<MarketerSignup />);
    fillStep1();
    await proceedToStep2();
    fillStep2();
    await proceedToStep3();
    fillStep3();
    submitFinal();

    await waitFor(() => {
      expect((toast.error as jest.Mock).mock.calls.length).toBeGreaterThan(0);
    });

    signupSpy.mockRestore();
    getReferralSpy.mockRestore();
  });

  it("displays referral code and link on success", async () => {
    const referral = { referralCode: "ABC123", referralLink: "https://example.com/ref/ABC123" };

    const signupSpy = jest
      .spyOn(authService.authService, "signupMarketer")
      .mockResolvedValue({
        success: true,
        message: "ok",
        token: "t",
        user: { id: "u1", email: "john@example.com", name: "John", role: "customer" },
      });

    const referralSpy = jest
      .spyOn(authService.authService, "getMarketingReferralLink")
      .mockResolvedValue(referral);

    createWrapper(<MarketerSignup />);
    fillStep1();
    await proceedToStep2();
    fillStep2();
    await proceedToStep3();
    fillStep3();
    submitFinal();

    // Step 4 UI visible with referral code split in two parts
    expect(await screen.findByText(/proceed to dashboard/i)).toBeInTheDocument();
    expect(screen.getByText("ABC")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();

    // Toast called (contains referral code/link content in the React element)
    expect((toast.success as jest.Mock).mock.calls.length).toBeGreaterThan(0);

    signupSpy.mockRestore();
    referralSpy.mockRestore();
  });
});
