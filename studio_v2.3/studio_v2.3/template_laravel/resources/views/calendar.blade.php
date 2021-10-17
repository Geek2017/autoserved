@extends('layout.default', ['appClass' => 'app-content-full-height'])

@section('title', 'Calendar')

@push('css')
		<link href="/assets/plugins/@fullcalendar/common/main.min.css" rel="stylesheet" />
		<link href="/assets/plugins/@fullcalendar/daygrid/main.min.css" rel="stylesheet" />
		<link href="/assets/plugins/@fullcalendar/timegrid/main.min.css" rel="stylesheet" />
		<link href="/assets/plugins/@fullcalendar/list/main.min.css" rel="stylesheet" />
		<link href="/assets/plugins/@fullcalendar/bootstrap/main.min.css rel="stylesheet" />
@endpush

@push('scripts')
	<script src="/assets/plugins/moment/moment.js"></script>
	<script src="/assets/plugins/@fullcalendar/core/main.global.js"></script>
	<script src="/assets/plugins/@fullcalendar/daygrid/main.global.js"></script>
	<script src="/assets/plugins/@fullcalendar/timegrid/main.global.js"></script>
	<script src="/assets/plugins/@fullcalendar/interaction/main.global.js"></script>
	<script src="/assets/plugins/@fullcalendar/list/main.global.js"></script>
	<script src="/assets/plugins/@fullcalendar/bootstrap/main.global.js"></script>
	<script src="/assets/js/demo/calendar.demo.js"></script>
@endpush

@section('content')
    <!-- BEGIN #content -->
		<div id="content" class="app-content p-0">
			<!-- BEGIN calendar -->
			<div class="calendar">
				<!-- BEGIN calendar-body -->
				<div class="calendar-body">
					<div id="calendar"></div>
				</div>
				<!-- ENG calendar-body -->
				<!-- BEGIN calendar-sidebar -->
				<div class="calendar-sidebar">
					<div class="desktop-sticky-top flex-fill">
						<div class="calendar-sidebar-title">Draggable Events:</div>
						<div class="fc-event-list" id="external-events">
							<div class="fc-event-item"><div class="fc-event-link" data-color="#ff2d55"><i class="fa fa-circle fs-8px me-2 text-pink"></i> Meeting</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#ff3b30"><i class="fa fa-circle fs-8px me-2 text-danger"></i> Group Discussion</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#FF9500"><i class="fa fa-circle fs-8px me-2 text-warning"></i> Brainstorming</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#FFCC00"><i class="fa fa-circle fs-8px me-2 text-yellow"></i> Presentation</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#1ABD36"><i class="fa fa-circle fs-8px me-2 text-success"></i> Holiday</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#0cd096"><i class="fa fa-circle fs-8px me-2 text-teal"></i> Sick Leave</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#30beff"><i class="fa fa-circle fs-8px me-2 text-info"></i> Overtime</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#1f6bff"><i class="fa fa-circle fs-8px me-2 text-blue"></i> Work from Home</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#640DF3"><i class="fa fa-circle fs-8px me-2 text-indigo"></i> Business Travel</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#5b2e91"><i class="fa fa-circle fs-8px me-2 text-purple"></i> Breakfast</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#869ac0"><i class="fa fa-circle fs-8px me-2 text-muted"></i> Lunch</div></div>
							<div class="fc-event-item"><div class="fc-event-link" data-color="#869ac0"><i class="fa fa-circle fs-8px me-2 text-muted"></i> Dinner</div></div>
						</div>
					</div>
				</div>
				<!-- ENG calendar-sidebar -->
			</div>
			<!-- end calendar -->
		</div>
		<!-- END #content -->
@endsection
