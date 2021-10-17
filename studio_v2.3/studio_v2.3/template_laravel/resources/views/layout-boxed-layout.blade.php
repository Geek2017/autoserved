@extends('layout.default', ['bodyClass' => 'app-with-bg', 'appClass' => 'app-boxed-layout'])

@section('title', 'Boxed Layout')

@push('scripts')
    <script src="/assets/plugins/highlight.js/highlight.min.js"></script>
    <script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
        <!-- BEGIN #content -->
		<div id="content" class="app-content">
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
				<li class="breadcrumb-item active">BOXED LAYOUT</li>
			</ul>

			<h1 class="page-header">
				Boxed Layout <small>page header description goes here...</small>
			</h1>

			<hr class="mb-4" />

			<p>
				Add the following page variable for boxed layout page setting.
			</p>

			<div class="hljs-container rounded">
				<pre><code class="xml">@@extends('layout.default', ['bodyClass' => 'app-with-bg', 'appClass' => 'app-boxed-layout'])</code></pre>
			</div>
		</div>
		<!-- END #content -->
@endsection
