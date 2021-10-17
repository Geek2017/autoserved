import { APP_VIDEO_URL, APP_REPORT_URL } from '../constants';

export default t => [
  {
    title: t('translation.menuTitleManage'),
    items: [
      {
        title: t('translation.menuDashboard'),
        to: '/dashboard',
        htmlBefore: '<i class="material-icons">donut_large</i>',
        htmlAfter: '',
        disabled: false
      },
      {
        title: 'Fleet Profile',
        to: '/profile',
        htmlBefore: '<i class="material-icons">account_box</i>',
        htmlAfter: '',
        disabled: false
      },
      {
        title: 'Members',
        to: '/members',
        htmlBefore: '<i class="material-icons">people</i>',
        htmlAfter: '',
        disabled: false
      },
      {
        title: 'Fleet Cars',
        to: '/cars',
        htmlBefore: '<i class="material-icons">directions_car</i>',
        htmlAfter: '',
        disabled: false
      }
    ]
  },
  // {
  //   title: t('translation.menuTitlePromotions'),
  //   items: [
  //     {
  //       title: t('translation.menuLoyaltyProgram'),
  //       to: '/loyalty',
  //       htmlBefore: '<i class="material-icons">favorite</i>',
  //       htmlAfter: '',
  //       disabled: false
  //     },
  //     {
  //       title: t('translation.menuPromotion'),
  //       to: '/promo',
  //       htmlBefore: '<i class="material-icons">money</i>',
  //       htmlAfter: '',
  //       disabled: false
  //     },
  //     {
  //       title: t('translation.menuReferrals'),
  //       to: '/referrals',
  //       htmlBefore: '<i class="material-icons">how_to_reg</i>',
  //       htmlAfter: '',
  //       disabled: false
  //     }
  //   ]
  // },
  {
    title: 'Help Center',
    items: [
      {
        title: 'Watch Tutorials',
        to: null,
        href: APP_VIDEO_URL,
        htmlBefore: '<i class="material-icons">ondemand_video</i>',
        htmlAfter: '',
        disabled: false
      },
      {
        title: 'Report Issues',
        to: null,
        href: APP_REPORT_URL,
        htmlBefore: '<i class="material-icons">report</i>',
        htmlAfter: '',
        disabled: false
      }
    ]
  }
];
