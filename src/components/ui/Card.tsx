interface StatProps {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  iconColor?: string;
}

interface CardProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  stat?: StatProps;
}

export function Card({ children, className = "", onClick, stat }: CardProps) {
  if (stat) {
    return (
      <div
        className={`bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow ${className}`}
      >
        {stat.icon && (
          <div className={`p-4 rounded-xl ${stat.iconColor ?? ""}`}>
            {stat.icon}
          </div>
        )}
        <div>
          <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${className}`}
    >
      {children}
    </div>
  );
}
