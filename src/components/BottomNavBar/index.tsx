'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import ChatIcon from '/src/assets/icons/navBar_chat.svg';
import ChatActiveIcon from '/src/assets/icons/navBar_chat_active.svg';
import CommunityIcon from '/src/assets/icons/navBar_community.svg';
import CommunityActiveIcon from '/src/assets/icons/navBar_community_active.svg';
import HomeIcon from '/src/assets/icons/navBar_home.svg';
import HomeActiveIcon from '/src/assets/icons/navBar_home_active.svg';
import MypageIcon from '/src/assets/icons/navBar_mypage.svg';
import MypageActiveIcon from '/src/assets/icons/navBar_mypage_active.svg';
import NotificationIcon from '/src/assets/icons/navBar_notification.svg';
import NotificationActiveIcon from '/src/assets/icons/navBar_notification_active.svg';

interface Props {
  chatNotificationCount?: number;
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label?: React.ReactNode;
  activeIcon: React.ReactNode;
  isActive: boolean;
  notificationCount?: number;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  icon,
  label,
  activeIcon,
  isActive,
  notificationCount,
}) => (
  <Link
    href={href}
    className={`relative flex flex-col items-center ${
      isActive ? 'text-mainPink1 font-semiBold' : 'text-black'
    }`}
  >
    {notificationCount !== undefined && notificationCount > 0 && (
      <div className="absolute -top-2.5 -right-3 min-w-[17px] h-[17px] px-[3px] bg-mainPink1 rounded-full flex justify-center items-center shadow-md">
        <span className="text-white text-[12px] font-bold flex justify-center items-center">
          {notificationCount > 99 ? '99+' : notificationCount}
        </span>
      </div>
    )}
    {isActive ? activeIcon : icon}
    <span className="text-[12px] mt-1">{label}</span>
  </Link>
);

export default function BottomNavBar({ chatNotificationCount = 0 }: Props) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/pAIring',
      icon: <HomeIcon />,
      activeIcon: <HomeActiveIcon />,
      label: '홈',
      isActive: pathname === '/pAIring',
    },
    {
      href: '/chat',
      icon: <ChatIcon />,
      activeIcon: <ChatActiveIcon />,
      label: '채팅',
      isActive: pathname === '/chat',
      notificationCount: chatNotificationCount,
    },
    {
      href: '/community',
      icon: <CommunityIcon />,
      activeIcon: <CommunityActiveIcon />,
      label: '커뮤니티',
      isActive: pathname === '/community' || pathname === '/community/create',
    },
    {
      href: '/notifications',
      icon: <NotificationIcon />,
      activeIcon: <NotificationActiveIcon />,
      label: '알림',
      isActive: pathname === '/notifications',
    },
    {
      href: '/mypage',
      icon: <MypageIcon />,
      activeIcon: <MypageActiveIcon />,
      label: '마이프로필',
      isActive: pathname === '/mypage',
    },
  ];

  return (
    <div className="w-full">
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[520px]">
        <nav className="bg-white py-3 rounded-tr-3xl rounded-tl-3xl shadow-[0px_-3px_3px_rgba(0,0,0,0.01)]">
          <div className="flex justify-around items-center">
            {navItems.map((item, index) => (
              <NavItem key={index} {...item} />
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
