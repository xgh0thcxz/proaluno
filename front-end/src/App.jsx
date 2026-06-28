import { BrowserRouter, Routes, Route } from 'react-router-dom';


// Login
import Login from './paginas/Login_pasta/Login/Login';
import Aluno_login from './paginas/Login_pasta/Aluno_login/Aluno_login';
import Colab_login from './paginas/Login_pasta/Colab_login/Colab_login';
import Cadastro from './paginas/Login_pasta/Cadastro/Cadastro';

// Aluno
import Home from './paginas/Aluno_pasta/Home/Home';
    // Manifestações
    import Denuncias from './paginas/Aluno_pasta/Home/Manifestacoes/Denuncias/Denuncias';
    import Elogios from './paginas/Aluno_pasta/Home/Manifestacoes/Elogios/Elogios';
    import Reclamacoes from './paginas/Aluno_pasta/Home/Manifestacoes/Reclamacoes/Reclamacoes';
    import Solicitacoes from './paginas/Aluno_pasta/Home/Manifestacoes/Solicitacoes/Solicitacoes';
    import Sugestoes from './paginas/Aluno_pasta/Home/Manifestacoes/Sugestoes/Sugestoes';
import Sobre from './paginas/Aluno_pasta/Sobre/Sobre';
import Contato from './paginas/Aluno_pasta/Contato/Contato';
import Aluno_perfil from './paginas/Aluno_pasta/Aluno_perfil/Aluno_perfil';
import Equipe from './paginas/Aluno_pasta/Equipe/Equipe';


// Colaborador
import Colab_encaminhar from './paginas/Colab_pasta/Colab_encaminhar/Colab_encaminhar';
import Colab_home from './paginas/Colab_pasta/Colab_home/Colab_home';
import Colab_perfil from './paginas/Colab_pasta/Colab_perfil/Colab_perfil';
import Colab_responder from './paginas/Colab_pasta/Colab_responder/Colab_responder';
import Colab_sobre from './paginas/Colab_pasta/Colab_sobre/Colab_sobre';
import Colab_status_manifestacoes from './paginas/Colab_pasta/Colab_status_manifestacoes/Colab_status_manifestacao';
import Colab_ver_manifestacoes from './paginas/Colab_pasta/Colab_ver_manifestacoes/Colab_ver_manifestacoes';
import Colab_equipe from './paginas/Colab_pasta/Colab_equipe/Colab_equipe';

// import Teste from './paginas/Aluno_pasta/Sobre Teste/Sobre';


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path='/' element={<Login/>}/>
        <Route path='/aluno_login' element={<Aluno_login/>}/>
        <Route path='/colab_login' element={<Colab_login/>}/>
        <Route path='/cadastro' element={<Cadastro/>}/>


        {/* Aluno */}
        <Route path='/home' element={<Home/>}/>
            {/* Manifestações */}
            <Route path='/manifestacoes/denuncias' element={<Denuncias/>}/>
            <Route path='/manifestacoes/elogios' element={<Elogios/>}/>
            <Route path='/manifestacoes/reclamacoes' element={<Reclamacoes/>}/>
            <Route path='/manifestacoes/solicitacoes' element={<Solicitacoes/>}/>
            <Route path='/manifestacoes/sugestoes' element={<Sugestoes/>}/>
        <Route path='/sobre' element={<Sobre/>}/>
        <Route path='/contato' element={<Contato/>}/>
        <Route path='/aluno_perfil' element={<Aluno_perfil/>}/>
        <Route path='/equipe' element={<Equipe/>}/>

        {/* Colaborador */}
        <Route path='/colab_encaminhar' element={<Colab_encaminhar/>}/>
        <Route path='/colab_home' element={<Colab_home/>}/>
        <Route path='/colab_perfil' element={<Colab_perfil/>}/>
        <Route path='/colab_responder' element={<Colab_responder/>}/>
        <Route path='/colab_sobre' element={<Colab_sobre/>}/>
        <Route path='/colab_status_manifestacoes' element={<Colab_status_manifestacoes/>}/>
        <Route path='/colab_ver_manifestacoes' element={<Colab_ver_manifestacoes/>}/>
        <Route path='/colab_equipe' element={<Colab_equipe/>}/>

        {/* <Route path='/teste' element={<Teste/>}/> */}

        <Route path='*' element={<h1>Not found</h1>}/>
      </Routes>    
    </BrowserRouter>
    </>
  );
}

export default App