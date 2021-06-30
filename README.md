# ProdOps-certificado
Este é um desafio de backend proposto como parte do programa de mentoria do Christiano Milfont.

O desafio proposto: 
    
    Construir um serviço WEB que receba um modelo em HTML do certificado e os dados do aluno e gerar um arquivo PDF desse certificado.

- Criado um template HTML que foi armazenado no Storage do Github, o template segue os padrões do Handlebars.

- Criado um serviço utilizando o Express JS, e hospedado no Heroku, o endpoint responde um método POST recebendo no corpo da requisição o endereço do template HTML e as informações para geração do certificado:
  - Endpoint https://afternoon-forest-40356.herokuapp.com/certificado
  - Modelo do corpo da requisição:
```json
{
  "template": "https://firebasestorage.googleapis.com/v0/b/prodops-certificado.appspot.com/o/template.html?alt=media&token=70e65a60-06a3-4431-aa9d-682bf11fbe9e",
  "data": {
    "nomeAluno": "Winston",
    "nomeCurso": "Escritor da verdade",
    "dataConclusao": "05/04/1984"
  }
}
```
 - O serviço acessa o template HTML no link disponibilizado no body utilizando o Axios e compila utilizando o Handlebars.

 - Utilizando o Puppeteer o serviço renderiza o HTML compilado em uma janela headless e exporta em formato PDF.


