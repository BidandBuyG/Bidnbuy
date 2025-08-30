import type { UseFormRegister } from "react-hook-form";

export type RewardSettingSectionProps = {
  register: UseFormRegister<RewardSettingsFormData>;
  errors: FieldErrors<RewardSettingsFormData>;
}