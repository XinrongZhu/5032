<template>
  <div class="legend-container">
    <ul class="legend">
      <li><span class="marker marker-red"></span> Hospitals</li>
      <li><span class="marker marker-blue"></span> Community Centers</li>
      <li><span class="marker marker-green"></span> Parks</li>
      <li><span class="marker marker-yellow"></span> Other Places</li>
    </ul>
  </div>
  <div id="map" style="width: 100%; height: 60vh"></div>
</template>

<script>
export default {
  name: 'HomeMap',
  data() {
    return {
      map: null,
      userLocation: null,
      directionsRenderer: null,
      travelMode: 'DRIVING'
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      // Get the user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            this.loadMap()
          },
          (error) => {
            console.error('Unable to get location:', error)
            // Use default location (Sydney)
            this.userLocation = { lat: -33.8688, lng: 151.2195 }
            this.loadMap()
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
        // Use default location (Sydney)
        this.userLocation = { lat: -33.8688, lng: 151.2195 }
        this.loadMap()
      }
    },
    loadMap() {
      // Initialize the map
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: this.userLocation,
        zoom: 15,
        gestureHandling: 'greedy'
      })

      // Add a marker for the user's location
      new google.maps.Marker({
        position: this.userLocation,
        map: this.map,
        title: 'Your current location'
      })

      // Search for nearby places
      this.searchNearby()
    },
    searchNearby() {
      const service = new google.maps.places.PlacesService(this.map)

      // Search for hospitals
      const hospitalRequest = {
        location: this.userLocation,
        radius: '2000',
        type: 'hospital'
      }

      // Search for community centers (using keywords)
      const communityRequest = {
        location: this.userLocation,
        radius: '2000',
        keyword: 'community center'
      }

      // Search for parks
      const parkRequest = {
        location: this.userLocation,
        radius: '2000',
        type: 'park'
      }

      // Search for hospitals
      service.nearbySearch(hospitalRequest, this.handleSearchResults('Hospitals'))

      // Search for community centers
      service.nearbySearch(communityRequest, this.handleSearchResults('Community Centers'))

      // Search for parks
      service.nearbySearch(parkRequest, this.handleSearchResults('Parks'))
    },

    handleSearchResults(placeName) {
      return (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          console.log(`${placeName} search results:`, results.length)
          results.forEach((place) => {
            this.createMarker(place)
          })
        } else {
          console.error(`${placeName} search failed:`, status)
        }
      }
    },
    createMarker(place) {
      const iconUrl = this.getIconUrl(place.types)

      const marker = new google.maps.Marker({
        map: this.map,
        position: place.geometry.location,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(30, 30)
        }
      })

      // Information window
      const infowindow = new google.maps.InfoWindow()

      marker.addListener('click', () => {
        infowindow.setContent(`
            <div>
              <strong>${place.name}</strong><br>
              ${place.vicinity}<br>
               <select id="travelMode">
              <option value="DRIVING">Driving</option>
              <option value="WALKING">Walking</option>
              <option value="BICYCLING">Bicycling</option>
              <option value="TRANSIT">Transit</option>
            </select>
               <button id="navigate" style="
          background-color: #4CAF50;
          border: none;
          color: white;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          margin-top: 10px;
          cursor: pointer;
          border-radius: 4px;
        ">Navigate to here</button>
            </div>
          `)
        infowindow.open(this.map, marker)

        // Add Navigation
        google.maps.event.addListenerOnce(infowindow, 'domready', () => {
          document.getElementById('travelMode').addEventListener('change', (event) => {
            this.travelMode = event.target.value
            this.clearNavigation() // Clear current route
          })
          document.getElementById('navigate').addEventListener('click', () => {
            this.navigateTo(place.geometry.location)
          })
        })
      })
      // Listen to infowindow close event
      google.maps.event.addListenerOnce(infowindow, 'closeclick', () => {
        this.clearNavigation()
      })
    },
    getIconUrl(types) {
      if (types.includes('hospital')) {
        return 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
      } else if (
        types.includes('community_center') ||
        types.some((type) => type.includes('community'))
      ) {
        return 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      } else if (types.includes('park')) {
        return 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
      } else {
        return 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
      }
    },

    navigateTo(destination) {
      const directionsService = new google.maps.DirectionsService()

      this.clearNavigation()

      // Create a new directionsRenderer
      this.directionsRenderer = new google.maps.DirectionsRenderer()
      this.directionsRenderer.setMap(this.map)

      directionsService.route(
        {
          origin: this.userLocation,
          destination: destination,
          travelMode: this.travelMode
        },
        (response, status) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(response)
          } else {
            window.alert('Unable to get route details: ' + status)
          }
        }
      )
    },
    clearNavigation() {
      if (this.directionsRenderer) {
        this.directionsRenderer.setMap(null)
        this.directionsRenderer = null
      }
    }
  }
}
</script>

<style>
.legend-container {
  width: 100%;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 0px;
  text-align: center;
}

.legend {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around;
}

.legend li {
  display: flex;
  align-items: center;
}

.marker {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  border-radius: 50%;
}

.marker-red {
  background-color: red;
}

.marker-blue {
  background-color: blue;
}

.marker-green {
  background-color: green;
}

.marker-yellow {
  background-color: yellow;
}
</style>
