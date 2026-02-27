interface FormSectionProps {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export function FormSection({ title, action, children }: FormSectionProps) {
  return (
    <div className="border-t pt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-700 font-mono text-sm uppercase">
          {title}
        </h3>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}
