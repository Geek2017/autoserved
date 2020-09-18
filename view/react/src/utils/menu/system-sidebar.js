export default t => [
  {
    title: t('translation.menuTitleManage'),
    items: [
      {
        title: t('translation.menuDashboard'),
        to: '/dashboard',
        htmlBefore: '<i class="material-icons">donut_large</i>',
        htmlAfter: ''
      },
      {
        title: 'Users',
        to: '/system/users',
        htmlBefore: '<i class="material-icons">people</i>',
        htmlAfter: ''
      },
      {
        title: 'Shops',
        to: '/system/shops',
        htmlBefore: '<i class="material-icons">store</i>',
        htmlAfter: ''
      },
      {
        title: 'Reports',
        to: '/system/reports',
        htmlBefore: '<i class="material-icons">report</i>',
        htmlAfter: ''
      }
    ]
  }
  // {
  //   title: t('translation.menuTitlePromotions'),
  //   items: [
  //     {
  //       title: t('translation.menuLoyaltyProgram'),
  //       to: '/loyalty',
  //       htmlBefore: '<i class="material-icons">favorite</i>',
  //       htmlAfter: ''
  //     },
  //     {
  //       title: t('translation.menuPromotion'),
  //       to: '/promotions',
  //       htmlBefore: '<i class="material-icons">money</i>',
  //       htmlAfter: ''
  //     },
  //     {
  //       title: t('translation.menuReferrals'),
  //       to: '/referrals',
  //       htmlBefore: '<i class="material-icons">how_to_reg</i>',
  //       htmlAfter: ''
  //     }
  //   ]
  // }
];
