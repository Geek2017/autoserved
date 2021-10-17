@extends('layout.default')

@section('title', 'Dashboard')

@push('scripts')
    <script src="/assets/plugins/highlight.js/highlight.min.js"></script>
		<script src="/assets/js/demo/highlightjs.demo.js"></script>
		<script src="/assets/plugins/chart.js/dist/Chart.min.js"></script>
		<script src="/assets/js/demo/widgets.demo.js"></script>
		<script src="/assets/js/demo/sidebar-scrollspy.demo.js"></script>
@endpush

@section('content')
    <!-- BEGIN #content -->
		<div id="content" class="app-content">
			<!-- BEGIN container -->
			<div class="container">
				<!-- BEGIN row -->
				<div class="row justify-content-center">
					<!-- BEGIN col-10 -->
					<div class="col-xl-10">
						<!-- BEGIN row -->
						<div class="row">
							<!-- BEGIN col-9 -->
							<div class="col-xl-9">
								<h1 class="page-header">
									Widgets <small>page header description goes here...</small>
								</h1>
								<hr class="mb-4" />
								
								<!-- BEGIN #cardWidget -->
								<div id="cardWidget" class="mb-5">
									<h4>Card widget</h4>
									<p>Card widget is created by using existing Bootstrap <code>.card</code> component with <code>.card-img</code>, <code>.card-img-overlay</code> and <code>.d-flex</code> utilities.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-8">
													<div class="card border-0 text-white overflow-hidden" style="max-height: 250px">
														<img src="/assets/img/gallery/widget-cover-1.jpg" alt="" class="card-img" />
														<div class="card-img-overlay d-flex flex-column bg-dark-transparent-7 rounded">
															<div class="flex-fill">
																<div class="d-flex align-items-center">
																	<h6>Youtube</h6>
																	<div class="dropdown dropdown-icon ms-auto">
																		<a href="#" class="text-white" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a>
																		<div class="dropdown-menu dropdown-menu-right">
																			<a href="#" class="dropdown-item">View</a>
																			<a href="#" class="dropdown-item">Analytics</a>
																			<a href="#" class="dropdown-item">Report</a>
																		</div>
																	</div>
																</div>
															</div>
															<div>
																<a href="#" class="text-white text-decoration-none d-flex align-items-center">
																	<div class="bg-gradient-red w-50px h-50px rounded-3 d-flex align-items-center justify-content-center">
																		<i class="fa fa-play"></i>
																	</div>
																	<div class="ms-3">
																		<div class="fw-600">New Videos - Behind The Forest Tours</div>
																		<div class="fs-13px">
																			<i class="far fa-eye"></i> 892 views 
																			<i class="far fa-clock ms-3"></i> 39min ago</div>
																	</div>
																</a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="card border-0 text-white overflow-hidden" style="max-height: 250px"&gt;
  &lt;!-- card-img --&gt;
  &lt;img src="/assets/img/gallery/widget-cover-1.jpg" class="card-img" /&gt;
  
  &lt;!-- card-img-overlay --&gt;
  &lt;div class="card-img-overlay d-flex flex-column bg-dark-transparent-7 rounded"&gt;
    &lt;!-- top content --&gt;
    &lt;div class="flex-fill"&gt;
      &lt;div class="d-flex align-items-center"&gt;
        &lt;h6&gt;Youtube&lt;/h6&gt;
        &lt;div class="dropdown ms-auto"&gt;
          &lt;a href="#" class="text-white" data-bs-toggle="dropdown"&gt;&lt;i class="fa fa-ellipsis-h"&gt;&lt;/i&gt;&lt;/a&gt;
          &lt;div class="dropdown-menu dropdown-menu-right"&gt;
            ...
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
    
    &lt;!-- bottom-content --&gt;
    &lt;div&gt;
      &lt;a href="#" class="text-white text-decoration-none d-flex align-items-center"&gt;
        &lt;div class="bg-gradient-red w-50px h-50px rounded-3 d-flex align-items-center justify-content-center"&gt;
          &lt;i class="fa fa-play"&gt;&lt;/i&gt;
        &lt;/div&gt;
        &lt;div class="ms-3"&gt;
          &lt;div class="fw-600"&gt;New Videos - Behind The Forest Tours&lt;/div&gt;
          &lt;div class="fs-13px"&gt;
            &lt;i class="far fa-eye"&gt;&lt;/i&gt; 892 views 
            &lt;i class="far fa-clock ms-3"&gt;&lt;/i&gt; 39min ago&lt;/div&gt;
        &lt;/div&gt;
      &lt;/a&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #cardWidget -->
								
								<!-- BEGIN #listWidget -->
								<div id="listWidget" class="mb-5">
									<h4>List widget</h4>
									<p>List widget is created by using existing Bootstrap <code>.list-group</code> component with <code>.d-flex</code> and studio utilities css classes.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-6">
													<div class="text-muted fs-12px mb-2"><b>WITH ICON</b></div>
													<div class="list-group mb-3">
														<div class="list-group-item d-flex align-items-center">
															<div class="w-40px h-40px d-flex align-items-center justify-content-center bg-gradient-cyan-blue text-white rounded-2 ms-n1">
																<i class="fab fa-apple fa-lg"></i>
															</div>
															<div class="flex-fill px-3">
																<div class="fw-600">Apps Store</div>
																<div class="fs-12px text-muted">102 new download</div>
															</div>
															<div class="dropdown">
																<a href="#" data-bs-toggle="dropdown" class="text-muted"><i class="fa fa-ellipsis-h"></i></a>
																<div class="dropdown-menu dropdown-menu-right">
																	<a href="#" class="dropdown-item">View</a>
																	<a href="#" class="dropdown-item">Analytics</a>
																	<a href="#" class="dropdown-item">Report</a>
																</div>
															</div>
														</div>
														<div class="list-group-item d-flex align-items-center">
															<div class="w-40px h-40px d-flex align-items-center justify-content-center bg-gradient-orange text-white rounded ms-n1">
																<i class="fa fa-book fa-lg"></i>
															</div>
															<div class="flex-fill px-3">
																<div class="fw-600">iBooks App</div>
																<div class="fs-12px text-muted">32 new download</div>
															</div>
															<div class="dropdown">
																<a href="#" data-bs-toggle="dropdown" class="text-muted"><i class="fa fa-ellipsis-h"></i></a>
																<div class="dropdown-menu dropdown-menu-right">
																	<a href="#" class="dropdown-item">View</a>
																	<a href="#" class="dropdown-item">Analytics</a>
																	<a href="#" class="dropdown-item">Report</a>
																</div>
															</div>
														</div>
													</div>
													<div class="text-muted fs-12px mb-2"><b>WITH IMAGE</b></div>
													<div class="list-group mb-3">
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark">
															<div class="w-40px h-40px d-flex align-items-center justify-content-center ms-n1">
																<img src="/assets/img/user/user.jpg" alt="" class="ms-100 mh-100 rounded-circle" />
															</div>
															<div class="flex-fill ps-3">
																<div class="fw-600">
																	Isaiah Hughes <span class="fa fa-circle text-success fs-9px ms-2"></span>
																</div>
															</div>
														</a>
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark">
															<div class="w-40px h-40px d-flex align-items-center justify-content-center ms-n1">
																<img src="/assets/img/user/user-2.jpg" alt="" class="ms-100 mh-100 rounded-circle" />
															</div>
															<div class="flex-fill ps-3">
																<div class="fw-600">
																	Ryan Turner <span class="fa fa-circle text-muted fs-9px ms-2"></span>
																</div>
															</div>
														</a>
													</div>
												</div>
												<div class="col-xl-6">
													
													<div class="text-muted fs-12px mb-2"><b>WITH SETTINGS</b></div>
													<div class="list-group">
														<div class="list-group-item d-flex align-items-center">
															<div class="flex-fill">
																<div class="fw-600">Server auto backup</div>
																<div class="fs-12px text-muted">last backup since yesterday</div>
															</div>
															<div>
																<div class="form-check me-n1">
																	<input type="checkbox" class="form-check-input" id="customSwitch1" checked />
																	<label class="form-check-label" for="customSwitch1"></label>
																</div>
															</div>
														</div>
														<div class="list-group-item d-flex align-items-center">
															<div class="flex-fill">
																<div class="fw-600">Analytics enabled</div>
																<div class="fs-12px text-muted">3,392 data collected</div>
															</div>
															<div>
																<div class="form-switch me-n1">
																	<input type="checkbox" class="form-check-input" id="customSwitch2"  />
																	<label class="form-check-label" for="customSwitch2"></label>
																</div>
															</div>
														</div>
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
															<div class="flex-fill">
																<div class="fw-600">Link with arrow</div>
															</div>
															<div>
																<i class="fa fa-chevron-right"></i>
															</div>
														</a>
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center">
															<div class="flex-fill">
																<div class="fw-600">Link with arrow</div>
															</div>
															<div>
																<i class="fa fa-chevron-right"></i>
															</div>
														</a>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code>&lt;div class="list-group"&gt;
  &lt;!-- with icon --&gt;
  &lt;div class="list-group-item d-flex align-items-center"&gt;
    &lt;div class="w-40px h-40px d-flex align-items-center justify-content-center bg-gradient-orange text-white rounded-2 ms-n1"&gt;
      &lt;i class="fa fa-book fa-lg"&gt;&lt;/i&gt;
    &lt;/div&gt;
    &lt;div class="flex-fill px-3"&gt;
      &lt;div class="fw-600"&gt;iBooks App&lt;/div&gt;
      &lt;div class="fs-12px text-muted"&gt;32 new download&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="dropdown"&gt;
      &lt;a href="#" data-bs-toggle="dropdown" class="text-muted"&gt;&lt;i class="fa fa-ellipsis-h"&gt;&lt;/i&gt;&lt;/a&gt;
      &lt;div class="dropdown-menu dropdown-menu-right"&gt;
        ...
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  
  &lt;!-- with image --&gt;
  &lt;a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark"&gt;
    &lt;div class="w-40px h-40px d-flex align-items-center justify-content-center ms-n1"&gt;
      &lt;img src="/assets/img/user/user.jpg" class="ms-100 mh-100 rounded-circle" /&gt;
    &lt;/div&gt;
    &lt;div class="flex-fill ps-3"&gt;
      &lt;div class="fw-600"&gt;
        Isaiah Hughes &lt;span class="fa fa-circle text-success fs-9px ms-2"&gt;&lt;/span&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/a&gt;
  
  &lt;!-- link with icon --&gt;
  &lt;a href="#" class="list-group-item list-group-item-action d-flex align-items-center"&gt;
    &lt;div class="flex-fill"&gt;
      &lt;div class="fw-600"&gt;Link with arrow&lt;/div&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;i class="fa fa-chevron-right"&gt;&lt;/i&gt;
    &lt;/div&gt;
  &lt;/a&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #listWidget -->
								
								<!-- BEGIN #statsWidget -->
								<div id="statsWidget" class="mb-5">
									<h4>Stats widget</h4>
									<p>States widget is created by using Bootstrap <code>.card</code> component with <code>.d-flex</code> and <code>background-color</code> utilities.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-8">
													<a href="#" class="card bg-gradient-cyan-blue border-0 text-decoration-none">
														<div class="card-body d-flex align-items-center text-white">
															<div class="flex-fill">
																<div class="mb-1">Total Visitors + Page Views</div>
																<h2>22,930</h2>
																<div>Today, 11:25AM</div>
															</div>
															<div class="opacity-5">
																<i class="fa fa-shopping-bag fa-4x"></i>
															</div>
														</div>
													</a>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;a href="#" class="card bg-gradient-cyan-blue border-0 text-decoration-none"&gt;
  &lt;div class="card-body d-flex align-items-center text-white"&gt;
    &lt;div class="flex-fill"&gt;
      &lt;div class="mb-1"&gt;Total Visitors + Page Views&lt;/div&gt;
      &lt;h2&gt;22,930&lt;/h2&gt;
      &lt;div&gt;Today, 11:25AM&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="opacity-5"&gt;
      &lt;i class="fa fa-shopping-bag fa-4x"&gt;&lt;/i&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/a&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #statsWidget -->
								
								<!-- BEGIN #chartWidget -->
								<div id="chartWidget" class="mb-5">
									<h4>Chart widget</h4>
									<p>Chart widget created by using Bootstrap <code>.card</code> and <code>.list-group</code> component combined with Chart.js plugins.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-8">
													<div class="card border-0 overflow-hidden">
														<div class="card-body bg-gradient-orange-red rounded-top text-white text-center">
															<div class="fs-16px fw-600">Weekly Web Analytics</div>
															<div class="fs-13px mb-3">Week 11 May - 17 May</div>
															<canvas id="barChart" height="120"></canvas>
														</div>
														<div class="list-group">
															<div class="list-group-item border-top-0 rounded-top-0 d-flex align-items-center p-3">
																<div class="w-40px h-40px rounded bg-gradient-orange-red text-white d-flex align-items-center justify-content-center">
																	<i class="fa fa-user fa-lg"></i>
																</div>
																<div class="flex-fill px-3">
																	<div class="fw-600">Total Visitors</div>
																	<div class="fs-12px text-muted">11 May - 17 May</div>
																</div>
																<div>
																	<h2 class="mb-0">1.3m</h2>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="card border-0 overflow-hidden"&gt;
  &lt;div class="card-body bg-gradient-orange-red rounded-top text-white text-center"&gt;
    &lt;div class="fs-16px fw-600"&gt;Weekly Web Analytics&lt;/div&gt;
    &lt;div class="fs-13px mb-3"&gt;Week 11 May - 17 May&lt;/div&gt;
    &lt;canvas id="barChart" height="120"&gt;&lt;/canvas&gt;
  &lt;/div&gt;
  &lt;div class="list-group"&gt;
    &lt;div class="list-group-item border-top-0 rounded-top-0 d-flex align-items-center p-3"&gt;
      &lt;div class="w-40px h-40px rounded bg-gradient-orange-red text-white d-flex align-items-center justify-content-center"&gt;
        &lt;i class="fa fa-user fa-lg"&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class="flex-fill px-3"&gt;
        &lt;div class="fw-600"&gt;Total Visitors&lt;/div&gt;
        &lt;div class="fs-12px text-muted"&gt;11 May - 17 May&lt;/div&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;h2 class="mb-0"&gt;1.3m&lt;/h2&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #chartWidget -->
								
								<!-- BEGIN #userListWidget -->
								<div id="userListWidget" class="mb-5">
									<h4>User list widget</h4>
									<p>User list widget used to display people who participate in a project or a group.</p>
									<div class="card">
										<div class="card-body">
											<div class="widget-user-list">
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-1.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-2.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-3.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-4.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-5.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-6.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link"><img src="/assets/img/user/user-7.jpg" alt="" /></a></div>
												<div class="widget-user-list-item"><a href="#" class="widget-user-list-link bg-gray-200 text-gray-500 fs-12px fw-600">+26</a></div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="widget-user-list"&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-1.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-2.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-3.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-4.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-5.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-6.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link"&gt;&lt;img src="/assets/img/user/user-7.jpg" alt="" /&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="widget-user-list-item"&gt;&lt;a href="#" class="widget-user-list-link bg-gray-200 text-gray-500 fs-12px fw-600"&gt;+26&lt;/a&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #userListWidget -->
								
								<!-- BEGIN #mapWidget -->
								<div id="mapWidget" class="mb-5">
									<h4>Map widget</h4>
									<p>Map widget created with Bootstrap <code>.card</code> and <code>.list-group</code> component twitted with helper css classes.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-6">
													<div class="card">
														<div class="card-header fw-600 bg-white border-0">Google Map</div>
														<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d960.5886473867613!2d-122.41743634015282!3d37.776451983493104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2s!4v1495935122933" style="border:0; width: 100%; height: 10rem;" allowfullscreen></iframe>
														<div class="list-group list-group-flush">
															<div class="list-group-item d-flex">
																<div class="w-30px h-40px d-flex align-items-center justify-content-center">
																	<i class="fa fa-car fa-2x text-gray-300"></i>
																</div>
																<div class="flex-fill px-3">
																	<div class="fw-600">via Road I-88E</div>
																	<div class="fs-12px">Fastest route, the usual traffic</div>
																</div>
																<div class="text-nowrap">
																	<div class="text-success fw-600">3h 54min</div>
																	<div class="fs-12px">393km</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="card"&gt;
  &lt;div class="card-header fw-600 bg-white border-0"&gt;Google Map&lt;/div&gt;
  &lt;iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d960.5886473867613!2d-122.41743634015282!3d37.776451983493104!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c6c8f4459%3A0xb10ed6d9b5050fa5!2sTwitter+HQ!5e0!3m2!1sen!2s!4v1495935122933" style="border:0; width: 100%; height: 10rem;" allowfullscreen&gt;&lt;/iframe&gt;
  &lt;div class="list-group list-group-flush"&gt;
    &lt;div class="list-group-item d-flex"&gt;
      &lt;div class="w-30px h-40px d-flex align-items-center justify-content-center"&gt;
        &lt;i class="fa fa-car fa-2x text-gray-300"&gt;&lt;/i&gt;
      &lt;/div&gt;
      &lt;div class="flex-fill px-3"&gt;
        &lt;div class="fw-600"&gt;via Road I-88E&lt;/div&gt;
        &lt;div class="fs-12px"&gt;Fastest route, the usual traffic&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="text-nowrap"&gt;
        &lt;div class="text-success fw-600"&gt;3h 54min&lt;/div&gt;
        &lt;div class="fs-12px"&gt;393km&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #mapWidget -->
								
								<!-- BEGIN #chatWidget -->
								<div id="chatWidget" class="mb-5">
									<h4>Chat widget</h4>
									<p>Chat widget created by using Bootstrap <code>.card</code> component with custom created bubble chat ui.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-6">
													<div class="card">
														<div class="card-header bg-white fw-600 d-flex align-items-center">Discussion group <a href="#" class="ms-auto text-muted text-decoration-none" data-toggle="card-expand"><i class="fa fa-expand"></i></a></div>
														<div class="card-body bg-gray-100" data-scrollbar="true" data-height="200px">
															<div class="widget-chat">
																<div class="widget-chat-item">
																	<div class="widget-chat-media"><img src="/assets/img/user/user-2.jpg" alt="" /></div>
																	<div class="widget-chat-content">
																		<div class="widget-chat-name">Roberto Lambert</div>
																		<div class="widget-chat-message last">
																			Hey, I'm testing out group messaging.
																		</div>
																	</div>
																</div>
																<div class="widget-chat-item reply">
																	<div class="widget-chat-content">
																		<div class="widget-chat-message last">
																			Cool
																		</div>
																		<div class="widget-chat-status"><b>Read</b> 16:26</div>
																	</div>
																</div>
																<div class="widget-chat-date">Today 14:21</div>
																<div class="widget-chat-item">
																	<div class="widget-chat-media"><img src="/assets/img/user/user-3.jpg" alt="" /></div>
																	<div class="widget-chat-content">
																		<div class="widget-chat-name">Rick Powell</div>
																		<div class="widget-chat-message last">
																			Awesome! What's new?
																		</div>
																	</div>
																</div>
																<div class="widget-chat-item">
																	<div class="widget-chat-media"><img src="/assets/img/user/user-2.jpg" alt="" /></div>
																	<div class="widget-chat-content">
																		<div class="widget-chat-name">Roberto Lambert</div>
																		<div class="widget-chat-message">
																			Not much, It's got a new look, contact pics show up in group messaging, some other small stuff.
																		</div>
																		<div class="widget-chat-message last">
																			How's crusty old iOS 6 treating you?
																		</div>
																	</div>
																</div>
																<div class="widget-chat-item reply">
																	<div class="widget-chat-content">
																		<div class="widget-chat-message last">
																			Sucks
																		</div>
																		<div class="widget-chat-status"><b>Read</b> 16:30</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="card-footer bg-white">
															<div class="input-group">
																<input type="text" class="form-control" placeholder="Search for...">
																<button class="btn btn-default" type="button"><i class="fa fa-paper-plane text-muted"></i></button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="card"&gt;
  &lt;div class="card-header bg-white fw-600 d-flex align-items-center"&gt;Discussion group &lt;a href="#" class="ms-auto text-muted text-decoration-none" data-toggle="card-expand"&gt;&lt;i class="fa fa-expand"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/div&gt;
  &lt;div class="card-body bg-gray-100" data-scrollbar="true" data-height="200px"&gt;
    &lt;div class="widget-chat"&gt;
      &lt;div class="widget-chat-date"&gt;Today 14:21&lt;/div&gt;
      &lt;div class="widget-chat-item"&gt;
        &lt;div class="widget-chat-media"&gt;&lt;img src="/assets/img/user/user-2.jpg" alt="" /&gt;&lt;/div&gt;
        &lt;div class="widget-chat-content"&gt;
          &lt;div class="widget-chat-name"&gt;Roberto Lambert&lt;/div&gt;
          &lt;div class="widget-chat-message"&gt;
            Not much, It's got a new look, contact pics show up in group messaging, some other small stuff.
          &lt;/div&gt;
          &lt;div class="widget-chat-message last"&gt;
            How's crusty old iOS 6 treating you?
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="widget-chat-item reply"&gt;
        &lt;div class="widget-chat-content"&gt;
          &lt;div class="widget-chat-message last"&gt;
            Sucks
          &lt;/div&gt;
          &lt;div class="widget-chat-status"&gt;&lt;b&gt;Read&lt;/b&gt; 16:30&lt;/div&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
  &lt;div class="card-footer bg-white"&gt;
    &lt;div class="input-group"&gt;
      &lt;input type="text" class="form-control" placeholder="Search for..."&gt;
      &lt;button class="btn btn-default" type="button"&gt;&lt;i class="fa fa-paper-plane text-muted"&gt;&lt;/i&gt;&lt;/button&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #chatWidget -->
								
								<!-- BEGIN #profileWidget -->
								<div id="profileWidget" class="mb-5">
									<h4>Profile widget</h4>
									<p>Profile widget created by using Bootstrap <code>.card</code> component with Bootstrap grid.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
											  <div class="col-xl-6">
													<div class="card border-0 overflow-hidden rounded-bottom-0" style="height: 165px">
														<img src="/assets/img/gallery/widget-cover-1.jpg" class="card-img rounded-0" alt="" />
														<div class="card-img-overlay text-white text-center bg-dark-transparent-5">
															<div class="mb-2">
																<img src="/assets/img/user/user-5.jpg" alt="" width="80" class="rounded-circle" />
															</div>
															<div>
																<div class="fw-600">Maurice Patterson</div>
																<div class="fs-12px">Never give up</div>
															</div>
														</div>
													</div>
													<div class="card border-top-0 rounded-top-0">
														<div class="card-body py-2 px-3">
															<div class="row text-center">
																<div class="col-4">
																	<div class="fw-600">415</div>
																	<div class="fs-12px">posts</div>
																</div>
																<div class="col-4">
																	<div class="fw-600">140k</div>
																	<div class="fs-12px">followers</div>
																</div>
																<div class="col-4">
																	<div class="fw-600">697</div>
																	<div class="fs-12px">following</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;!-- top card --&gt;
&lt;div class="card border-0 overflow-hidden rounded-bottom-0" style="height: 165px"&gt;
  &lt;img src="/assets/img/gallery/widget-cover-1.jpg" class="card-img rounded-0" alt="" /&gt;
  &lt;div class="card-img-overlay text-white text-center bg-dark-transparent-5"&gt;
    &lt;div class="mb-2"&gt;
      &lt;img src="/assets/img/user/user-5.jpg" alt="" width="80" class="rounded-circle" /&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;div class="fw-600"&gt;Maurice Patterson&lt;/div&gt;
      &lt;div class="fs-13px"&gt;Never give up&lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;

&lt;!-- bottom card --&gt;
&lt;div class="card border-top-0 rounded-top-0"&gt;
  &lt;div class="card-body py-2 px-3"&gt;
    &lt;div class="row text-center"&gt;
      &lt;div class="col-4"&gt;
        &lt;div class="fw-600"&gt;415&lt;/div&gt;
        &lt;div class="fs-12px"&gt;posts&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="col-4"&gt;
        &lt;div class="fw-600"&gt;140k&lt;/div&gt;
        &lt;div class="fs-12px"&gt;followers&lt;/div&gt;
      &lt;/div&gt;
      &lt;div class="col-4"&gt;
        &lt;div class="fw-600"&gt;697&lt;/div&gt;
        &lt;div class="fs-12px"&gt;following&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #profileWidget -->
								
								<!-- BEGIN #productWidget -->
								<div id="productWidget" class="mb-5">
									<h4>Product widget</h4>
									<p>Product widget created by using Bootstrap <code>.list-group</code> component with <code>.d-flex</code> utilities.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-8">
													<div class="list-group">
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark">
															<div class="w-50px h-50px d-flex align-items-center justify-content-center ms-n1">
																<img src="/assets/img/product/product-1.jpg" alt="" class="ms-100 mh-100" />
															</div>
															<div class="flex-fill px-3">
																<div class="fw-600">iPhone 11 Pro Max</div>
																<div class="fs-12px text-muted">Apple</div>
																<div class="d-flex align-items-center fs-11px">
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-gray-300 me-1"></i>
																	(128)
																</div>
															</div>
															<div>
																<span class="badge bg-transparent border border-primary text-primary fs-12px fw-500 rounded-sm">
																	$999.00
																</span>
															</div>
														</a>
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark">
															<div class="w-50px h-50px d-flex align-items-center justify-content-center ms-n1">
																<img src="/assets/img/product/product-2.jpg" alt="" class="ms-100 mh-100" />
															</div>
															<div class="flex-fill px-3">
																<div class="fw-600">Macbook Pro</div>
																<div class="fs-12px text-muted">Apple</div>
																<div class="d-flex align-items-center fs-11px">
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-gray-300 me-1"></i>
																	(93)
																</div>
															</div>
															<div>
																<span class="badge bg-transparent border border-primary text-primary fs-12px fw-500 rounded-sm">
																	$599.00
																</span>
															</div>
														</a>
														<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark">
															<div class="w-50px h-50px d-flex align-items-center justify-content-center ms-n1">
																<img src="/assets/img/product/product-3.jpg" alt="" class="ms-100 mh-100" />
															</div>
															<div class="flex-fill px-3">
																<div class="fw-600">Apple Watch Series 5</div>
																<div class="fs-12px text-muted">Apple</div>
																<div class="d-flex align-items-center fs-11px">
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-warning"></i>
																	<i class="fa fa-star text-gray-300 me-1"></i>
																	(41)
																</div>
															</div>
															<div>
																<span class="badge bg-transparent border border-primary text-primary fs-12px fw-500 rounded-sm">
																	$399.00
																</span>
															</div>
														</a>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="list-group"&gt;
  &lt;a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark"&gt;
    &lt;div class="w-50px h-50px d-flex align-items-center justify-content-center ms-n1"&gt;
      &lt;img src="/assets/img/product/product-1.jpg" class="ms-100 mh-100 rounded"&gt;
    &lt;/div&gt;
    &lt;div class="flex-fill px-3"&gt;
      &lt;div class="fw-600"&gt;iPhone 11 Pro Max&lt;/div&gt;
      &lt;div class="fs-12px text-muted"&gt;Apple&lt;/div&gt;
      &lt;div class="d-flex align-items-center fs-11px"&gt;
        &lt;i class="fa fa-star text-warning"&gt;&lt;/i&gt;
        &lt;i class="fa fa-star text-warning"&gt;&lt;/i&gt;
        &lt;i class="fa fa-star text-warning"&gt;&lt;/i&gt;
        &lt;i class="fa fa-star text-warning"&gt;&lt;/i&gt;
        &lt;i class="fa fa-star text-gray-300 me-1"&gt;&lt;/i&gt;
        (128)
      &lt;/div&gt;
    &lt;/div&gt;
    &lt;div&gt;
      &lt;span class="label bg-transparent border border-primary text-primary fs-12px fw-500 rounded-sm"&gt;
        $999.00
      &lt;/span&gt;
    &lt;/div&gt;
  &lt;/a&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #productWidget -->
								
								<!-- BEGIN #reminderWidget -->
								<div id="reminderWidget" class="mb-5">
									<h4>Reminder widget</h4>
									<p>Reminder widget used to create a simple calendar to notify the user upcoming events or task.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-6">
													<div class="card">
														<div class="card-header fw-600">Today, Nov 4</div>
														<div class="widget-reminder">
															<div class="widget-reminder-item">
																<div class="widget-reminder-time">09:00<br>12:00</div>
																<div class="widget-reminder-divider bg-success"></div>
																<div class="widget-reminder-content">
																	<div class="fw-600">Meeting with HR</div>
																	<div class="fs-13px"> - Conference Room</div>
																</div>
															</div>
															<div class="widget-reminder-item">
																<div class="widget-reminder-time">20:00<br>23:00</div>
																<div class="widget-reminder-divider bg-primary"></div>
																<div class="widget-reminder-content">
																	<div class="fw-600">Dinner with Richard</div>
																	<div class="fs-13px"> - Tom's Too Restaurant</div>
																	<div class="d-flex align-items-center fs-13px mt-2">
																		<div class="flex-fill d-flex align-items-center">
																			<img src="/assets/img/user/user-3.jpg" alt="" width="16" class="rounded-circle me-2" /> Richard Leong
																		</div>
																		<a href="#" class="ms-auto">Contact</a>
																	</div>
																</div>
															</div>
														</div>
														<div class="card-header fw-600">Tomorrow, Nov 5</div>
														<div class="widget-reminder">
															<div class="widget-reminder-item">
																<div class="widget-reminder-time">All day</div>
																<div class="widget-reminder-divider bg-gray-300"></div>
																<div class="widget-reminder-content">
																	<div class="fw-600">Terry Birthday</div>
																</div>
															</div>
															<div class="widget-reminder-item">
																<div class="widget-reminder-time">08:00</div>
																<div class="widget-reminder-divider bg-gray-300"></div>
																<div class="widget-reminder-content">
																	<div class="fw-600">Meeting</div>
																</div>
															</div>
															<div class="widget-reminder-item">
																<div class="widget-reminder-time">00:00<br />00:30</div>
																<div class="widget-reminder-divider bg-gray-300"></div>
																<div class="widget-reminder-content">
																	<div class="fw-600">Server Maintenance</div>
																	<div class="fs-13px"> - Data Centre</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="card"&gt;
  &lt;div class="card-header fw-600"&gt;Today, Nov 4&lt;/div&gt;
  &lt;div class="widget-reminder"&gt;
    &lt;div class="widget-reminder-item"&gt;
      &lt;div class="widget-reminder-time"&gt;20:00&lt;br&gt;23:00&lt;/div&gt;
      &lt;div class="widget-reminder-divider bg-primary"&gt;&lt;/div&gt;
      &lt;div class="widget-reminder-content"&gt;
        &lt;div class="fw-600"&gt;Dinner with Richard&lt;/div&gt;
        &lt;div class="fs-13px"&gt;Tom's Too Restaurant&lt;/div&gt;
        &lt;div class="d-flex align-items-center fs-13px mt-2"&gt;
          &lt;div class="flex-fill d-flex align-items-center"&gt;
            &lt;img src="/assets/img/user/user-3.jpg" alt="" width="16" class="rounded-circle me-2" /&gt; Richard Leong
          &lt;/div&gt;
          &lt;a href="#" class="ms-auto"&gt;Contact&lt;/a&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #reminderWidget -->
								
								<!-- BEGIN #imageListWidget -->
								<div id="imageListWidget" class="mb-5">
									<h4>Image list widget</h4>
									<p>Image list widget created by using Bootstrap <code>.card</code> and <code>.list-group</code> component with <code>.d-flex</code> utilities.</p>
									<div class="card">
										<div class="card-body">
											<div class="row">
												<div class="col-xl-6">
													<div class="card">
														<div class="list-group list-group-flush">
															<a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark">
																<div class="flex-fill pe-3">
																	<div class="fw-600">Library (20)</div>
																	<div class="fs-12px">3,192 Image Found</div>
																</div>
																<div>
																	<i class="fa fa-chevron-right fa-lg text-muted"></i>
																</div>
															</a>
														</div>
														<div class="card-body">
															<div class="widget-img-list">
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-2.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-3.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-4.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-21.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-22.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-23.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-24.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-25.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-26.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-27.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-28.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-29.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-30.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-31.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-32.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-33.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-34.jpg)"></span></a></div>
																<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-35.jpg)"></span></a></div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="card"&gt;
  &lt;div class="list-group list-group-flush"&gt;
    &lt;a href="#" class="list-group-item list-group-item-action d-flex align-items-center text-dark"&gt;
      &lt;div class="flex-fill pe-3"&gt;
        &lt;div class="fw-600"&gt;Library (20)&lt;/div&gt;
        &lt;div class="fs-12px"&gt;3,192 Image Found&lt;/div&gt;
      &lt;/div&gt;
      &lt;div&gt;
        &lt;i class="fa fa-chevron-right fa-lg text-muted"&gt;&lt;/i&gt;
      &lt;/div&gt;
    &lt;/a&gt;
  &lt;/div&gt;
  &lt;div class="card-body"&gt;
    &lt;div class="widget-img-list"&gt;
      &lt;div class="widget-img-list-item"&gt;&lt;a href="#"&gt;&lt;span class="img" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"&gt;&lt;/span&gt;&lt;/a&gt;&lt;/div&gt;
      ...
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #imageListWidget -->
							</div>
							<!-- END col-9 -->
							
							<!-- BEGIN col-3 -->
							<div class="col-xl-3">
								<!-- BEGIN #sidebarBootstrap -->
								<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
									<nav class="nav">
										<a class="nav-link" href="#cardWidget" data-toggle="scroll-to">Card widget</a>
										<a class="nav-link" href="#listWidget" data-toggle="scroll-to">List widget</a>
										<a class="nav-link" href="#statsWidget" data-toggle="scroll-to">Stats widget</a>
										<a class="nav-link" href="#chartWidget" data-toggle="scroll-to">Chart widget</a>
										<a class="nav-link" href="#userListWidget" data-toggle="scroll-to">User list widget</a>
										<a class="nav-link" href="#mapWidget" data-toggle="scroll-to">Map widget</a>
										<a class="nav-link" href="#chatWidget" data-toggle="scroll-to">Chat widget</a>
										<a class="nav-link" href="#profileWidget" data-toggle="scroll-to">Profile widget</a>
										<a class="nav-link" href="#productWidget" data-toggle="scroll-to">Product widget</a>
										<a class="nav-link" href="#reminderWidget" data-toggle="scroll-to">Reminder widget</a>
										<a class="nav-link" href="#imageListWidget" data-toggle="scroll-to">Image list widget</a>
									</nav>
								</nav>
								<!-- END #sidebarBootstrap -->
							</div>
							<!-- END col-3 -->
						</div>
						<!-- END row -->
					</div>
					<!-- END col-10 -->
				</div>
				<!-- END row -->
			</div>
			<!-- END container -->
		</div>
		<!-- END #content -->
@endsection
