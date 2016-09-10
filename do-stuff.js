$(document).ready(function(){
	var uberPrice = 10.11;
	var lyftPrice = 8.54;
	var uberTime = 10.00;
	var lyftTime = 4.50;
	
	var lat = 0;
	var lon = 0;
	
	function getUp()
	{
		return uberPrice;
	}
	
	function getLp()
	{
		return lyftPrice;
	}
	
	function getUt()
	{
		return uberTime;
	}
	
	function getLt()
	{
		return lyftTime;
	}
	
	function getMessage(up, lp, ut, lt)
	{
		var mess = '';
		if(up < lp)
		{
			mess += "Uber costs less "
			if(ut < lt)
				mess += "and will take less time."
			else if(lt < ut)
				mess += "but will take more time than Lyft"
			else
				mess += "and will take the same amount of time as Lyft"
		}
		else if(lp < up)
		{
			mess += "Lyft costs less "
			if(lt < ut)
				mess += "and will take less time."
			else if(ut < lt)
				mess += "but will take more time than Uber"
			else
				mess += "and will take the same amount of time as Uber"
		}
			
		return mess;
	}
	
	function getCoord(address, fn){
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			fn(results[0].geometry.location);
		  } 
		});
	}
	
	var x = 2
	$('#compare').click(function(){
		address1 = $('#a').val();
		address2 = $('#b').val();
		
		getCoord(address1, function(coord){
			var lat1 = coord.lat();
			var lon1= coord.lng();
			
			getCoord(address2, function(coord){
				var lat2 = coord.lat();
				var lon2 = coord.lng();
						
				var up = getUp();
				var lp = getLp();
				var ut = getUt();
				var lt = getLt();
				
				$('#table').css('visibility', 'visible');
				$('#uber-price').html('$' + getUp())
				$('#lyft-price').html('$' + getLp())
				$('#uber-time').html(getUt())
				$('#lyft-time').html(getLt())
				
				$('#message').text(getMessage(up, lp, ut, lt)) 
			});
		});
		
	});
	
	
	

	
	
});