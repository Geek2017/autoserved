@extends('layout.default', ['appClass' => 'app-content-full-height'])

@section('title', 'Full Height')

@push('scripts')
    <script src="/assets/plugins/highlight.js/highlight.min.js"></script>
    <script src="/assets/js/demo/highlightjs.demo.js"></script>
@endpush

@section('content')
        <!-- BEGIN #content -->
		<div id="content" class="app-content" data-scrollbar="true" data-height="100%" data-skip-mobile="true">
			<ul class="breadcrumb">
				<li class="breadcrumb-item"><a href="#">LAYOUT</a></li>
				<li class="breadcrumb-item active">FULL HEIGHT</li>
			</ul>

			<h1 class="page-header">
				Full Height <small>page header description goes here...</small>
			</h1>

			<hr class="mb-4" />

			<p>
				Add the following page variable for full height page setting.
			</p>

			<div class="hljs-container rounded mb-3">
				<pre><code class="xml">@@extends('layout.default', ['appClass' => 'app-content-full-height'])</code></pre>
			</div>

			<div>
				Content Area with scrollbar. Try to scroll down. <i class="fa fa-arrow-down text-primary"></i>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				You got the bottom
			</div>
		</div>
		<!-- END #content -->
@endsection
