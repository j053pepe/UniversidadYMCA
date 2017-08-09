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
    
    public partial class DocenteCurso
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public DocenteCurso()
        {
            this.CancelacionCursoDocente = new HashSet<CancelacionCursoDocente>();
            this.VistoBuenoCurso = new HashSet<VistoBuenoCurso>();
        }
    
        public int DocenteCursoId { get; set; }
        public int DocenteId { get; set; }
        public string Institucion { get; set; }
        public int Duracion { get; set; }
        public string Descripcion { get; set; }
        public System.DateTime FechaInicial { get; set; }
        public System.DateTime FechaFinal { get; set; }
        public bool EsCursoYMCA { get; set; }
        public bool VoBo { get; set; }
        public int Anio { get; set; }
        public int PeriodoId { get; set; }
        public int UsuarioId { get; set; }
        public bool EstatusId { get; set; }
    
        public virtual Periodo Periodo { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CancelacionCursoDocente> CancelacionCursoDocente { get; set; }
        public virtual Docente Docente { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<VistoBuenoCurso> VistoBuenoCurso { get; set; }
    }
}