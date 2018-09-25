import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

state= {
    venues: []
}

componentDidMount() {
    this.getVenues()
   }

renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC7flZfluanbMRYRgvxaLym2fhi1aAvFOU&callback=initMap" )
    window.initMap = this.initMap
}

getVenues = () => {
  const endPoint= "https://api.foursquare.com/v2/venues/explore?"
  const parameters = {
    client_id: "Q4JXEGBQ1AXPF1SBAQX1DA4XD3QMXDTS12TUKNNG53CODPAE",
    client_secret: "HAWFVZC1F4OGOX55XVXAU42QT4K1HRV5TKS1HSLTQG2HBVDM",
    query: "food",
    near: "Nashville",
    v: "20180824"
  }

axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.renderMap())
    })
    .catch(error => {
    console.log("Error!" + error)
  })
}



initMap = () => {
      var map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      })
this.state.venues.map(myVenue => {

//InfoWindow
   var contentString=`${myVenue.venue.name}`

  var infowindow = new window.google.maps.InfoWindow({
  content: contentString
})

//Marker
    var marker = new window.google.maps.Marker({
    position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
    map: map,
    title: myVenue.venue.name

})
    marker.addListener('click', function() {
    infowindow.open(map, marker);
     })
  })
}

render() {
        const { locations, selectFavourite } = this.props;
        console.log(locations)
        return (
            <div id="favouriteId" className="favourite-item-container favourite-item-container-responsive">
                {
                    locations.map((location) => (
                        <LocationRow key={location.name} selectFavourite={selectFavourite} location={location} />
                    ))
                }
            </div>
        );
    }

render() {
        const { locations, selectFavourite } = this.props;
        console.log(locations)
        return (
            <div id="favouriteId" className="favourite-item-container favourite-item-container-responsive">
                {
                    locations.map((location) => (
                        <LocationRow key={location.name} selectFavourite={selectFavourite} location={location} />
                    ))
                }
            </div>
        );
    }

render() {
        const { locations,selectFavourite } = this.props;
        return (
            <div id="container">
                <div className="hamberger-search">
                    <input id="pac-input" className="controls" type="text" placeholder="Search Box"
                        onChange={(event) => this.props.onSearchLocation(event.target.value)} />
                    <input type="image" className="hamberger" src="imgs/hamberger.png" />
                </div>
                <LocationList selectFavourite={selectFavourite} locations={locations}/>
            </div>
        )
    }
render() {
        const { locations } = this.state;
        return (
            <div>
                <div id="map"></div>
                <SideMenuLocation selectFavourite={this.selectFavourite} locations={locations} onSearchLocation={this.onSearchLocation} />
            </div>
        );
    }

render() {
    return (
      <main>
         <div id='map'> </div>
      </main>

    )
  }
}

function loadScript(url) {
  var index= window.document.getElementsByTagName('script')[0]
  var script = window.document.createElement("script")
  script.async=true
  script.difer=true
  script.src= url
  index.parentNode.insertBefore(script,index)

}
function classToggle() {
  const navs = document.querySelectorAll('.Navbar__Items')

  navs.forEach(nav => nav.classList.toggle('Navbar__ToggleShow'));
}
document.querySelector('.Navbar__Link-toggle')
  .addEventListener('click', classToggle);



export default App;
