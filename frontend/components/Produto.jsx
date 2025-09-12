
const Produto = () => {
  return (
    <div>
        <h1>Cadastro de produtos</h1>
        <form>
            <div>
                <label>Nome Produto</label>
                <input type ="text" id="nome" placeholder="Digite o nome do Produto" />
            </div>
            <div>
                <label>Descrição do Produto</label>
                <input type ="text" id="nome" placeholder="Digite a descrição do Produto" />
            </div>
            <button>Cadastrar</button>
        </form>
        <ul>
            <li>
                <div>
                    <strong>produto</strong>
                </div>
                <div>
                    <button>Editar</button>
                    <button>Deletar</button>
                </div>
            </li>
        </ul>
    </div>
  )
}

export default Produto