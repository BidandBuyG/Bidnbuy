/**
 * Props for the ToggleSwitch component.
 * @typedef {Object} ToggleSwitchProps
 * @property {boolean} enabled - Whether the toggle is enabled.
 * @property {(enabled: boolean) => void} onToggle - Callback when toggle state changes.
 * @property {string} [className] - Additional CSS classes.
 */


type ToggleSwitchProps = {
  enabled: boolean
  onToggle: (enabled: boolean) => void
  className?: string
}

/**
 * ToggleSwitch component provides a custom toggle switch.
 * @param {ToggleSwitchProps} props - The component props.
 * @returns {JSX.Element} The rendered toggle switch.
 */

const ToggleSwitch = ({ enabled, onToggle, className = "" }: ToggleSwitchProps) => (
  <>
  
    <button
      onClick={() => onToggle(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#00707B] focus:ring-offset-2 ${
        enabled ? "bg-[#00707B]" : "bg-gray-600"
      } ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  </>
  
)

export default ToggleSwitch;
