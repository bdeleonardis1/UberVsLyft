$(document).ready(function(){
	var uberPrice = 10.11;
	var lyftPrice = 20.54;
	var uberTime = 10.00;
	var lyftTime = 4.50;
	
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
	
	$('#compare').click(function(){
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