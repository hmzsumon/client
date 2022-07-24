import {
  AiFillSetting,
  AiOutlineDownload,
  AiOutlineUpload,
} from 'react-icons/ai';
import { BsHeadset, BsListTask } from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';
import {
  MdOutlineDashboard,
  MdOutlineDescription,
  MdSend,
} from 'react-icons/md';
import { VscReferences } from 'react-icons/vsc';

const sideMenuItems = [
  {
    id: 1,
    name: 'Dashboard',
    icon: <MdOutlineDashboard />,
    path: '/dashboard',
  },
  {
    id: 2,
    name: 'Tasks',
    icon: <BsListTask />,
    path: '/works',
  },

  {
    id: 16,
    name: 'Users',
    icon: <FaUsers />,
    path: '/user/members',
  },
  {
    id: 2,
    name: 'Deposit',
    icon: <AiOutlineDownload />,
    path: '/deposit',
  },
  {
    id: 3,
    name: 'Withdraw',
    icon: <AiOutlineUpload />,
    path: '/withdraw',
  },
  {
    id: 4,
    name: 'Send',
    icon: <MdSend />,
    path: '/send',
  },

  {
    id: 7,

    name: 'Tnx',
    icon: <MdOutlineDescription />,
    path: '/transactions',
  },
  {
    id: 8,
    name: 'Settings',
    icon: <AiFillSetting />,
    path: '/user/profile',
  },
  {
    id: 9,
    name: 'Support',
    icon: <BsHeadset />,
    path: '/support',
  },

  {
    id: 11,
    name: 'Referral',
    icon: <VscReferences />,
    path: '/referral',
  },

  //   {
  //     id: 14,
  //     name: 'E-commerce',
  //     icon: (
  //       <svg className='shrink-0 h-6 w-6' viewBox='0 0 24 24'>
  //         <path d='M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z' />
  //         <path d='M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z' />
  //         <path d='M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z' />
  //       </svg>
  //     ),
  //     path: '/',
  //     childItems: [
  //       { id: 1, name: 'Item01' },
  //       { id: 2, name: 'Item02' },
  //       { id: 3, name: 'Item03' },
  //     ],
  //   },
];

export default sideMenuItems;
