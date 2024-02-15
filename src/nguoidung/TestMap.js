import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./TestMap.scss";
import maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
class TestMap extends Component {
    constructor(props) {
        super(props);
        this.mapContainer = React.createRef();
        this.map = React.createRef();
        this.tokyo = { lng: 139.753, lat: 35.6844 };
        this.state = {
          zoom: 14
        };
        maptilersdk.config.apiKey = '3Adnh794iWyfSScobKfq';
      }
    
      componentDidMount() {
        if (this.map.current) return; // stops map from initializing more than once
    
        this.map.current = new maptilersdk.Map({
          container: this.mapContainer.current,
          style: maptilersdk.MapStyle.STREETS,
          center: [this.tokyo.lng, this.tokyo.lat],
          zoom: this.state.zoom
        });
      }
  render() {
    return (
      <div className="map-wrap">
        <div ref={this.mapContainer} className="map" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};  

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TestMap);
