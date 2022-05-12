module.exports = {
  isDevel: true,
  inMante: false, // set to true and deploy if you want to set a maintenance message in all the services
  enabledLangs: ["en", "es", "zh", "sw"],
  mainDomain: "tanbif.costech.or.tz", // used for cookies (without http/https)
  mainLAUrl: "https://tanbif.costech.or.tz",
  baseFooterUrl: "https://tanbif.costech.or.tz",
  theme: "superhero", // for now 'material', 'clean', 'superhero', 'yeti', 'cosmo', 'darkly', 'paper', 'sandstone', 'simplex', 'slate' or 'flatly' themes are available. See the last ones in: https://bootswatch.com/3/
  services: {
    collectory: { url: "https://collections.tanbif.costech.or.tz", title: "Collections" },
    biocache: { url: "https://biocache.tanbif.costech.or.tz", title: "Occurrence records" },
    biocacheService: {
      url: "https://biocache-ws.tanbif.costech.or.tz",
      title: "Occurrence records webservice",
    },
    bie: { url: "https://species.tanbif.costech.or.tz", title: "Species" },
    // This bieService var is used by the search autocomplete. With your BIE
    // service running and well indexed, you can put here your url
    bieService: {
      url: "https://bie.ala.org.au/ws",
      title: "Species webservice",
    },
    regions: { url: "https://regions.tanbif.costech.or.tz", title: "Regions" },
    lists: { url: "https://lists.tanbif.costech.or.tz", title: "Species List" },
    spatial: { url: "https://spatial.tanbif.costech.or.tz", title: "Spatial Portal" },
    images: { url: "https://images.tanbif.costech.or.tz", title: "Images Service" },
    cas: { url: "https://auth.tanbif.costech.or.tz", title: "CAS" },
  },
  otherLinks: [
    { title: "Datasets", url: "https://collections.tanbif.costech.or.tz/datasets" },
    {
      title: "Explore your area",
      url: "http://biocache.tanbif.costech.or.tz/explore/your-area/",
    },
    { title: "Datasets", url: "https://collections.tanbif.costech.or.tz/datasets" },
    { title: "twitter", url: "", icon: "twitter" },
  ],
};
