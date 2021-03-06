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
    
    public partial class GrupoAlumnoConfiguracionBitacora
    {
        public int AlumnoId { get; set; }
        public int OfertaEducativaId { get; set; }
        public int Anio { get; set; }
        public int PeriodoId { get; set; }
        public Nullable<int> GrupoId { get; set; }
        public decimal CuotaColegiatura { get; set; }
        public decimal CuotaInscripcion { get; set; }
        public bool EsCuotaCongelada { get; set; }
        public bool EsInscripcionCongelada { get; set; }
        public bool EsEspecial { get; set; }
        public int UsuarioId { get; set; }
        public Nullable<int> PagoPlanId { get; set; }
        public Nullable<int> NumeroPagos { get; set; }
        public System.DateTime FechaRegistro { get; set; }
        public System.TimeSpan HoraRegistro { get; set; }
    
        public virtual PagoPlan PagoPlan { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
