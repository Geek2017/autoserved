<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}"{{ (!empty($htmlAttribute)) ? $htmlAttribute : '' }}>
<head>
	@include('layout.partial.head')
</head>
<body class="{{ (!empty($bodyClass)) ? $bodyClass : '' }}">
	<!-- BEGIN #app -->
	<div id="app" class="app {{ (!empty($appClass)) ? $appClass : '' }}">
		@include('layout.partial.header')

		@includeWhen(empty($sidebarHide), 'layout.partial.sidebar')

	    @yield('content')

		@includeWhen(!empty($footer), 'layout.partial.footer')
	</div>
	<!-- END #app -->

	@include('layout.partial.scroll-top-btn')

	@include('layout.partial.scripts')
</body>
</html>
