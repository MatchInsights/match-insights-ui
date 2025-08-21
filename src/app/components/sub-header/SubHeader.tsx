import { useNavigate } from "react-router-dom";

interface SubHeaderProps {
  title: string;
}

export default function SubHeader({ title }: SubHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full flex justify-between items-center flex-wrap gap-2 m-4 mr-6">
      <h2 className="text-brand-orange text-lg md:text-2xl m-4 font-semibold">
        {title}
      </h2>
      <button
        onClick={handleBack}
        className="flex items-center gap-1 text-brand-orange hover:text-brand-yellow transition text-sm md:text-base"
      >
        <span className="text-5xl mr-6">&larr;</span>
      </button>
    </div>
  );
}
