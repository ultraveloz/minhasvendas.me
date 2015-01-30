package br.com.orlandoburli.minhasvendas.model.dicionario.estoque;

import br.com.orlandoburli.minhasvendas.model.dicionario.cadastros.Empresa;

public final class Entrada {
	public static final String TABELA_ENTRADA = "entrada";

	public final class Colunas {
		public static final String ID_ENTRADA = "id_entrada";
		public static final String ID_EMPRESA = Empresa.Colunas.ID_EMPRESA;
		public static final String NUMERO_DOCUMENTO = "numero_documento";
		public static final String SERIE = "serie";
		public static final String DATA_EMISSAO_DOCUMENTO = "data_emissao_documento";
		public static final String STATUS = "status";
		public static final String DATA_PROCESSAMENTO = "data_processamento";
	}
}