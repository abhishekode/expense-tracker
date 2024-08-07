import { BsClipboardData } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { LuPieChart } from 'react-icons/lu';

export const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    pathnameInclude: 'dashboard',
    icon: <LuPieChart className='text-xl' />,
  },
  {
    title: 'Category',
    path: '/category',
    pathnameInclude: 'category',
    icon: <LuPieChart className='text-xl' />,
  },
  {
    title: 'Users',
    path: '/user/',
    pathnameInclude: 'user',
    subLinks: [
      { title: 'Admin', path: '/user/admin/list' },
    ],
    icon: <FaUser className='text-xl'/>,
  },
  {
    title: 'Expense',
    path: '/expense',
    pathnameInclude: 'expense',
    icon: <BsClipboardData className='text-xl' />,
  },
  {
    title: 'Blog',
    path: '/blogs',
    pathnameInclude: 'blogs',
    icon: <BsClipboardData className='text-xl' />,
  },
 
];
