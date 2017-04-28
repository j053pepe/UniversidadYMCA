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
    
    public partial class PromocionCasa
    {
        public int AlumnoId { get; set; }
        public Nullable<int> OfertaEducativaId { get; set; }
        public Nullable<int> AlumnoIdProspecto { get; set; }
        public int Anio { get; set; }
        public int PeriodoId { get; set; }
        public Nullable<int> SubPeriodoId { get; set; }
        public Nullable<decimal> Monto { get; set; }
        public Nullable<System.DateTime> FechaGeneracion { get; set; }
        public Nullable<System.TimeSpan> HoraGeneracion { get; set; }
        public Nullable<System.DateTime> FechaAplicacion { get; set; }
        public Nullable<System.TimeSpan> HoraAplicacion { get; set; }
        public Nullable<int> UsuarioId { get; set; }
        public Nullable<int> PagoId { get; set; }
        public Nullable<int> EstatusId { get; set; }
    
        public virtual Alumno Alumno { get; set; }
        public virtual Alumno Alumno1 { get; set; }
        public virtual Estatus Estatus { get; set; }
        public virtual OfertaEducativa OfertaEducativa { get; set; }
        public virtual Pago Pago { get; set; }
        public virtual Periodo Periodo { get; set; }
        public virtual Usuario Usuario { get; set; }
    }
}
