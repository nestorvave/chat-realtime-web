export interface ITextInput {
  ariaLabel?: string;
  autoFocus?: boolean;
  className?: string;
  id: string;
  isRequired?: boolean;
  label?: string;
  name: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  placeholder?: string;
  readOnly?: boolean;
  type: "text" | "textarea" | "password";
  value: string;
  disabled?: boolean;
  rows?: number;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}
const TextInput = (props: ITextInput) => {
  const {
    ariaLabel,
    autoFocus,
    className,
    id,
    isRequired,
    label,
    name,
    onChange,
    placeholder,
    readOnly,
    type = "text",
    value,
    disabled = false,
    rows = 4,
    onBlur,
    onKeyPress,
  } = props;

  const inputClass = `${className && className} p-2 px-3 block resize-none  
    w-full text-base text-main focus:outline-none shadow-inputDefault focus:shadow-input bg-grayDark text-whiteDark rounded-2xl pl-5`;

  return (
    <div className="w-full">
      {(label || isRequired) && (
        <label
          htmlFor={id}
          className="mb-[8px] block pl-1 text-base text-white"
        >
          {label}
          {isRequired && <span className="text-logo pl-1 text-xl">*</span>}
        </label>
      )}
      <div>
        {type === "textarea" ? (
          <textarea
            id={id}
            className={inputClass}
            placeholder={placeholder}
            required={isRequired}
            name={name}
            onChange={onChange}
            value={value}
            aria-label={ariaLabel}
            readOnly={readOnly}
            autoFocus={autoFocus}
            style={{ outline: "none" }}
            disabled={disabled}
            rows={rows}
          />
        ) : (
          <input
            type={type}
            id={id}
            className={inputClass}
            placeholder={placeholder}
            required={isRequired}
            name={name}
            onChange={onChange}
            value={value}
            aria-label={ariaLabel}
            readOnly={readOnly}
            autoFocus={autoFocus}
            style={{ outline: "none" }}
            disabled={disabled}
            onKeyDown={onKeyPress}
            onBlur={onBlur}
          />
        )}
      </div>
    </div>
  );
};

export default TextInput;
