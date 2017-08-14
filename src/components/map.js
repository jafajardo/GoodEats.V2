import React, { Component } from 'react';

class Map extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.drawMap.bind(this));
  }

  drawMap({ coords: {latitude, longitude} }) {
    const {lat, lng, defaultZoom} = this.props;
    const zoom = defaultZoom || 18;
    const center = { lat: lat || latitude, lng: lng || longitude};

    this.map = new google.maps.Map(this.refs.map, {
      center,
      zoom
    });

    this.marker = new google.maps.Marker({
      position: center,
      map: this.map
    });
  }

  render() {
    return (
      <div className="resto-maps" ref="map" />
    );
  }
}

export default Map;