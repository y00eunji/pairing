interface Props {
  icon: React.ReactNode;
  title: string;
  description?: string;
  tags?: string[];
}

export default function ProfileCardInfoContainer({
  icon,
  title,
  description,
  tags,
}: Props) {
  return (
    <div className="w-full h-[115px] shadow-md rounded-[14px] p-[19px] bg-white flex flex-col gap-[16px]">
      {/* 제목 */}
      <div className="flex items-center space-x-[10px] h-[24px] text-20px text-mainPink1 font-medium">
        <div>{icon}</div>
        <div>{title}</div>
      </div>
      {/* 설명 */}
      {description && <div className="text-18px">{description}</div>}
      {/* 태그 */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-[10px]">
          {tags.map((tag) => (
            <div className="text-18px bg-gray3 px-[12px] py-[3px] rounded-[20px]">
              {tag}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
