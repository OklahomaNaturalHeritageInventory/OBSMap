var map;
		    require([
		      "esri/map", 
		      "esri/dijit/BasemapToggle",
		      "esri/dijit/Search",
		      "esri/dijit/HomeButton",
		      "esri/geometry/Point",
      		  "esri/graphic",
              "esri/InfoTemplate",
              "esri/symbols/PictureMarkerSymbol",
 
		      "dojo/domReady!"
		    ], function(
		      Map, BasemapToggle, Search, HomeButton, Point, Graphic, InfoTemplate, PictureMarkerSymbol
		    )  {
		
		      map = new Map("map", {
		        basemap: "streets",
		        center: [-98.526, 35.467784],
		        logo: false,
		        zoom: 7
		  });
	            
	      var toggle = new BasemapToggle({
	        map: map,
	        basemap: "hybrid"
	      }, "BasemapToggle");
	      toggle.startup();
	      
	      var search = new Search({
	            map: map
	         }, "search");
	      search.startup();
	      
	      var home = new HomeButton({
        	  map: map
      	  }, "HomeButton");
     	  home.startup();
	      
	      map.on("load", function(){
	            map.infoWindow.resize(250,100);
	          });
	
	     map.on("click", addPoint);
	     
	     var infoTemplate = new InfoTemplate("Coordinates", "Longitude: ${longitude}<br>Latitude: ${latitude}");
         var sym = new PictureMarkerSymbol('http://js.arcgis.com/3.20/esri/dijit/Search/images/search-pointer.png', 36, 36);

	
	     function addPoint(evt) {
	        map.graphics.clear();
	        var latitude = evt.mapPoint.getLatitude();
	        var longitude = evt.mapPoint.getLongitude();
	        var coords = {"longitude": longitude.toFixed(3), "latitude": latitude.toFixed(3)};
	        var gra = new Graphic(evt.mapPoint, sym, coords, infoTemplate);
	        map.graphics.add(gra);
	        map.infoWindow.setFeatures([gra])
	        map.infoWindow.show(evt.mapPoint);
	      }
	
	    });