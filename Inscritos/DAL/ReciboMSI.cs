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
    
    public partial class ReciboMSI
    {
        public int ReciboId { get; set; }
        public int SucursalCajaId { get; set; }
        public int BancoTerminalId { get; set; }
        public int MesId { get; set; }
        public int MSI { get; set; }
    
        public virtual BancoTerminal BancoTerminal { get; set; }
        public virtual Recibo Recibo { get; set; }
    }
}