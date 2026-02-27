interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-2 text-lg text-gray-600">{subtitle}</p>}
        <div className="h-1.5 w-20 bg-blue-600 mt-4 rounded-full" />
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
