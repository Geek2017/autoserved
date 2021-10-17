import React from "react";
import ReactGoogleMapLoader from "react-google-maps-loader";
import { MAPS_API_KEY } from "../../utils/constants";

export default function GoogleMapLoader(props) {
  const {
    loaderParams = {
      key: MAPS_API_KEY,
      libraries: "places,geocode"
    },
    componentRenderer
  } = props;
  return (
    <ReactGoogleMapLoader
      params={loaderParams}
      render={googleMaps => googleMaps && componentRenderer(googleMaps)}
    />
  );
}
