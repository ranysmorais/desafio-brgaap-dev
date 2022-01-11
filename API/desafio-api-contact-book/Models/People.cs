using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace desafio_api_contact_book
{
    public class People
    {
        [Key]
        public int _id { get; set; }

        [Required(ErrorMessage = "Preencha os campos corretamente")]
        [MaxLength(50, ErrorMessage = "Este campo deve conter no maximo 50 caracteres")]
        [MinLength(1, ErrorMessage = "Este campo de conter no minimo 1 caracter")]

        public string name { get; set; }

        public string phone { get; set; }
        
        public string street { get; set; }

        
        public string city { get; set; }

        
    }
}
