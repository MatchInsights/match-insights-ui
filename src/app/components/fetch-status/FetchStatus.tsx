interface FetchStatusProps {
  type: "loading" | "error" | "empty" | "info";
  message: string;
  className?: string;
}

const baseStyles = {
  loading: "text-brand-lightGray",
  error: "text-brand-danger",
  empty: "text-brand-yellow",
  info: "text-brand-white",
};

export default function FetchStatus({
  type,
  message,
  className = "",
}: FetchStatusProps) {
  return (
    <div
      className={`p-6 text-center text-lg font-medium ${baseStyles[type]} ${className}`}
    >
      {message}
    </div>
  );
}
