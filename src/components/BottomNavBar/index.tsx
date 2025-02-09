import Link from 'next/link';
import ChatIcon from '/public/assets/icons/navBar_chat.svg';
import ChatActiveIcon from '/public/assets/icons/navBar_chat_active.svg';
import CommunityIcon from '/public/assets/icons/navBar_community.svg';
import CommunityActiveIcon from '/public/assets/icons/navBar_community_active.svg';
import HomeIcon from '/public/assets/icons/navBar_home.svg';
import HomeActiveIcon from '/public/assets/icons/navBar_home_active.svg';
import MypageIcon from '/public/assets/icons/navBar_mypage.svg';
import MypageActiveIcon from '/public/assets/icons/navBar_mypage_active.svg';
import NotificationIcon from '/public/assets/icons/navBar_notification.svg';
import NotificationActiveIcon from '/public/assets/icons/navBar_notification_active.svg';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label?: any;
  activeIcon: React.ReactNode;
  isActive: boolean;
  hasNotification?: boolean;
  notificationCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  label,
  activeIcon,
  isActive,
  hasNotification,
  notificationCount,
}) => (
  <Link
    href={href}
    className={`relative flex flex-col items-center ${isActive ? 'text-mainPink1 font-semiBold' : 'text-black'}`}
  >
    {notificationCount && notificationCount > 0 && (
      <div className="absolute -top-2 -right-3 w-[17px] h-[17px] px-[6px] py-[2px] bg-mainPink1 rounded-full flex justify-center items-center shadow-md">
        <span className="text-white text-[12px] font-bold">
          {notificationCount > 99 ? '99+' : notificationCount}
        </span>
      </div>
    )}
    {hasNotification && (
      <span className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-mainPink1 rounded-full" />
    )}
    {isActive ? activeIcon : icon}
    <span className="text-[12px] mt-1">{label}</span>
  </Link>
);

export default function BottomNavBar() {
  const navItems = [
    {
      href: '#',
      icon: <HomeIcon />,
      activeIcon: <HomeActiveIcon />,
      label: '홈',
      isActive: false,
    },
    {
      href: '#',
      icon: <ChatIcon />,
      activeIcon: <ChatActiveIcon />,
      label: '채팅',
      isActive: false,
      notificationCount: 10,
    },
    {
      href: '#',
      icon: <CommunityIcon />,
      activeIcon: <CommunityActiveIcon />,
      label: '커뮤니티',
      isActive: false,
    },
    {
      href: '#',
      icon: <NotificationIcon />,
      activeIcon: <NotificationActiveIcon />,
      label: '알림',
      isActive: false,
      hasNotification: true,
    },
    {
      href: '#',
      icon: <MypageIcon />,
      activeIcon: <MypageActiveIcon />,
      label: '마이프로필',
      isActive: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-3 pb-4 rounded-r-3xl rounded-l-3xl">
      <div className="flex justify-around items-center max-w-md mx-3 ">
        {navItems.map((item, index) => (
          <NavItem key={index} {...item} />
        ))}
      </div>
    </nav>
  );
}
