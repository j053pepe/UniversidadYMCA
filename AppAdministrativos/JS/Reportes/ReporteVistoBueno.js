﻿$(document).ready(function () {
    var tblVoBo, anio, periodo,descripcion, oferta, vobo, registros, usuarioid, alumnoid, Mostra;

    CargarCuatrimestre();

    $('#divContenido').submit(function () {
        //do your stuff
        return false;
    });

    $("#slcCuatrimestre").change(function () {
        anio = $('#slcCuatrimestre').find(':selected').data("anio");
        periodo = $('#slcCuatrimestre').find(':selected').data("periodoid");
        descripcion = $('#slcCuatrimestre option:selected').text();
        usuarioid = $.cookie('userAdmin');
        CargarVistoBueno(anio, periodo, usuarioid);

    });

    $("#slcOferta").change(function () {
        if ($("#slcOferta").val() != -1) {
            oferta = $("#slcOferta option:selected").html();

            if (oferta.includes('Derecho')) {
                tblVoBo.columns(1)
                    .search(oferta)
                    .draw();
            } else if (oferta.includes('Maestría en Educación')) {
                var selected = [];
                selected.push("^" + oferta + "$");
                selected.push("^" + oferta + " SAT$");
                var regex = selected.join("|");
                tblVoBo.columns(1)
                    .search(regex, true, false, true)
                    .draw();
            } else {
                tblVoBo.columns(1)
                    .search("^" + oferta + "$", true, false, true)
                    .draw();
            }
        } else {
            oferta = "";
            tblVoBo.columns(1)
                .search(oferta)
                .draw();
        }
    });


    $("#slcVisto").change(function () {
        var l = 4;
        vobo = ""

        tblVoBo.columns(l)
            .search(vobo)
            .draw();

        tblVoBo.columns(2)
            .search("")
            .draw();

        if ($("#slcVisto").val() != -1) {
            if ($("#slcVisto").val() == 0) {
                vobo = "/";
                l = 4
            } else if ($("#slcVisto").val() == 1) {
                vobo = "-";
                l = 4
            } else {
                vobo = "No";
                l = 2
            }

        }

        tblVoBo.columns(l)
            .search(vobo)
            .draw();


    });

    function CargarCuatrimestre() {
        $.ajax({
            type: 'POST',
            url: "WS/Reporte.asmx/CargarCuatrimestre",
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {

                if (data.d === null) {
                    return false;
                }
                var datos = data.d.periodos;
                var datos2 = data.d.ofertas;
                if (datos.length > 0) {
                    var n = 0;
                    $(datos).each(function () {
                        var option = $(document.createElement('option'));
                        option.text(this.descripcion);
                        option.attr("data-Anio", this.anio);
                        option.attr("data-PeriodoId", this.periodoId);
                        option.val(n);

                        $("#slcCuatrimestre").append(option);
                        n++;
                    });// $(datos).each(function ()
                    $("#slcCuatrimestre").val(1);
                    $("#slcCuatrimestre").change();
                }//if
                if (datos2.length > 0) {
                    $(datos2).each(function () {
                        var option1 = $(document.createElement('option'));
                        option1.val(this.ofertaEducativaId);
                        option1.text(this.descripcion);
                        $("#slcOferta").append(option1);
                    });// $(datos).each(function ()
                }//if
            }//success
        });// $.ajax

    }

    function CargarVistoBueno(anio, periodo, usuarioid) {
        $('#Load').modal('show');
        $.ajax({
            type: 'POST',
            url: "WS/Reporte.asmx/CargarReporteVoBo",
            data: "{anio:" + anio + ",periodoid:" + periodo + ", usuarioid:" + usuarioid + "}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                if (data.d != null) {
                    Mostra = data.d.EsEscolares;

                    var Mostra2 = true;
                    if (Mostra) {
                        Mostra2 = false;
                    }
                    tblVoBo = $("#dtVoBo").DataTable({
                        "aaData": data.d.AlumnoVoBo,
                        "aoColumns": [
                            {
                                "mDataProp": "AlumnoId",
                                "mRender": function (data, f, d) {
                                    var link;
                                    link = d.AlumnoId + " | " + d.Nombre;

                                    return link;
                                }
                            },
                            { "mDataProp": "OfertaEducativa" },
                            { "mDataProp": "Inscrito" },
                            { "mDataProp": "FechaInscrito" },
                            { "mDataProp": "FechaVoBo" },
                            { "mDataProp": "InscripcionCompleta" },
                            { "mDataProp": "Asesorias" },
                            { "mDataProp": "Materias" },
                            { "mDataProp": "UsuarioVoBo" },
                            {
                                "mDataProp": "UsuarioVoBo",
                                "mRender": function (data, f, d) {
                                    var link
                                    if (d.Inscrito == "No") {
                                        link = "<a class='btn blue' name ='btnEnviar'>Enviar</a>";
                                    } else { link = ""; }

                                    return link;
                                }
                            }


                        ],
                        "columnDefs": [
                            {
                                "targets": [3],
                                "visible": Mostra,
                                "searchable": false
                            },
                            {
                                "targets": [9],
                                "visible": Mostra2,
                                "searchable": false
                            },

                        ],
                        "lengthMenu": [[20, 50, 100, -1], [20, 50, 100, 'Todos']],
                        "searching": true,
                        "ordering": true,
                        "async": true,
                        "bDestroy": true,
                        "bPaginate": true,
                        "bLengthChange": true,
                        "bFilter": true,
                        "bInfo": false,
                        "bAutoWidth": false,
                        "asStripClasses": null,
                        "colReorder": false,
                        "stateSave":true,
                        "language": {
                            "lengthMenu": "_MENU_ Registro",
                            "paginate": {
                                "previos": "<",
                                "next": ">"
                            },
                            "search": "Buscar Alumno ",
                        },
                        "order": [[1, "desc"]],
                        "createdRow": function (row, data, dataIndex) {
                            row.childNodes[2].style.textAlign = 'center';
                            row.childNodes[3].style.textAlign = 'center';
                            row.childNodes[4].style.textAlign = 'center';
                            row.childNodes[5].style.textAlign = 'center';
                            row.childNodes[6].style.textAlign = 'center';
                            row.childNodes[7].style.textAlign = 'center';
                        }
                        , "fnDrawCallback": function (oSettings) {
                            registros = oSettings.aiDisplay.length;
                            $('#lbRegistros').text(registros);
                        }
                    });

                    var fil = $('#dtVoBo_filter label input');
                    fil.removeClass('input-small').addClass('input-large');

                    $('#Load').modal('hide');
                }
                $('#Load').modal('hide');
            },//success
        });// end $.ajax


    }

    ///exportar
    function exportarexcel(Tabla,nombre) {

        var table1 = $('#' + Tabla).dataTable().api();
        var data1 = table1.rows({ filter: 'applied' }).data();
        var data2 = [];
        var hd;

        $(data1).each(function () {
            var ojb2 = {
                "Alumno Id | Nombre": this.AlumnoId + " | " + this.Nombre,
                "Oferta Educativa": this.OfertaEducativa,
                "Inscrito": this.Inscrito,
                "Fecha Inscripción": this.FechaInscrito,
                "Fecha VoBo": this.FechaVoBo,
                "Inscripción Completa": this.InscripcionCompleta,
                "Asesoría Especial": this.Asesorias,
                "Adelanto Materia": this.Materias,
                "Coordinador": this.UsuarioVoBo
            };
            data2.push(ojb2);
        });
        hd = ["Alumno Id | Nombre","Oferta Educativa","Inscrito","Fecha Inscripción","Fecha VoBo","Inscripción Completa","Asesoría Especial","Adelanto Materia","Coordinador"];


        var ws = XLSX.utils.json_to_sheet(data2, {
            header: hd
        });

        var ws_name = nombre;

        function Workbook() {
            if (!(this instanceof Workbook)) return new Workbook();
            this.SheetNames = [];
            this.Sheets = {};
        }

        var wb = new Workbook();

        /* add worksheet to workbook */
        wb.SheetNames.push(ws_name);

        wb.Sheets[ws_name] = ws;

        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });


        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }

        saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), nombre+" "+ descripcion+ ".xlsx");
    }

    
    $('#btndtVoBo').on('click', function () {
        exportarexcel('dtVoBo',"VoBo Academico");
    });

    $("#dtVoBo").on('click', 'a', function () {
        var rowData = tblVoBo.row($(this).closest('tr')).data();
        alumnoid = rowData.AlumnoId;
        $("#lblNombre").text(rowData.Nombre);
        $("#txtMail").val(rowData.Email);
        $("#PopEnviar").modal("show");
    });

    $("#btnEnviar").click(function ()
    {
        $('#Load').modal('show');
        $.ajax({
            type: 'POST',
            url: "WS/Reporte.asmx/ReporteVoBoEnviarEmail",
            data: "{AlumnoId:" + alumnoid + ",EmailAlumno:'" + $("#txtMail").val()+"'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            success: function (data) {
                $('#Load').modal('hide');
                if (data.d) {
                    alertify.alert("Email enviado");

                    $("#PopEnviar").modal("hide");
                } else
                {
                    alertify.alert("Email no pudo ser enviado");
                }
                
            }//success
        });// $.ajax
    });

});


