import PlusIcon from '/src/assets/icons/plus.svg';

export default function PlusButton() {
  return (
    <button
      className="flex items-center justify-center bg-white/80 rounded-full size-[62px] p-4
    shadow-[0px_5px_5px_rgba(0,0,0,0.01),_0px_-5px_5px_rgba(0,0,0,0.01),_5px_0px_5px_rgba(0,0,0,0.01),_-5px_0px_5px_rgba(0,0,0,0.01)]"
    >
      <PlusIcon />
    </button>
  );
}
