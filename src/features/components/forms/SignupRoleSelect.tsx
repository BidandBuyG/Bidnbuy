/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import AuthTemplate from "../AuthCardTemplate";
import { getSlideClass } from "../../lib/utils";
import VendorImage from "../../../features/assets/vendor.png";
import MarketerImage from "../../../features/assets/affiliate.png";
import Customer from "../../../features/assets/customer.png";
import { Button } from "../../../components/ui/button";

interface LoginFormProps {
  // onSubmit: (values: LoginFormValues) => void;
  isLoading?: boolean;
  cta?: string;
  slideFrom?: "left" | "right";
}

const ROLES = [
  {
    value: "customer",
    label: "Customer",
    image: Customer,
  },
  {
    value: "vendor",
    label: "Vendor",
    image: VendorImage,
  },
  {
    value: "affiliate",
    label: "Affiliate",
    image: MarketerImage,
  },
];

export default function SignUpRoleSelect({
  // onSubmit,
  cta = "Login",
  slideFrom = "right",
}: LoginFormProps) {
  const [showFieldsShake, setShowFieldsShake] = useState(false);

  const [slideIn, setSlideIn] = useState(false);

  useEffect(() => {
    // Immediately set initial slide (offscreen)
    setSlideIn(false);
    // Then slide in after a tick
    const slideTimer = setTimeout(() => setSlideIn(true), 50);
    const shakeTimer = setTimeout(() => setShowFieldsShake(true), 500);
    return () => {
      clearTimeout(slideTimer);
      clearTimeout(shakeTimer);
    };
  }, []);

  const fieldsTranslateClass = getSlideClass(slideIn, slideFrom);

  const fieldsShakeClass = showFieldsShake ? "animate-shake" : "";
  const [selected, setSelected] = useState<string>(ROLES[0].value);
  return (
    <AuthTemplate
      title="Sign up as"
      description="Join now and start bidding, buying, and selling with confidence."
      slideFrom="right"
      cta={cta}
      // loading={form.formState.isSubmitting || isLoading}
      footer={
        <span>
          New here?
          <a
            href="/signup"
            className="text-[#EE9F05] underline underline-offset-4 hover:text-[#b89e6a]"
          >
            {" "}
            Create an account
          </a>
        </span>
      }
    >
      <div className="max-w-lg mx-auto w-full">
        <div
          className={`flex gap-8 justify-center mb-12 ${fieldsTranslateClass} ${fieldsShakeClass}`}
        >
          {ROLES.map((role) => (
            <button
              type="button"
              key={role.value}
              onClick={() => setSelected(role.value)}
              className={`relative w-[150px] h-[152px] rounded-md overflow-hidden shadow-lg flex flex-col items-center justify-end transition-all
                ${
                  selected === role.value
                    ? "border-4 border-yellow-500"
                    : "border-0"
                }`}
              style={{
                boxShadow:
                  selected === role.value ? "0 0 0 4px #f6a70044" : undefined,
              }}
            >
              <img
                src={role.image}
                alt={role.label}
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              />
              <span className="relative z-10 text-white text-base font-semibold mb-8 drop-shadow-lg">
                {role.label}
              </span>
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/25 z-0"></div>
            </button>
          ))}
        </div>
        <Button
          type="button"
          className="w-full bg-[#EE9F05] hover:bg-[#b89e6a] h-12 mb-[1em] transition"
          // onClick={() => onProceed?.(selected)}
        >
          Proceed
        </Button>
      </div>
    </AuthTemplate>
  );
}
