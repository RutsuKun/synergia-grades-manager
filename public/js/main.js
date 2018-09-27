//
//  Synergia Grades Manager
//  by Mateusz Henicz
//  27.09.2018
//

//
//		File: main.js
//

$('.startAdd').on('click', function(e){


$('#form').hide();
$('#show-other-options-link').hide();$('#naglowek').text('Czekaj...');
$('.progress').show();

move(100);
niceFade();
var dane={user:""+document.getElementById("user").value,pass:""+document.getElementById("pass").value,uid:""+document.getElementById("uid").value,code:""+document.getElementById("code").value}

var data= dane;
var toSend={action:'add',data:data}

$.ajax({url:("https://synergiabot.henicz.pl/addaccount"),type:'POST',data:data,success:function success(data){
$('.progress').hide();
$('#naglowek').html(''+data);
},error:fail});

function fail(data){$('#naglowek').text('Błąd! Spróbuj ponownie później...');}


e.preventDefault();

});

var current_progress=0;

function move(percent){var width=current_progress;var points=percent;var id=setInterval(frame,60);function frame(){if(width>=points){clearInterval(id);}else{width++;console.debug(width);$('#progress-text').text(width+'%');
$('#progress-bar').css("width", width+'%');

}}}

function niceFade(){$(".progress").show(400);$("#progress-text").hide();setTimeout(function(){$("#progress-text").show(60);},400);}
