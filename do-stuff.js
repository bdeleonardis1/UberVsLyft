$(document).ready(function(){
	var uberPrice = 10.11;
	var lyftPrice = 8.54;
	var uberTime = 10.00;
	var lyftTime = 4.50;
	
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
		else
		{
			mess += "They both cost the same "
			if(lt < ut)
				mess += "but Lyft will take less time."
			else if(ut < lt)
				mess += "but Uber will take more time than Uber"
			else
				mess += "and will take the same amount of time"
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
				
				// Uber API Constants
				var uberClientId = 'Prn4y9M26YowrP9VgSSQEf-ArPHlhyeg';
				var uberServerToken = '_IGviC8Vi1pmjOKlHVqNbY2C0zZcP61b4D5i-EiG';

				getEstimatesForUserLocation();
				function getEstimatesForUserLocation() {
				  $.ajax({
					url: "https://api.uber.com/v1/estimates/price",
					headers: {
						Authorization: "Token " + uberServerToken
					},
					data: {
					  start_latitude: lat1,
					  start_longitude: lon1,
					  end_latitude: lat2,
					  end_longitude: lon2
					},
					success: function(result) {
					  var data = result["prices"];
					  if(typeof data != typeof undefined){
						  data.sort(function(t0, t1){
							  return t0.high_estimate - t1.high_estimate;
						  });
						var shortest = data[0];
						if(typeof shortest != typeof undefined)
						{
							uberTime = Math.ceil(shortest.duration / 60);
							uberPrice = (shortest.high_estimate + shortest.low_estimate) / 2;
							
							$('#table').css('visibility', 'visible');
							$('#uber-price').html('$' + uberPrice);
							$('#uber-time').html(uberTime + " min");							
							
							var lyftCreds = 'gAAAAABX1DSP1iLtJccJ6Ci1tgbqu3irJ_6oXNOAl2w7HaVRzufWqpkJRrzkIAvwln1QHSMQNKxhVoX72oLPikSUcFeniPVwkXtZpvh10RGdMA-NDh2Y4HdajAyf_tZtSzARF5YDewKioORGj-YtB68V71FzHFjoyLEeONijdw4rZ30GsnMioec='
							getEstimatesForLyft()
							function getEstimatesForLyft(){
								$.ajax({
									url: 'https://api.lyft.com/v1/cost',
									headers: {
										Authorization: "Bearer " + lyftCreds
									},
									data: {
									  start_lat: lat1,
									  start_lng: lon1,
									  end_lat: lat2,
									  end_lng: lon2
									},
									success: function(result){
										var data = result['cost_estimates'];
										console.log(data);
										if(typeof data != typeof undefined){
										  data.sort(function(t0, t1){
											  return t0.estimated_cost_cents_max - t1.estimated_cost_cents_max;
										  });
										  var shortest = data[0];
										  lyftPrice = (shortest.estimated_cost_cents_max + shortest.estimated_cost_cents_min) / 200;
										  lyftTime = Math.ceil(shortest.estimated_duration_seconds / 60);
										  console.log(lyftPrice);
										  $('#lyft-price').html("$" + lyftPrice);
										  $('#lyft-time').html(lyftTime + " min");
										  $('#message').text(getMessage(uberPrice, lyftPrice, uberTime, lyftTime));
										}
									}
								});
							}
						}
					  }
					}
				  });
				}
			});
		});
		
	});
	
	
	

	
	
});