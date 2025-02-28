interface Props {
  onClick: () => void;
  icon: React.ReactNode;
  text: string;
  bgColor: string;
  textColor: string;
}

export default function OAuthButton({
  onClick,
  icon,
  text,
  bgColor,
  textColor,
}: Props) {
  return (
    <button
      type="button"
      className={`w-full rounded-[14px] h-14 ${bgColor} ${textColor} flex items-center justify-center gap-[10px] font-18-medium`}
      onClick={onClick}
    >
      {icon}
      {text}
    </button>
  );
}
