var pass = true;
var basepath;
$(document).ready(function(){
	basepath = $("body").attr("basepath");
	function logUser(){
		pass = false;		
		$('.backdrop').show();
		$.ajax({
			type: "POST",
			data:{name:$("#login").val()},
			url: '/'+basepath+'/login/user',
			dataType:'json',
			success: function(data){
				if(data.success){
					window.location.href = '/'+basepath;
				}
			}
		});		
	}	
	$('#login').focus();	
	$('#login').keyup(function(){
		if(event.keyCode == 13 && pass && $('#login').val() != ''){
			logUser();
		}
	});
});