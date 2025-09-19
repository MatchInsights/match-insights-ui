interface LeaguesMenuOptionsProps {
  items: string[];
  selectItem: (item: string) => void;
}

export const LeaguesMenuOptions = ({
  items,
  selectItem,
}: LeaguesMenuOptionsProps) => {
  console.log(items);
  return (
    <ul
      aria-label="responsive-grid"
      className={`grid gap-4 grid-cols-1 md:[grid-template-columns:repeat(auto-fit,minmax(200px,1fr))] lg:[grid-template-columns:repeat(5,minmax(0,1fr))]`}
    >
      {items.map((item, i) => (
        <li
          data-testid={item}
          key={`${item}-${i}`}
          className="p-1 rounded-2xl shadow-sm hover:underline hover:text-brand-yellow outline-none"
          tabIndex={0}
        >
          <div className="flex items-center">
            <span
              onClick={() => selectItem(item)}
              className="font-medium text-lg text-brand-white cursor-pointer hover:text-brand-orange"
            >
              {item}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};
