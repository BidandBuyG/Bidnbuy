import type { RewardSettingsFormData } from "@/lib/validations/reward-settings-schema";
import type { UseFormRegister } from "react-hook-form";

export type RewardSettingSectionProps = {
  register: UseFormRegister<RewardSettingsFormData>;
  errors: FieldErrors<RewardSettingsFormData>;
}