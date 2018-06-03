$(function(){
	new JSScanner(function(barcode){
		$("#message-name").html('');
		$("#message-info").html('请稍等...');
		$("#message-name").removeClass("Error").removeClass("Pass").removeClass("Manually").removeClass("Repeat");
		$("#message-info").removeClass("Error").removeClass("Pass").removeClass("Manually").removeClass("Repeat");
		$.post("http://接口地址/home.php?c=JobAllowance&a=nverform",{ no : barcode },function(result){
			var result=JSON.parse(result);
			switch(result.code){
				case 0:
					var ClassName = "Error";
					result.data.xm = '';
					break;
				case 1:
					var ClassName = "Pass";
					break;
				case 2:
					var ClassName = "Manually";
					break;
				case 3:
					var ClassName = "Repeat";
					break;
				default:
					result.data.count = 'X';
					result.data.xm = 'X';
					result.message = '失去连接';
					var ClassName = "Error";
					break;
			}
			$("#count-mid").html(result.data.count);
			$("#message-name").html(result.data.xm);
			$("#message-name").addClass(ClassName);
			$("#message-info").html(result.message);
			$("#message-info").addClass(ClassName);			
			$("#list").prepend('<div class="' + ClassName + '">' + barcode + '</div>');
		});
	});
});