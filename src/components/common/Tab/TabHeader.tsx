interface TabHeaderProps {
  children: React.ReactNode;
}

export default function TabHeader({ children }: TabHeaderProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <ul className="flex w-full">{children}</ul>
    </div>
  );
}
