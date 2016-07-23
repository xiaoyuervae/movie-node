$(function(){
	$('.del').click(function(e){
		var id = $(this).attr('data-id') ; 
		var thisTr = $(this).parent().parent() ; 
		//thisTr.remove() ; //删除这一行
		$.ajax({
			type:'DELETE' , 
			url: '/admin/movie/delete?id='+id 
		})
		.done(function(result){
			if(result.success === 1){
				if(thisTr.length > 0){
					thisTr.remove() ; 
				}
			}
		});
	}) ; 
	$('#douban').blur(function(e){
		var douban = $(this) ; 
		var doubanId = douban.val() ; 
		$.ajax({
			url: 'https://api.douban.com/v2/movie/subject/' + doubanId , 
			dataType: 'jsonp' , 
			cache: true , 
			type: 'get' , 
			crossDomain: true , 
			jsonp: 'callback' , 
			success: function(data){ 
				$('#inputTitle').val(data.title) ; 
				$('#inputDoctor').val(data.directors[0].name) ; 
				$('#inputCountry').val(data.countries[0].name) ; 
				$('#inputPoster').val(data.images.large) ; 
				$('#inputYear').val(data.year) ; 
				$('#inputSummary').val(data.summary) ; 
			}
		})
	})
})