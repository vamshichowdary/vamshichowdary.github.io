export const SITE = {
    website: "https://vamshichowdary.github.io/",
    author: "Vamshi Madala",
    profile: "https://vamshichowdary.github.io/",
    desc: "Graduate Student Researcher at UCSB",
    title: "Vamshi Madala",
    ogImage: "",
    lightAndDarkMode: true,
    postPerIndex: 4,
    postPerPage: 4,
    scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
    showArchives: false,
    showBackButton: true, // show back button in post detail
    editPost: {
        enabled: true,
        text: "Edit page",
        url: "https://github.com/vamshichowdary/vamshichowdary.github.io/edit/main/",
    },
    dynamicOgImage: true,
    dir: "ltr", // "rtl" | "auto"
    lang: "en", // html lang code. Set this empty and default will be "en"
    timezone: "America/Los_Angeles", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
