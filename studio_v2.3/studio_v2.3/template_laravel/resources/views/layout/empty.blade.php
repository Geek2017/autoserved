<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}"{{ (!empty($htmlAttribute)) ? $htmlAttribute : '' }}>
<head>
	@include('layout.partial.head')
</head>
<body class="{{ (!empty($bodyClass)) ? $bodyClass : '' }}">
	@yield('content')

	@include('layout.partial.scroll-top-btn')

	@include('layout.partial.scripts')

</body>
</html>
