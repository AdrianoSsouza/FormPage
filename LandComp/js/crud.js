$(function(){
	var errmsg	= $('#error-container');
	var forms	= $('form');
	var botao	= $('.j_buttom');
	var urlpost = 'includes/Controller.class.php';
	var download = $(".down");
	jQuery("input.telefone")
        .mask("(99) 9999-9999?9")
        .focusout(function (event) {  
            var target, phone, element;  
            target = (event.currentTarget) ? event.currentTarget : event.srcElement;  
            phone = target.value.replace(/\D/g, '');
            element = $(target);  
            element.unmask();  
            if(phone.length > 10) {  
                element.mask("(99) 99999-999?9");  
            } else {  
                element.mask("(99) 9999-9999?9");  
            }  
        });

	botao.attr("type","submit");
	
	forms.submit(function(event) {
		errmsg.fadeOut('fast'); 
		return false;
	});

	function carregando(){
		errmsg.empty().html('<p class="load"><img src="images/load.gif" alt="Carregando..."> Aguarde, enviando requisição!</p>').fadeIn("fast");
	}
	
	function errosend(){
		errmsg.empty().html('<p class="erro"><strong>Erro inesperado,</strong> Favor contate o admin!</p>').fadeIn("fast");
	}
	
	//GENÉRICAS
	function errdados( mensagem ){
		errmsg.empty().html('<p class="erro">'+mensagem+'</p>').fadeIn("fast");
	}
	
	function sucesso( mensagem ){
		errmsg.empty().html('<p class="accept">'+mensagem+'</p>').fadeIn("fast");
	}

	$.ajaxSetup({
		url:	urlpost,
		type:	'POST',
		beforeSend: carregando,
		error: 		errosend
	});
	
	var cadastro = $('form[name="login"]');
	cadastro.submit(function() {
			var dados 	= $(this).serialize();
			var action  = "&acao=cadastro";
			var envia  	= dados + action;
			
			$.ajax({
				data:envia,
				success: function(resposta){
				if(resposta == 1){
					errdados("<strong>Erro ao cadastrar:</strong> Existem Campos em Branco");

				}else if(resposta == 2){
					errosend();
				}else if(resposta == 3 ){
					errdados("<strong>Erro ao cadastrar:</strong> Captcha errado tente novamente");
				}else if(resposta == 4 ){
					errdados("<strong>Erro ao cadastrar:</strong> Email já cadastrado em nosso concurso.");
				}else{
					sucesso("Ola <strong>"+resposta+"</strong>,sua inscrição foi realizada com sucesso!  <a href='uploads/regulamento.pdf'  target='_blank'><strong>CLIQUE AQUI</strong></a> e faça o Download do REGULAMENTO.");
					  //  window.location.href = 'uploads/regulamento.pdf';
					



				}

				},
				complete:  function(){
				//location.href="http://www.upinside.com.br";	
				cadastro.find("input:text").val('');
				cadastro.find("input:email").val("");
			}

			});
			
				});

	//leitura
	var readmore 	= $('.j_read');
	var loadUser 	= $('.usuarios');
	var loadler 	= $('.lendoartigos');
	loadUser.empty();
	readmore.hide();
	function lendoUsuarios(instrucao){
		$.ajax({
			data: instrucao,
			beforeSend:'',
			error:'',
			success: function(resposta){
				if(resposta=='3') {
					loadler.text('Sem mais Usuarios para carregar').fadeIn("fast");
					loadler.delay(1500).fadeOut("slow");
			}else{
				loadUser.append(resposta);
				loadler.delay(1500).fadeOut("slow");
				readmore.delay(800).fadeIn("slow");
			}
		}
	});
}

	lendoUsuarios("acao=ler&offset=0&limite=2");
	var offset = 2;
	readmore.click(function(){
		loadler.fadeIn("fast");
		lendoUsuarios("acao=ler&offset="+offset+"&limite=2");
		offset += 2;
	});

	//deletar
	
	loadUser.on('click', '.j_delete', function() {
		var	delid = $(this).attr("id");
		var liaction = $('li[class="j_'+delid+'"]');
		var datadel  = "acao=delet&del="+delid;
		
		liaction.css("background","red");
		lendoUsuarios("acao=ler&offset="+offset+"&limite=1");
		$.ajax({
			data: datadel,
			beforeSend:'',
			error:'',
			success:function(resposta){
				liaction.fadeOut(1000);
			}

		});
		

		
	});	
formmodal	=	$('form[name="editar"]');
closemodal  =  	$('.j_buttom_close');

loadUser.on('click','.j_edit',function() {
		var	editid = $(this).attr("id");
		var liaction = $('li[class="j_'+editid+'"]');
		var dataedit  = "acao=consult&editid="+editid;
	
	liaction.css("background","#09f");
	
	$.ajax({
		data: dataedit,
		dataType: "json",
		beforeSend: function(){$('.editar').fadeIn("slow");	},
		error: 		'',	
		success:function(resposta){
			formmodal.find("input[name='nome']").val(resposta);
		},
		complete:function(){

				formmodal.fadeIn("slow");

		}
	});
	closemodal.click(function(event) {
		formmodal.fadeOut(1000);
		$('.editar').fadeOut(1300);
	});
	


});

})
