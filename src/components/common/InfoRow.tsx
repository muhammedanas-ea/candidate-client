interface InfoRowProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
  value?: string;
}

export const InfoRow: React.FC<InfoRowProps> = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div className="flex items-start gap-3 p-2">
      <Icon className="w-5 h-5 mt-1 text-gray-500" />
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base">{value}</p>
      </div>
    </div>
  );
};
