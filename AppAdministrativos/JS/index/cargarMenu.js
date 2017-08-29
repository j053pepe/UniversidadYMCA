﻿$(function init() {
    AppRouter = Backbone.Router.extend({
        routes: {
            "Views/:direccion": "Views",
            "*actions": "defaultRoute",            
        },
    });

    // Initiate the router
    var app_router = new AppRouter;

    var Funciones = {
        btnSalir: function () {
            $.removeCookie('userAdmin', { path: '/' });
            Backbone.history.stop();
            var url = "login.html";
            $(location).attr('href', url);
        },
        router: function () {           
            console.log(app_router);
            app_router.on('route:defaultRoute', function (actions) {
                if (typeof $.cookie('userAdmin') === 'undefined') {
                    Backbone.history.stop();
                    $(location).attr('href', "login.html");
                    return false;
                }
                $('#divDinamico').empty();
                if (actions === null) {
                    actions = "#";
                    return false;
                }
                if (actions === '#') { return false; }                
                var url = actions;
                //console.log('Perras');
                $('#divDinamico').load(url);
            });

            app_router.on('router:Views', function (vista, page) {
                console.log(vista);
                console.log(page);
            });

            // Start Backbone history a necessary step for bookmarkable URL's
            Backbone.history.start();

        },
        Menu: function () {
            var Menu = "";

            $.blockUI({
                message: "<h1>Cargando Menu, por favor espere....</h1>",
                css: { backgroundColor: '#48525e', color: '#fff' }
            });

            $.ajax({
                url: 'WS/Usuario.asmx/ConsultarMenu',
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: "{'usuarioId':'" + $.cookie('userAdmin') + "'}",
                dataType: 'json',
                success: function (Resultado) {
                    Datos = Resultado.d;
                    if (Datos == null) {
                        alert('Error en la carga del menu');
                        $.unblockUI();
                    }
                    else {
                        $(Resultado.d).each(function () {
                            Menu += '<li class="menu-dropdown mega-menu-dropdown ">' +
                                '<a class="dropdown-toggle"  data-hover="megamenu-dropdown" data-close-others="true" data-toggle="dropdown" href="#" aria-haspopup="true" aria-expanded="false">' +

                                this.Descripcion +

                                ' <i class="fa fa-angle-down"></i>' +
                                '</a>' +
                                '<ul class="dropdown-menu pull-left">';
                            $(this.SubMenu).each(function (ind, ele) {
                                Menu +=
                                    '<li class="dropdown-submenu">' +
                                    '<a href="#' + ele.Direccion + '" class="contenido">' +
                                    '<i class="fa fa-history"></i>'
                                    + ele.Descripcion +
                                    '</a>' +
                                    '</li>';
                            });
                            Menu += '</ul>' + '</li>';
                        });
                        $('#Menu').append(Menu);
                        $.unblockUI();
                        Funciones.router();
                    }
                },
                error: function (Resultado) {
                    alert('Se presento un error en la validación de las credenciales');
                    $.unblockUI();
                    $(location).attr('href', 'Login.html');
                }
            });
        }
    };
    Funciones.Menu();
    $('#btnSalir').on('click', Funciones.btnSalir);
});