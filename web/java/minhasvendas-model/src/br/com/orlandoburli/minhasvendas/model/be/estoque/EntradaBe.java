package br.com.orlandoburli.minhasvendas.model.be.estoque;

import java.util.List;

import br.com.orlandoburli.framework.core.be.BaseBe;
import br.com.orlandoburli.framework.core.be.exceptions.BeException;
import br.com.orlandoburli.framework.core.dao.DAOManager;
import br.com.orlandoburli.minhasvendas.model.dao.estoque.EntradaDao;
import br.com.orlandoburli.minhasvendas.model.domains.StatusProcessamento;
import br.com.orlandoburli.minhasvendas.model.vo.estoque.EntradaVo;
import br.com.orlandoburli.minhasvendas.model.vo.estoque.ItemEntradaVo;

public class EntradaBe extends BaseBe<EntradaVo, EntradaDao> {

	public EntradaBe(DAOManager manager) {
		super(manager);
	}

	@Override
	public void doBeforeInsert(EntradaVo vo) throws BeException {
		vo.setStatus(StatusProcessamento.NAO_PROCESSADO);

		super.doBeforeInsert(vo);
	}

	@Override
	public void doBeforeSave(EntradaVo vo) throws BeException {
		super.doBeforeSave(vo);
	}

	@Override
	public void doBeforeDelete(EntradaVo vo) throws BeException {
		super.doBeforeDelete(vo);

		// Apagar todos os itens
		ItemEntradaBe itemBe = new ItemEntradaBe(getManager());
		List<ItemEntradaVo> list = itemBe.getList(vo);

		for (ItemEntradaVo itemEntradaVo : list) {
			itemBe.remove(itemEntradaVo);
		}
	}

	@Override
	public void doAfterSave(EntradaVo vo) throws BeException {
		super.doAfterSave(vo);

		ItemEntradaBe itemBe = new ItemEntradaBe(getManager());

		for (ItemEntradaVo item : vo.getItens()) {
			item.setIdEntrada(vo.getIdEntrada());
			itemBe.save(item);
		}
	}
}