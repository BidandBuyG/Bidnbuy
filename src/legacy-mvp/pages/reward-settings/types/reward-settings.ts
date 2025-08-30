import type { RewardSettingsFormData } from "@/lib/validations/reward-settings-schema";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

export type RewardSettingSectionProps = {
  register: UseFormRegister<RewardSettingsFormData>;
  errors: FieldErrors<RewardSettingsFormData>;
}