import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/gift-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/layers-fill';
import alertTriangleFill from '@iconify/icons-eva/flag-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'Thống kê',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'Tài khoản',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'Sản phẩm',
    path: '/dashboard/products',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: 'Bài viết',
    path: '/dashboard/blog',
    icon: getIcon(fileTextFill)
  },
  {
    title: 'Báo cáo',
    path: '/dashboard/report',
    icon: getIcon(alertTriangleFill)
  },
  {
    title: 'Đề xuất',
    path: '/dashboard/suggest',
    icon: getIcon(lockFill)
  }
];

export default sidebarConfig;
