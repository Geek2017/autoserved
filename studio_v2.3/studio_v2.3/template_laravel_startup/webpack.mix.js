const mix = require('laravel-mix');
require('laravel-mix-dload');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */


// core css
mix.sass('resources/scss/styles.scss', 'public/assets/css/app.min.css');
mix.combine([
  'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
	'node_modules/jquery-ui-dist/jquery-ui.min.css',
	'node_modules/animate.css/animate.min.css',
	'node_modules/pace-js/themes/black/pace-theme-flash.css'
], 'public/assets/css/vendor.min.css');
mix.copy('resources/scss/images/', 'public/assets/css/images/');


// core js
mix.combine([
    'resources/js/app.js'
], 'public/assets/js/app.min.js');
mix.combine([
    'node_modules/pace-js/pace.min.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/jquery-ui-dist/jquery-ui.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
    'node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
    'node_modules/js-cookie/src/js.cookie.js'
], 'public/assets/js/vendor.min.js');

		
// plugins
mix.copy('node_modules/bootstrap/', 'public/assets/plugins/bootstrap/');
mix.copy('node_modules/pace-js/', 'public/assets/plugins/pace-js/');
mix.copy('node_modules/jquery/', 'public/assets/plugins/jquery/');
mix.copy('node_modules/jquery-ui-dist/', 'public/assets/plugins/jquery-ui-dist/');
mix.copy('node_modules/jquery-slimscroll/', 'public/assets/plugins/jquery-slimscroll/');
mix.copy('node_modules/js-cookie/', 'public/assets/plugins/js-cookie/');
mix.copy('node_modules/@fortawesome/', 'public/assets/plugins/@fortawesome/');
mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts/', 'public/assets/webfonts/');
mix.copy('node_modules/@fullcalendar/', 'public/assets/plugins/@fullcalendar/');
mix.copy('node_modules/apexcharts/', 'public/assets/plugins/apexcharts/');
mix.copy('node_modules/blueimp-file-upload/', 'public/assets/plugins/blueimp-file-upload/');
mix.copy('node_modules/blueimp-tmpl/', 'public/assets/plugins/blueimp-tmpl/');
mix.copy('node_modules/blueimp-gallery/', 'public/assets/plugins/blueimp-gallery/');
mix.copy('node_modules/blueimp-canvas-to-blob/', 'public/assets/plugins/blueimp-canvas-to-blob/');
mix.copy('node_modules/blueimp-load-image/', 'public/assets/plugins/blueimp-load-image/');
mix.copy('node_modules/bootstrap-datepicker/', 'public/assets/plugins/bootstrap-datepicker/');
mix.copy('node_modules/bootstrap-daterangepicker/', 'public/assets/plugins/bootstrap-daterangepicker/');
mix.copy('node_modules/bootstrap-slider/', 'public/assets/plugins/bootstrap-slider/');
mix.copy('node_modules/bootstrap-timepicker/', 'public/assets/plugins/bootstrap-timepicker/');
mix.copy('node_modules/bootstrap-3-typeahead/', 'public/assets/plugins/bootstrap-3-typeahead/');
mix.copy('node_modules/bootstrap-table/', 'public/assets/plugins/bootstrap-table/');
mix.copy('node_modules/chart.js/', 'public/assets/plugins/chart.js/');
mix.copy('node_modules/datatables.net/', 'public/assets/plugins/datatables.net/');
mix.copy('node_modules/datatables.net-bs4/', 'public/assets/plugins/datatables.net-bs4/');
mix.copy('node_modules/datatables.net-autofill/', 'public/assets/plugins/datatables.net-autofill/');
mix.copy('node_modules/datatables.net-autofill-bs4/', 'public/assets/plugins/datatables.net-autofill-bs4/');
mix.copy('node_modules/datatables.net-buttons/', 'public/assets/plugins/datatables.net-buttons/');
mix.copy('node_modules/datatables.net-buttons-bs4/', 'public/assets/plugins/datatables.net-buttons-bs4/');
mix.copy('node_modules/datatables.net-colreorder/', 'public/assets/plugins/datatables.net-colreorder/');
mix.copy('node_modules/datatables.net-colreorder-bs4/', 'public/assets/plugins/datatables.net-colreorder-bs4/');
mix.copy('node_modules/datatables.net-fixedcolumns/', 'public/assets/plugins/datatables.net-fixedcolumns/');
mix.copy('node_modules/datatables.net-fixedcolumns-bs4/', 'public/assets/plugins/datatables.net-fixedcolumns-bs4/');
mix.copy('node_modules/datatables.net-fixedheader/', 'public/assets/plugins/datatables.net-fixedheader/');
mix.copy('node_modules/datatables.net-fixedheader-bs4/', 'public/assets/plugins/datatables.net-fixedheader-bs4/');
mix.copy('node_modules/datatables.net-keytable/', 'public/assets/plugins/datatables.net-keytable/');
mix.copy('node_modules/datatables.net-keytable-bs4/', 'public/assets/plugins/datatables.net-keytable-bs4/');
mix.copy('node_modules/datatables.net-responsive/', 'public/assets/plugins/datatables.net-responsive/');
mix.copy('node_modules/datatables.net-responsive-bs4/', 'public/assets/plugins/datatables.net-responsive-bs4/');
mix.copy('node_modules/datatables.net-rowgroup/', 'public/assets/plugins/datatables.net-rowgroup/');
mix.copy('node_modules/datatables.net-rowgroup-bs4/', 'public/assets/plugins/datatables.net-rowgroup-bs4/');
mix.copy('node_modules/datatables.net-rowreorder-bs4/', 'public/assets/plugins/datatables.net-rowreorder-bs4/');
mix.copy('node_modules/datatables.net-scroller/', 'public/assets/plugins/datatables.net-scroller/');
mix.copy('node_modules/datatables.net-scroller-bs4/', 'public/assets/plugins/datatables.net-scroller-bs4/');
mix.copy('node_modules/datatables.net-select/', 'public/assets/plugins/datatables.net-select/');
mix.copy('node_modules/datatables.net-select-bs4/', 'public/assets/plugins/datatables.net-select-bs4/');
mix.copy('node_modules/jvectormap-next/', 'public/assets/plugins/jvectormap-next/');
mix.copy('node_modules/jquery-migrate/dist/', 'public/assets/plugins/jquery-migrate/dist/');
mix.copy('node_modules/jquery.maskedinput/', 'public/assets/plugins/jquery.maskedinput/');
mix.copy('node_modules/kbw-countdown/', 'public/assets/plugins/kbw-countdown/');
mix.copy('node_modules/masonry-layout/dist/', 'public/assets/plugins/masonry-layout/dist/');
mix.copy('node_modules/moment/', 'public/assets/plugins/moment/');
mix.copy('node_modules/photoswipe/', 'public/assets/plugins/photoswipe/');
mix.copy('node_modules/select-picker/', 'public/assets/plugins/select-picker/');
mix.copy('node_modules/spectrum-colorpicker2/dist/', 'public/assets/plugins/spectrum-colorpicker2/dist/');
mix.copy('node_modules/summernote/', 'public/assets/plugins/summernote/');
mix.copy('node_modules/tag-it/', 'public/assets/plugins/tag-it/');

mix.download({
    enabled: true,
    urls: [{
        'url': 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/styles/default.min.css',
        'dest': 'public/assets/plugins/highlight.js/'
    },{
        'url': 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.4.0/highlight.min.js',
        'dest': 'public/assets/plugins/highlight.js/'
    },{
        'url': 'https://jvectormap.com/js/jquery-jvectormap-world-mill.js',
        'dest': 'public/assets/plugins/jvectormap-next/'
    }]
});