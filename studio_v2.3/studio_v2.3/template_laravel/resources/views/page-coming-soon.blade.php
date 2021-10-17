@extends('layout.empty')

@section('title', 'Coming Soon Page')

@push('css')
    <link href="/assets/plugins/kbw-countdown/dist/css/jquery.countdown.css" rel="stylesheet" />
@endpush

@push('scripts')
    <script src="/assets/plugins/kbw-countdown/dist/js/jquery.plugin.js"></script>
    <script src="/assets/plugins/kbw-countdown/dist/js/jquery.countdown.js"></script>
    <script src="/assets/js/demo/page-coming-soon.demo.js"></script>
@endpush

@section('content')
    <!-- BEGIN coming-soon -->
		<div class="coming-soon">
			<!-- BEGIN coming-soon-content -->
			<div class="coming-soon-content">
				<div class="coming-soon-img mb-4"><img src="/assets/img/page/coming-soon.svg" alt="" /></div>
				<div class="coming-soon-timer mb-3">
					<div id="timer"></div>
				</div>
				<h2 class="mb-1">We're coming soon!</h2>
				<p class="mb-0">We are working very hard on the new version of our site.<br /> It will bring a lot of new features. Stay tuned!</p>
			</div>
			<!-- END coming-soon-content -->
		</div>
		<!-- END coming-soon -->
@endsection
