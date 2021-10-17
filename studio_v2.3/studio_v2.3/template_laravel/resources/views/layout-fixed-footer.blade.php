@extends('layout.default', ['footer' => true, 'appClass' => 'app-footer-fixed'])

@section('title', 'Fixed Footer')

@push('scripts')
    <script src="/assets/plugins/highlight.js/highlight.min.js"></script>
    <script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
        <!-- BEGIN #content -->
		<div id="content" class="app-content">
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
				<li class="breadcrumb-item active">FIXED FOOTER</li>
			</ul>

			<h1 class="page-header">
				Fixed Footer <small>page header description goes here...</small>
			</h1>

			<hr class="mb-4" />

			<p>
				Add the following page variable for fixed footer page setting.
			</p>

			<div class="hljs-container rounded">
				<pre><code class="xml">@@extends('layout.default', ['footer' => true, 'appClass' => 'app-footer-fixed'])</code></pre>
			</div>
		</div>
		<!-- END #content -->
@endsection
