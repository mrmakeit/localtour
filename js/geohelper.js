"use strict";
var findBounds = function (arrayLatlng){        
    // Based on Google Maps API v3 
    // Purpose: given an array of Latlng's return a LatlngBounds
    // Why: This is helpful when using fitBounds, panTo
    var newBounds = new google.maps.LatLngBounds,p=0;

    do {
        newBounds.extend(arrayLatlng[p])
        p+=1;
    } while (p < arrayLatlng.length);

    return newBounds;
};

var addGeomteries = function (geoJSON, gglMap) {
    var pointArray=[];    
    for (var geom in geoJSON){
        var gglV = new GeoJSON(geoJSON[geom], {});
        if (gglV.error){
            // Handle the error.
        }else{
            gglV.setMap(gglMap);
            if(gglV.position){
                pointArray.push(gglV.position);                            
            }
            if(gglV.getPaths){
                gglV.getPath().forEach(function(position,idx){
                    pointArray.push(new google.maps.LatLng(position.lat(),position.lng()));                            

                });

            }
        }

    }
    gglMap.fitBounds(findBounds(pointArray));
};
