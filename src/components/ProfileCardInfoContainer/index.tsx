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
    <div
      className="w-full h-[115px] rounded-[14px] p-[19px] bg-white flex flex-col gap-[16px] 
    shadow-[0px_3px_3px_rgba(0,0,0,0.05),_0px_-3px_3px_rgba(0,0,0,0.05),_3px_0px_3px_rgba(0,0,0,0.05),_-3px_0px_3px_rgba(0,0,0,0.05)]"
    >
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
            <div
              key={tag}
              className="text-18px bg-gray3 px-[12px] py-[3px] rounded-[20px]"
            >
              {[tag]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
