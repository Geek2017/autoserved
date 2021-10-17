@extends('layout.default', ['sidebarHide' => true, 'appClass' => 'app-content-full-width'])

@section('title', 'Full Width')

@push('scripts')
    <script src="/assets/plugins/highlight.js/highlight.min.js"></script>
    <script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
        <!-- BEGIN #content -->
		<div id="content" class="app-content">
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
				<li class="breadcrumb-item active">FULL WIDTH</li>
			</ul>

			<h1 class="page-header">
				Full Width <small>page header description goes here...</small>
			</h1>

			<hr class="mb-4" />

			<p>
				Add the following page variable for full width page setting.
			</p>

			<div class="hljs-container rounded mb-3">
				<pre><code class="xml">@@extends('layout.default', ['sidebarHide' => true, 'appClass' => 'app-content-full-width'])</code></pre>
			</div>

			<p>
				<a href="javascript:history.back(-1);" class="btn btn-default"><i class="fa fa-chevron-left fa-fw ml-n1"></i> Back to previous Page</a>
			</p>
		</div>
		<!-- END #content -->
@endsection
