import Input from '../common/Input';
import SearchIcon from '/public/assets/icons/search_input.svg';

export default function SearchInput() {
  return (
    <Input
      wrapperClassName="flex items-center h-[42px]"
      leftIcon={<SearchIcon />}
      placeholder="채팅 내용이나 사용자를 검색하세요"
    />
  );
}
