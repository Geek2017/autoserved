import { APP_VIDEO_URL, APP_REPORT_URL, APP_FAQ_URL } from "../constants";

export default t => [
  {
    title: t("translation.menuTitleManage"),
    items: [
      {
        title: t("translation.menuDashboard"),
        to: "/dashboard",
        htmlBefore: '<i class="material-icons">donut_large</i>',
        htmlAfter: "",
        classData: "v-dashboard",
        disabled: false
      },
      {
        title: t("translation.menuShops"),
        to: "/shops",
        htmlBefore: '<i class="material-icons">store</i>',
        htmlAfter: "",
        classData: "v-shops",
        disabled: false
      },
      {
        title: t("translation.menuServices"),
        htmlBefore: '<i class="material-icons">build</i>',
        htmlAfter: "",
        disabled: false,
        classData: "v-services",
        open: false,
        items: [
          // {
          //   title: "Corrective",
          //   to: "/services/corrective"
          // },
          {
            title: "Preventive",
            to: "/services/preventive"
          }
        ]
      },
      {
        title: t("translation.menuAppointments"),
        to: "/appointments",
        htmlBefore: '<i class="material-icons">calendar_today</i>',
        htmlAfter: "",
        classData: "v-appointments",
        disabled: false
      },
      {
        title: t("translation.menuRequests"),
        to: "/requests",
        htmlBefore: '<i class="material-icons">assignment_return</i>',
        htmlAfter: "",
        classData: "v-requests",
        disabled: false
      },
      {
        title: t("translation.menuEstimates"),
        to: "/estimates",
        htmlBefore: '<i class="material-icons">edit</i>',
        htmlAfter: "",
        classData: "v-estimates",
        disabled: false
      }
    ]
  },
  {
    title: "Help Center",
    items: [
      {
        title: "Watch Tutorials",
        to: null,
        href: APP_VIDEO_URL,
        htmlBefore: '<i class="material-icons">ondemand_video</i>',
        htmlAfter: "",
        disabled: false
      },
      {
        title: "Report Issues",
        to: null,
        href: APP_REPORT_URL,
        htmlBefore: '<i class="material-icons">report</i>',
        htmlAfter: "",
        disabled: false
      },
      {
        title: "FAQs",
        to: null,
        href: APP_FAQ_URL,
        htmlBefore: '<i class="material-icons">speaker_notes</i>',
        htmlAfter: "",
        disabled: false
      }
    ]
  }
];
