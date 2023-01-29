# Projeto Labecommerce - backend

## O que funciona:
<p>
<ol>
<li><strong><h3>Cadastro de usuário:</h3></strong></li>
<ul>
<li> <strong>Método:</strong> POST  </li>
<li> <strong>Path:</strong>"/users"  </li>
<li> <strong>Parâmetros via body a ser inserido:</strong> id, name, email e password </li>
</ul>
</p>
<p><strong>Resultado:</strong> O usuário será cadastrado e seus dados ficarão salvos no banco de dados</p>


<li><strong><h3>Busca por todos os usuários:</h3></strong></li>
<ul>
<li> <strong>Método:</strong> GET  </li>
<li> <strong>Path:</strong>"/users" </li>
<li> <strong>Parâmetros:</strong> sem parâmetros </li>
</ul>
</p>
<p><strong>Resultado:</strong> Retorna uma lista com todos os usuários cadastrados.</p>

<li><strong><h3>Cadastro de produto:</h3></strong></li>
<ul>
<li> <strong>Método:</strong> POST  </li>
<li> <strong>Path:</strong>"/products" </li>
<li> <strong>Parâmetros via body a ser inserido:</strong> id, name, price, description e image_url </li>
</ul>
</p>
<p><strong>Resultado:</strong> O produto será cadastrado e seus dados ficarão salvos no banco de dados</p>

<li><strong><h3>Busca por todos os produtos:</h3></strong></li>
<ul>
<li> <strong>Método:</strong> GET  </li>
<li> <strong>Path:</strong>"/products" </li>
<li> <strong>Parâmetros:</strong> sem parâmetros </li>
</ul>
</p>
<p><strong>Resultado:</strong> Retorna uma lista com todos os produtos cadastrados.</p>

<li><strong><h3>Registro de compra:</h3></strong></li>
<ul>
<li> <strong>Método:</strong> POST  </li>
<li> <strong>Path:</strong>"/purchases" </li>
<li> <strong>Parâmetros via body a ser inserido:</strong> id, total-price, paid, buyer_id</li>
</ul>
</p>
<p><strong>Resultado:</strong> O registro da compra efetuada será cadastrada e seus dados ficarão salvos no banco de dados</p>

<li><strong><h3>Busca das compras de um usuário:</h3></strong></li>
<ul>
<li> <strong>Método:</strong> GET  </li>
<li> <strong>Path:</strong>"/users/:id/purchases" </li>
<li> <strong>Parâmetros recebido via path params:</strong> user id </li>
</ul>
</p>
<p><strong>Resultado:</strong> Retorna uma lista com todas as compras do usuário informado.</p>
</ol>

## Documentação

[Documentação](https://documenter.getpostman.com/view/24460893/2s935hQSaY)


