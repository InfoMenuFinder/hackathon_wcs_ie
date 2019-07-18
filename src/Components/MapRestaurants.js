import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer} from 'react-leaflet';
import Markdown from 'react-markdown';


export default class MapRestaurants extends Component {
    constructor() {
        super();
        this.state = {
            menus: [],
            lat: 40.437344,
            lng: -3.682888,
            zoom: 16
        }
    }
    
    componentDidMount = () => {
        fetch('/api/menus')
        .then(res => res.json())
        .then(data => {
            this.setState({
                menus: data
            });
        });
    }


      render() {
        const position = [this.state.lat, this.state.lng];
        console.log(this.state.menus)
        return (
          <Map center={position} zoom={this.state.zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {this.state.menus.map((menu, index) => 
                <Marker position={[
                    menu.latitude,
                    menu.longitude
                ]}
                key={index}
                >
                <Popup>
                  <h4>{menu.nombre}</h4>
                  <Markdown source={menu.menu_espanol}/>
                </Popup>
              </Marker>
            )}
          </Map>
        )
      }
}


