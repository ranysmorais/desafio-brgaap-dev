using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using desafio_api_contact_book.Data;

namespace desafio_api_contact_book.Controllers
{
   
    [ApiController]
    [Route("v1/contacts")]
    public class PeopleController : ControllerBase
    {     

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<List<People>>> Get([FromServices] DataContext context)
        {
            var peoples = await context.peoples.ToListAsync();
            return peoples;
        }

        [HttpPost]
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
        
        
        [HttpGet("get-contact/{phone}")]
        public async Task<ActionResult<People>> GetByPhone(string phone, [FromServices] DataContext context )
        {

            var peoples = await context.peoples.ToListAsync();
            return peoples.Find(x => x.phone == phone);

        }

        /*    PESQUISA POR NOME -- OPCIONAL 
        [HttpGet("get-contact/{name}")]
        public async Task<ActionResult<People>> GetByName(string name, [FromServices] DataContext context)
        {

            var peoples = await context.peoples.ToListAsync();
            return peoples.Find(x => x.name == name);         

        }*/

        [HttpDelete("delete-contact/{phone}")]       
        public async void DeleteByPhone(string phone,[FromServices] DataContext context)
        {

            var p = await context.peoples.ToListAsync();

            context.peoples.Remove(p.Find(x => x.phone == phone));
            await context.SaveChangesAsync();
        }


    }

    

}
