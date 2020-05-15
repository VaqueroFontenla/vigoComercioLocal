export const mapApiToGeoJson = (values) => {
  const geoJSON = values.map((el) => {
    return {
      id: parseInt(el.gsx$id.$t),
      name: el.gsx$name.$t,
      description: el.gsx$description.$t,
      address: el.gsx$address.$t,
      section: el.gsx$section.$t,
      web: el.gsx$web.$t,
      phone: el.gsx$phone.$t,
      latitude: parseFloat(el.gsx$lat.$t.replace(/,/, "."), 10),
      longitude: parseFloat(el.gsx$lon.$t.replace(/,/, "."), 10),
    };
  });
  return geoJSON;
};
