import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps {
  title: string;
  backUrl?: string; 
}

export function PageHeader({ title, backUrl }: PageHeaderProps) {
  return (
    <div>
      {/* Mobile Back Button and Title */}
      <div className="md:hidden flex items-center gap-3 mb-6">
        {backUrl && (
          <Link to={backUrl} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        )}
        <h1 className="text-white text-xl font-semibold">{title}</h1>
      </div>

      {/* Desktop Title */}
      <h1 className="hidden md:block text-white text-4xl font-bold mb-8">
        {title}
      </h1>
    </div>
  );
}
