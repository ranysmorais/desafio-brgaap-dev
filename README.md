#### FERRAMENTAS:
<p align="left">
<img  alt="skills"  width="120" height="70" src="https://user-images.githubusercontent.com/71730134/148970386-a3cf1c68-a0db-411d-871b-d07cb8c81141.png">
<img  alt="skills"  width="90" height="90" src="https://user-images.githubusercontent.com/71730134/148970469-791c6b67-6773-4686-a95a-616a35cd6e6a.jpg">
<img  alt="skills"  width="70" height="70" src="https://user-images.githubusercontent.com/71730134/148970786-68e94960-787d-46fb-8df1-a0d8b2611650.png">
<img  alt="skills"  width="80" height="80" src="https://user-images.githubusercontent.com/71730134/148971029-3501173e-464f-496a-b57a-d20edc2baf8c.jpg">

</p>



# API
## Requests: 
- ROTA DEFAULT
```csharp
    [ApiController]
    [Route("v1/contacts")]
 ```
- GET 

  Como mostra o trecho a baixo esta requisição traz todos os cadastros existentes.
  ```csharp
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<People>>> Get([FromServices] DataContext context)
        {
            var peoples = await context.peoples.ToListAsync();
            return peoples;
        }
    ```
- GET (byPhone)

  Ao solicitar uma busca informando o telefone este trecho de código é executado na API
  ```csharp
        [HttpGet("get-contact/{phone}")]
        public async Task<ActionResult<People>> GetByPhone(string phone, [FromServices] DataContext context )
        {
            try
            {
                var aPhone = long.Parse(phone);
                var peoples = await context.peoples.ToListAsync();
                return peoples.Find(x => x.phone == aPhone);
            }
            catch (FormatException ex)
            {
                throw ex;
            }
        }
    ```
- POST

  Ao criar um novo contato a API executa o trecho abaixo salvando e retornando o mesmo.
  ```csharp
        [[HttpPost]
        [Route("")]
        public async Task<ActionResult<People>> Post([FromServices] DataContext context, [FromBody] People model)
        {
            if (ModelState.IsValid)
            {
                context.peoples.Add(model);
                await context.SaveChangesAsync();
                return model;
            }
            else
            {
                return BadRequest(ModelState);
            }            
        }
    ```
- DELETE

  Passando o telefone como parametro o codigo irá procurar e deletar o cadastro indicado executando este trecho
  ```csharp

        [HttpDelete("delete-contact/{phone}")]       
        public async void DeleteByPhone(string phone,[FromServices] DataContext context)
        {

            try
            {
                var aPhone = long.Parse(phone);
                var p = await context.peoples.ToListAsync();
                context.peoples.Remove(p.Find(x => x.phone == aPhone));
                await context.SaveChangesAsync();

            }catch(FormatException ex)
            {
                throw ex;
            }
            
        }
    ```
    
    # SAP UI5
    
<img src="https://user-images.githubusercontent.com/71730134/148957552-e60e9334-b04f-4d95-be16-d572f88ab176.png" align="center" >

Visualiando a imagem acima podemos notar alguns campos "inputs", tais campos foram desenvolvidos baseado na documentação do SAP Ui5.

- Criando novo contato

    <video  alt="gif_"  src="https://user-images.githubusercontent.com/71730134/148966946-608bb095-e972-4016-81d6-644a620ddb38.mp4"></video>

- Deletando contato

  <video  alt="gif_"  src="https://user-images.githubusercontent.com/71730134/148967590-09eeb2aa-1532-4848-a7a0-2b5f0005bd08.mp4"></video>

- Exibindo contatos

    Houve alguns contratempos no entendimento desta etapa, estou seguindo com os estudos para obter este conhecimento, a função de buscar
    um contato existente ou todos os contatos está disponivel na API e na requisição do SAPUI5, porem sem sucesso para mostrar na tela.
    
