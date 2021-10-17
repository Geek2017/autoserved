@extends('layout.default', ['appClass' => 'app-sidebar-minified'])

@section('title', 'Minified Sidebar')

@push('scripts')
    <script src="/assets/plugins/highlight.js/highlight.min.js"></script>
    <script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
        <!-- BEGIN #content -->
		<div id="content" class="app-content">
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
				<li class="breadcrumb-item active">MINIFIED SIDEBAR</li>
			</ul>

			<h1 class="page-header">
				Minified Sidebar <small>page header description goes here...</small>
			</h1>

			<hr class="mb-4" />

			<p>
				Add the following page variable sidebar page setting.
			</p>

			<div class="hljs-container rounded">
				<pre><code class="xml">@@extends('layout.default', ['appClass' => 'app-sidebar-minified'])</code></pre>
			</div>
		</div>
		<!-- END #content -->
@endsection
