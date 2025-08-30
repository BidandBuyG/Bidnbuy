import type React from "react"

/**
 * @file components/reward-settings/settings-section.tsx
 * @description Section wrapper component for grouping related settings.
 */

/**
 * Props for the SettingsSection component.
 * @typedef {Object} SettingsSectionProps
 * @property {string} title - The section title.
 * @property {React.ReactNode} children - The section content.
 * @property {string} [className] - Additional CSS classes.
 */

type SettingsSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
}

/**
 * SettingsSection component provides a wrapper for grouping related settings.
 * @param {SettingsSectionProps} props - The component props.
 * @returns {JSX.Element} The rendered settings section.
 */
const SettingsSection = ({ title, children, className = "" }: SettingsSectionProps) => (
    <div className={`mb-8 ${className}`}>
      <h2 className="text-white text-lg md:text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  )
}

export default SettingsSection;