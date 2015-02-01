console.log("Carregando arquivo cadastro.js");

//var conteudoId = ".page-content-body";

var tempo = 250;

// Carrega uma pagina
function loadPage(pagina) {

	var params = {};

	$.ajax({
		url : pagina,
		type : 'GET',
		data : params,
		beforeSend : function(data) {
			console.log("loading...");
		},
		success : function(data) {
			$(conteudoId).html(data);

			// Carrega o js de consulta
			loadJs("web/js/consulta.js");

			// Foco no primeiro input (autofocus)
			$('input[autofocus],select[autofocus]').focus();
		},
		error : function(erro) {
			console.log("Erro no load ajax! " + erro);
		}
	});
}

// Carrega um arquivo .css
function loadCSS(href) {
	setTimeout(function() {
		var cssLink = $("<link>");
		$("head").append(cssLink); // IE hack: append before setting href

		cssLink.attr({
			rel : "stylesheet",
			type : "text/css",
			href : href
		}, tempo * 4);
	});
}

bindClickEvents();

// Funcao de salvar o registro
function salvar() {
	// Se tiver alguma requisicao rolando, nao executa.
	if ($.active > 0) {
		return;
	}

	var paginaCadastro = $(".FormularioCadastro").attr("data-page-cadastro");
	var paginaBase = paginaCadastro.split(".")[0];
	var operacao = $(".FormularioCadastro").attr("data-page-operacao");
	var paginaFinal = paginaBase + "." + operacao + "."
			+ paginaCadastro.split(".")[1];

	var params = {
		'operacao' : operacao
	};

	// Loop nos input's do form para enviar
	console.log("Parametros do metodo salvar");

	$("input,select,textarea").each(function(index) {
		params[$(this).attr("id")] = $(this).val();
		console.log($(this).attr("id") + ' = ' + $(this).val());
	});

	$.ajax({
		url : paginaFinal,
		type : 'POST',
		data : params,
		beforeSend : function(data) {
			// console.log("loading...");
		},
		success : function(data) {

			var retorno = $.parseJSON(data);

			if (retorno.sucesso) {
				mensagemInfo(retorno.mensagem);

				setTimeout(function() {
					voltar();
				}, 100);

			} else {
				mensagemErro(retorno.mensagem);
				$("#" + retorno.fieldFocus).focus();
			}

		},
		error : function(erro) {
			console.log("Erro no load ajax! " + erro);
		}
	});
}

// Funcao de excluir o registro
function excluirOld() {
	// confirmacaoModal("Confirma a exclusão deste registro?", "Confirmação",
	// excluirConfirmado);
}

function excluir() {
	// Se tiver alguma requisicao rolando, nao executa.
	if ($.active > 0) {
		return;
	}

	var paginaCadastro = $(".FormularioCadastro").attr("data-page-cadastro");
	var paginaBase = paginaCadastro.split(".")[0];
	var operacao = "excluir";
	var paginaFinal = paginaBase + "." + operacao + "."
			+ paginaCadastro.split(".")[1];

	var params = {
		'operacao' : operacao
	};

	// Loop nos input's do form para enviar
	$("input,select").each(function(index) {
		params[$(this).attr("id")] = $(this).val();
	});

	$.ajax({
		url : paginaFinal,
		type : 'POST',
		data : params,
		beforeSend : function(data) {
			// console.log("loading...");
		},
		success : function(data) {

			var retorno = $.parseJSON(data);

			if (retorno.sucesso) {
				mensagemInfo(retorno.mensagem);
				voltar();
			} else {
				mensagemErro(retorno.mensagem);
				$("#" + retorno.fieldFocus).focus();
			}
		},
		error : function(erro) {
			console.log("Erro no load ajax! " + erro);
		}
	});
}

// Volta para a pagina de consulta
function voltar() {
	// Se tiver alguma requisicao rolando, nao executa.
	if ($.active > 0) {
		console.log("kd???" + $.active)
		return;
	}

	// Forca esconder o modal - pode ter varios aqui...
	$('#selecao_imagem').modal('hide');

	var pageConsulta = $(".FormularioCadastro").attr("data-page-consulta");

	loadPage(pageConsulta);
	loadJs("web/js/consulta.js");
}

// Funcao das teclas de cadastro
var eventoTeclasCadastro = function(event) {

	switch (event.which) {

	case (KEY_ESC):
		event.preventDefault();
		voltar();
		break;

	case (KEY_S):
		if (event.ctrlKey) {
			event.preventDefault();
			salvar();
		}
		break;

	case (KEY_DEL):
		if (event.ctrlKey) {
			event.preventDefault();
			excluir();
		}
		break;
	}
};

// Funcao keydown para tratar as teclas de cadastro
$(document).ready(function() {
	$(document).off("keydown");

	// Verifica se e uma tela de cadastro
	if ($(".FormularioCadastro")) {
		$(document).on("keydown", eventoTeclasCadastro);
	}
});


loadJs("web/js/components.js");

function bindClickEvents() {
	$(".BotaoSalvar").bind("click", function() {
		salvar();
	});

	$(".BotaoExcluir").bind("click", function() {
		excluir();
	});

	$(".BotaoVoltar").bind("click", function() {
		voltar();
	})
}