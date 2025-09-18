import { useState,useEffect } from "react";
import axios from 'axios'

const Produto = () => {
    // DECLARANDO A URL DA API QUE SERÁ CONSUMIDA
    const API_URL = "http://localhost:3001/produto";

    // HOOK- useState Manipula o estado da variável
    const [produto, setProduto]=useState([]);
    const [novoProduto, setNovoProduto]=useState({nome:"",descricao:""});
    const [editar, setEditar]=useState(false);

    // CADASTRAR PRODUTO
    const cadastrarProduto =async ()=>{
        // VALIDAR CAMPOS
        if(!novoProduto.nome || !novoProduto.descricao){
            alert("Campos obrigatórios")
            return;
        }
        // TRATAMENTO DE ERROS
        try{
            const response = await axios.post(API_URL, novoProduto);
            setProduto([...produto,response.data])
            setNovoProduto({nome:"", descricao:""})
            setEditar(false);
        }
        catch(error){
            console.log("Erro ao cadastrar o produto",error)
        }
    }

    // HOOK useEffect - EFEITO PARA CARREGAR A LISTAR DE TODOS OS PRODUTOS CADASTRADOS

    useEffect(()=>{
        consultarProdutos();
    })

    // CONSULTAR PRODUTOS CADASTRADOS
    const consultarProdutos= async ()=>{
        try{
            const response = await axios.get(API_URL)
            setProduto(response.data);

        }
        catch(error){
            console.log("Erro ao consultar produto",error)
        }
    }
    
    // ALTERAR PRODUTO CADASTRADO

    const alterarProduto = async()=>{
        if(!novoProduto.nome || !novoProduto.descricao){
            alert("Campos obgrigatórios")
            return;
        } 
        // TRATAMENTO DE ERROS
        try{

        const response =await axios.put(`${API_URL}/${novoProduto.id}`,novoProduto);
        setProduto(produto.map(produto =>produto.id === novoProduto.id ? response.data : produto))
        setNovoProduto({nome:"",descricao:""})
        setEditar(false);

        }catch(error){
            console.log("Erro ao alterar produto",error)
        }
    }

    // DELETAR UM PRODUTO CADASTRADOS

    const deletarProduto =async (id)=>{
        if(window.confirm("Tem certeza que deseja deleta este produto")){
            try{
                await axios.delete(`${API_URL}/${id}`);
                setProduto(produto.filter((item)=>item.id !== id));
            }
            catch(error){
                    console.log("Error ao excluir um produto",error)
            }
        }else{
            console.log("Exclusão do produto cancelada")
        }
    }

    // METODO ALTERAR
    const handleAlterar=(produto)=>{
        setNovoProduto(produto)
        setEditar(true);
    }
    // METODO SUBMIT QUE VAI ATULIZAR O BOTÃO DO FORMULARIO
    const handleSubmit =()=>{
        if(editar){
            alterarProduto();
        }else{
            cadastrarProduto();
        }
    }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-600 rounded-lg">
      <h1 className="text-3xl text-center mb-6 text-white">Cadastro de Produto</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-lg font-medium text-white">Nome Produto</label>
          <input 
           type="text"
           id="nome" 
           placeholder="Digite o nome Produto"
           value={novoProduto.nome} //pega a variavel do useState
            // pega o que o for digitado no campo    
           onChange={(e)=>setNovoProduto({...novoProduto, nome: e.target.value})}
           className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
           
           />
        </div>

        <div>
          <label className="block text-lg font-medium text-white">Descrição Produto</label>
          <input
            type="text"
            id="descricao"
            placeholder="Digite descrição Produto"
            value={novoProduto.descricao}
            onChange={(e)=>setNovoProduto({...novoProduto, descricao : e.target.value})}
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white"
          />
        </div>
        <div className="flex justify-center text-white">
            <button 
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-indigo-900 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {editar ? "Alterar" : "Cadastrar"}
            </button>
        </div>
      </form>
    <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Lista de Produtos</h2>
      <ul className="space-y-4">
        {produto.map(item =>(
        <li key={item.id} className="flex justify-between items-center bg-indigo-900 p-4 rounded-lg shadow-sm text-white">
            <div>
                <strong className="text-xl">{item.nome}</strong>
                <p className="text-shadow-white">{item.descricao}</p>
            </div>
            <div className="space-x-2">
                <button 
                onClick={()=>handleAlterar(item)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                        Editar
                </button>
                <button onClick={()=>deletarProduto(item.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none">
                    Deletar
                </button>
            </div>
        </li>
        ))}     
      </ul>
    </div>
  );
};

export default Produto;
