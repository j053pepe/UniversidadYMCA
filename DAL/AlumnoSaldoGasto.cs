//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class AlumnoSaldoGasto
    {
        public int ConsecutivoId { get; set; }
        public int PagoId { get; set; }
        public int AlumnoId { get; set; }
        public System.DateTime FechaGasto { get; set; }
        public System.TimeSpan HoraGasto { get; set; }
        public decimal SaldoAnterior { get; set; }
        public decimal SaldoDespues { get; set; }
        public decimal Importe { get; set; }
    
        public virtual AlumnoSaldo AlumnoSaldo { get; set; }
    }
}
