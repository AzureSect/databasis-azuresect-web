interface BadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "red";
}

export function Badge({ children, variant = "blue" }: BadgeProps) {
  const styles = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    red: "bg-rose-100 text-rose-700",
  };

  return (
    <span
      className={`${styles[variant]} px-3 py-1 rounded-full text-xs font-bold`}
    >
      {children}
    </span>
  );
}
