interface DetailsSectionProps {
  components: React.ReactNode[];
  containerClassName?: string;
  cardClassName?: string;
  sectionId?: string;
}

export function DetailsSection({
  components,
  containerClassName = "space-y-6",
  cardClassName = "rounded-2xl p-4 sm:p-6 md:p-8",
  sectionId,
}: DetailsSectionProps) {
  return (
    <div data-testid={sectionId} className={containerClassName}>
      {components.map((Component, index) => (
        <div key={index} className={cardClassName}>
          {Component}
        </div>
      ))}
    </div>
  );
}
