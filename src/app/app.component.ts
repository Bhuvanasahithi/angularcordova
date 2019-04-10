import { Component,OnInit } from '@angular/core';
import { latLng, tileLayer, marker, icon } from 'leaflet';
import * as L from 'leaflet';
import * as geoJSON from 'leaflet';
import { GeoJsonObject } from 'geojson';
import * as GeoJSON from 'geojson';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  ngOnInit(){
    //showing current location on map
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(function(position)
        {
            console.log("Current location latitude and longitude:"+position.coords.latitude+";"+position.coords.longitude);
            let markerIcon=L.icon({
              iconUrl:'https://image.flaticon.com/icons/png/512/33/33622.png',
              iconSize:[30,30],
              iconAnchor:[15,30]
            });
            L.marker([position.coords.latitude,position.coords.longitude],{icon:markerIcon}).addTo(map).bindPopup("My Current Location");
        })
    }
    else
    {

    }
   const map=L.map('map').setView([17.43,78.38],4);
   L.tileLayer('https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',{attribution:"",maxZoom:20,minZoom:4}).addTo(map);
   let greenicon=L.icon({
     iconSize:[30,30],
      iconUrl:'leaflet/marker-icon.png',
      shadowUrl:'leaflet/marker-shadow.png'
   });
   
   let marker=L.marker([17.43,78.38],{icon:greenicon}).addTo(map);
   //adding list of markers to the map
   let markersArray=[
     {
        lat:11.05,
        lng:78.38,
        location:'TamilNadu'

     },
     {
        lat:23.47,
        lng:77.94,
        location:'MadhyaPradesh'
     },
     {
        lat:29.23,
        lng:76.43,
        location:'Haryana'
     },
     {
        lat:21.29,
        lng:81.82,
        location:'Chattisgarh'
     },
     {
        lat:19.60,
        lng:75.55,
        location:'Maharastra'
     }
   ];
   for(let i=0;i<markersArray.length;i++)
   {
     let marker= L.marker([markersArray[i].lat,markersArray[i].lng],{icon:greenicon}).addTo(map);
      

      marker.addEventListener('click',function()
      {
        L.popup().setLatLng([markersArray[i].lat,markersArray[i].lng])
        .setContent("Iam on "+markersArray[i].location) 
        .openOn(map);
      });
   }
    
  
 //Adding the geojson data
 //let geoJsonData:GeoJsonObject;
 let geoJsonData=
 {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              78.94775390625,
              19.456233596018
            ],
            [
              82.81494140625,
              19.456233596018
            ],
            [
              82.81494140625,
              22.49225722008518
            ],
            [
              78.94775390625,
              22.49225722008518
            ],
            [
              78.94775390625,
              19.456233596018
            ]
          ]
        ]
      }
    }
  ]
}
 
  L.geoJSON(<GeoJsonObject>geoJsonData,{
    'style':{
      color:"red",
      fillColor:"green",
      fillOpacity:0.3
      
    }
  }).addTo(map);
  L.circle([17.43,78.38],{
    "color": "red",
    "weight": 5,
    "opacity": 0.65,
    radius:500
  }).addTo(map);
  

  }
  //adding the marker to the map
 
  /*marker1=marker([17.43,78.38],{
   icon:icon({
     iconSize:[25, 41],
     iconAnchor:[13, 41],
     iconUrl:'leaflet/marker-icon.png',
     shadowUrl:'leaflet/marker-shadow.png'
   })
  })
  marker2=marker([16.00,18.00],{
    icon:icon({
      iconSize:[25, 41],
      iconAnchor:[13, 41],
      iconUrl:'leaflet/marker-icon.png',
      shadowUrl:'leaflet/marker-shadow.png'
    })
  })
  options={
    layers:[
      tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png',{attribution:''}),
      this.marker1,this.marker2
    ],
    zoom:16,
    center:latLng([17.43,78.38])
  };*/
}
