interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "ghost";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 rounded px-4 py-2",
    danger: "text-red-600 hover:text-red-800 font-semibold",
    ghost: "text-gray-600 hover:text-gray-800 px-4 py-2",
  };

  return (
    <button
      className={`${styles[variant]} font-semibold transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
