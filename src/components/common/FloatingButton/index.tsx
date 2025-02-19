import FloatingDirectIcon from '/src/assets/icons/floating_direct.svg';
import FloatingHeartIcon from '/src/assets/icons/floating_heart.svg';

interface Props {
  onClickDirect: () => void;
  onClickHeart: () => void;
}

export default function FloatingButton({ onClickDirect, onClickHeart }: Props) {
  return (
    <div className="bottom-10 right-[19px] flex gap-[13px]">
      <button onClick={onClickDirect}>
        <FloatingDirectIcon />
      </button>
      <button onClick={onClickHeart}>
        <FloatingHeartIcon />
      </button>
    </div>
  );
}
