@extends('layout.default')

@section('title', 'Profile')

@section('content')
    <!-- BEGIN #content -->
		<div id="content" class="app-content p-0">
			<!-- BEGIN profile -->
			<div class="profile">
				<!-- BEGIN profile-header -->
				<div class="profile-header">
					<div class="profile-header-cover"></div>
					
					<div class="profile-header-content">
						<div class="profile-header-img">
							<img src="/assets/img/user/profile.jpg" alt="" />
						</div>
						<ul class="profile-header-tab nav nav-tabs nav-tabs-v2">
							<li class="nav-item">
								<a href="#profile-post" class="nav-link active" data-bs-toggle="tab">
									<div class="nav-field">Posts</div>
									<div class="nav-value">382</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-followers" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Followers</div>
									<div class="nav-value">1.3m</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-media" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Photos</div>
									<div class="nav-value">1,397</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-media" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Videos</div>
									<div class="nav-value">120</div>
								</a>
							</li>
							<li class="nav-item">
								<a href="#profile-followers" class="nav-link" data-bs-toggle="tab">
									<div class="nav-field">Following</div>
									<div class="nav-value">2,592</div>
								</a>
							</li>
						</ul>
					</div>
				</div>
				<!-- END profile-header -->
				
				<!-- BEGIN profile-container -->
				<div class="profile-container">
					<!-- BEGIN profile-sidebar -->
					<div class="profile-sidebar">
						<div class="desktop-sticky-top">
							<!-- profile info -->
							<h4>John Smith</h4>
							<div class="fw-600 mb-3 text-muted mt-n2">@johnsmith</div>
							<p>
								Principal UXUI Design & Brand Architecture for Studio. Creator of SeanTheme.
								Bringing the world closer together. Studied Computer Science and Psychology at Harvard University.
							</p>
							<div class="mb-1">
								<i class="fa fa-map-marker-alt fa-fw text-muted"></i> New York, NY
							</div>
							<div class="mb-3">
								<i class="fa fa-link fa-fw text-muted"></i> seantheme.com/studio
							</div>
							
							<hr class="mt-4 mb-4" />
							
							<!-- people-to-follow -->
							<div class="fw-600 mb-3 fs-16px">People to follow</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-1.jpg" alt="" width="30" class="rounded-circle" />
								<div class="flex-fill px-3">
									<div class="fw-600 text-truncate w-100px">Noor Rowe</div>
									<div class="fs-12px text-gray-700">3.1m followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-primary fs-11px fw-600">Follow</a>
							</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-2.jpg" alt="" width="30" class="rounded-circle" />
								<div class="flex-fill px-3">
									<div class="fw-600 text-truncate w-100px">Abbey Parker</div>
									<div class="fs-12px text-gray-700">302k followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-primary fs-11px fw-600">Follow</a>
							</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-3.jpg" alt="" width="30" class="rounded-circle" />
								<div class="flex-fill px-3">
									<div class="fw-600 text-truncate w-100px">Savannah Nicholson</div>
									<div class="fs-12px text-gray-700">720k followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-primary fs-11px fw-600">Follow</a>
							</div>
							<div class="d-flex align-items-center mb-3">
								<img src="/assets/img/user/user-4.jpg" alt="" width="30" class="rounded-circle" />
								<div class="flex-fill px-3">
									<div class="fw-600 text-truncate w-100px">Kenny Bright</div>
									<div class="fs-12px text-gray-700">1.4m followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-primary fs-11px fw-600">Follow</a>
							</div>
							<div class="d-flex align-items-center">
								<img src="/assets/img/user/user-5.jpg" alt="" width="30" class="rounded-circle" />
								<div class="flex-fill px-3">
									<div class="fw-600 text-truncate w-100px">Cara Poole</div>
									<div class="fs-12px text-gray-700">989k followers</div>
								</div>
								<a href="#" class="btn btn-sm btn-outline-primary fs-11px fw-600">Follow</a>
							</div>
						</div>
					</div>
					<!-- END profile-sidebar -->
					
					<!-- BEGIN profile-content -->
					<div class="profile-content">
						<div class="row">
							<div class="col-xl-8">
								<div class="tab-content p-0">
									<!-- BEGIN tab-pane -->
									<div class="tab-pane fade show active" id="profile-post">
										<div class="card mb-3">
											<div class="card-body">
												<!-- post header -->
												<div class="d-flex align-items-center mb-3">
													<a href="#"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle" /></a>
													<div class="flex-fill ps-2">
														<div class="fw-600"><a href="#" class="text-decoration-none">Clyde Stanley</a> at <a href="#" class="text-decoration-none">South Lake Tahoe, California</a></div>
														<div class="text-gray-600 fs-13px">March 16</div>
													</div>
												</div>
								
												<!-- post content -->
												<p>Best vacation of 2017</p>
												<div class="profile-img-list">
													<div class="profile-img-list-item main"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-2.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-3.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-4.jpg)"></span></a></div>
													<div class="profile-img-list-item with-number">
														<a href="#" class="profile-img-list-link">
															<span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span>
															<div class="profile-img-number">+12</div>
														</a>
													</div>
												</div>
												<hr class="mb-1 ms-n2 me-n2" />
										
												<!-- post action -->
												<div class="row text-center mb-n3 fw-600">
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
														</a>
													</div>
												</div>
											</div>
											<div class="card-footer pt-3 pb-3">
												<div class="d-flex align-items-center">
													<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle" />
													<div class="flex-fill ps-2">
														<div class="position-relative d-flex align-items-center">
															<input type="text" class="form-control rounded-pill" style="padding-right: 120px;" placeholder="Write a comment..." />
															<div class="position-absolute end-0 text-center">
																<a href="#" class="text-muted me-2"><i class="fa fa-smile"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-camera"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-video"></i></a>
																<a href="#" class="text-muted me-3"><i class="fa fa-paw"></i></a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="card mb-3">
											<div class="card-body pb-0">
												<!-- post header -->
												<div class="d-flex align-items-center mb-3">
													<a href="#"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle" /></a>
													<div class="flex-fill ps-2">
														<div class="fw-600"><a href="#" class="text-decoration-none">Clyde Stanley</a> is watching <a href="#" class="text-decoration-none">PATAGONIA 8k</a></div>
														<div class="text-gray-600 fs-13px">March 12</div>
													</div>
												</div>
							
												<!-- post content -->
												<p>Nice PATAGONIA footage in 8K</p>
											</div>
											<div class="card-body pt-0 ps-0 pe-0">
												<div class="ratio ratio-16x9">
													<iframe src="https://www.youtube.com/embed/ChOhcHD8fBA?showinfo=0"></iframe>
												</div>
												<hr class="mb-1 ms-n2 me-n2" />
										
												<!-- post action -->
												<div class="row text-center mb-n3 fw-600">
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
														</a>
													</div>
												</div>
											</div>
											<div class="card-footer pt-3 pb-3">
												<div class="d-flex align-items-center">
													<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle" />
													<div class="flex-fill ps-2">
														<div class="position-relative d-flex align-items-center">
															<input type="text" class="form-control rounded-pill" style="padding-right: 120px;" placeholder="Write a comment..." />
															<div class="position-absolute end-0 text-center">
																<a href="#" class="text-muted me-2"><i class="fa fa-smile"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-camera"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-video"></i></a>
																<a href="#" class="text-muted me-3"><i class="fa fa-paw"></i></a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="card mb-3">
											<div class="card-body">
												<!-- post header -->
												<div class="d-flex align-items-center mb-3">
													<a href="#" class="text-decoration-none"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle" /></a>
													<div class="flex-fill ps-2">
														<div class="fw-600"><a href="#" class="text-decoration-none">Clyde Stanley</a></div>
														<div class="text-gray-600 fs-13px">March 4</div>
													</div>
												</div>
							
												<!-- post content -->
												<p>
													Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />Quisque sodales urna justo, ac ultrices magna consectetur id.<br /><br />
													Donec tempor ligula sit amet nunc porta, sed aliquam leo sagittis.<br />
													Ut auctor congue efficitur. Praesent aliquam pulvinar neque, placerat semper massa elementum et.
												</p>
												<hr class="mb-1 ms-n2 me-n2" />
										
												<!-- post action -->
												<div class="row text-center mb-n3 fw-600">
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
														</a>
													</div>
												</div>
											</div>
											<div class="card-footer pt-3 pb-3">
												<div class="d-flex align-items-center">
													<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle" />
													<div class="flex-fill ps-2">
														<div class="position-relative d-flex align-items-center">
															<input type="text" class="form-control rounded-pill" style="padding-right: 120px;" placeholder="Write a comment..." />
															<div class="position-absolute end-0 text-center">
																<a href="#" class="text-muted me-2"><i class="fa fa-smile"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-camera"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-video"></i></a>
																<a href="#" class="text-muted me-3"><i class="fa fa-paw"></i></a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="card mb-3">
											<div class="card-body">
												<!-- post header -->
												<div class="d-flex align-items-center mb-3">
													<a href="#"><img src="/assets/img/user/profile.jpg" alt="" width="50" class="rounded-circle" /></a>
													<div class="flex-fill ps-2">
														<div class="fw-600"><a href="#" class="text-decoration-none">Clyde Stanley</a> at <a href="#" class="text-decoration-none">United States</a></div>
														<div class="text-gray-600 fs-13px">May 5</div>
													</div>
												</div>
								
												<!-- post content -->
												<p>Business Trip</p>
												<div class="profile-img-list">
													<div class="profile-img-list-item main"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span></a></div>
													<div class="profile-img-list-item main"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-6.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-7.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-8.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-9.jpg)"></span></a></div>
													<div class="profile-img-list-item"><a href="#" class="profile-img-list-link"><span class="profile-img-content" style="background-image: url(/assets/img/gallery/gallery-10.jpg)"></span></a></div>
												</div>
												<hr class="mb-1 ms-n2 me-n2" />
										
												<!-- post action -->
												<div class="row text-center mb-n3 fw-600">
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-thumbs-up me-1 d-block d-sm-inline"></i> Likes
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="far fa-comment me-1 d-block d-sm-inline"></i> Comment
														</a>
													</div>
													<div class="col">
														<a href="#" class="text-gray-700 text-decoration-none d-block p-2">
															<i class="fa fa-share me-1 d-block d-sm-inline"></i> Share
														</a>
													</div>
												</div>
											</div>
											<div class="card-footer pt-3 pb-3">
												<div class="d-flex align-items-center">
													<img src="/assets/img/user/user.jpg" alt="" width="35" class="rounded-circle" />
													<div class="flex-fill ps-2">
														<div class="position-relative d-flex align-items-center">
															<input type="text" class="form-control rounded-pill" style="padding-right: 120px;" placeholder="Write a comment..." />
															<div class="position-absolute end-0 text-center">
																<a href="#" class="text-muted me-2"><i class="fa fa-smile"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-camera"></i></a>
																<a href="#" class="text-muted me-2"><i class="fa fa-video"></i></a>
																<a href="#" class="text-muted me-3"><i class="fa fa-paw"></i></a>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<!-- END tab-pane -->
									
									<!-- BEGIN tab-pane -->
									<div class="tab-pane fade" id="profile-followers">
										<div class="list-group">
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-1.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Ethel Wilkes</a></div>
													<div class="text-muted fs-13px">North Raundspic</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-2.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Shanaya Hansen</a></div>
													<div class="text-muted fs-13px">North Raundspic</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-3.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">James Allman</a></div>
													<div class="text-muted fs-13px">North Raundspic</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-4.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Marie Welsh</a></div>
													<div class="text-muted fs-13px">Crencheporford</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-5.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Lamar Kirkland</a></div>
													<div class="text-muted fs-13px">Prince Ewoodswan</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-6.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Bentley Osborne</a></div>
													<div class="text-muted fs-13px">Red Suvern</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-7.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Ollie Goulding</a></div>
													<div class="text-muted fs-13px">Doa</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-8.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Hiba Calvert</a></div>
													<div class="text-muted fs-13px">Stemunds</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-9.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Rivka Redfern</a></div>
													<div class="text-muted fs-13px">Fallnee</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
											<div class="list-group-item d-flex align-items-center">
												<img src="/assets/img/user/user-10.jpg" alt="" width="50" class="rounded-sm ms-n2" />
												<div class="flex-fill px-3">
													<div><a href="#" class="text-dark fw-600 text-decoration-none">Roshni Fernandez</a></div>
													<div class="text-muted fs-13px">Mount Lerdo</div>
												</div>
												<a href="#" class="btn btn-outline-primary">Follow</a>
											</div>
										</div>
										<div class="text-center p-3"><a href="#" class="text-dark text-decoration-none">Show more <b class="caret"></b></a></div>
									</div>
									<!-- END tab-pane -->
									
									<!-- BEGIN tab-pane -->
									<div class="tab-pane fade" id="profile-media">
										<div class="card mb-3">
											<div class="card-header fw-600 bg-transparent">May 20</div>
											<div class="card-body">
												<div class="widget-img-list">
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-1.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-2.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-3.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-4.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-5.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-6.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-7.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-8.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-9.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-10.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-11.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-12.jpg)"></span></a></div>
												</div>
											</div>
										</div>
										<div class="card">
											<div class="card-header fw-600 bg-transparent">May 16</div>
											<div class="card-body">
												<div class="widget-img-list">
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-13.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-14.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-15.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-16.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-17.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-18.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-19.jpg)"></span></a></div>
													<div class="widget-img-list-item"><a href="#"><span class="img" style="background-image: url(/assets/img/gallery/gallery-20.jpg)"></span></a></div>
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
												</div>
											</div>
										</div>
										<div class="text-center p-3"><a href="#" class="text-dark text-decoration-none">Show more <b class="caret"></b></a></div>
									</div>
									<!-- END tab-pane -->
								</div>
							</div>
							<div class="col-xl-4">
								<div class="desktop-sticky-top d-none d-lg-block">
									<div class="card mb-3">
										<div class="list-group list-group-flush">
											<div class="list-group-item fw-600 px-3 d-flex">
												<span class="flex-fill">Trends for you</span> 
												<a href="#" class="text-muted"><i class="fa fa-cog"></i></a>
											</div>
											<div class="list-group-item px-3">
												<div class="text-muted"><small><strong>Trending Worldwide</strong></small></div>
												<div class="fw-600 mb-2">#BreakingNews</div>
												<a href="#" class="card overflow-hidden mb-1 text-dark text-decoration-none">
													<div class="row no-gutters">
														<div class="col-md-8">
															<div class="card-body p-1 px-2">
																<div class="fs-12px text-muted">Space</div>
																<div class="h-40px fs-13px overflow-hidden">Distant star explosion is brightest ever seen, study finds</div>
															</div>
														</div>
														<div class="col-md-4 d-flex">
															<div class="h-100 w-100" style="background: url(/assets/img/gallery/news-1.jpg) center; background-size: cover;"></div>
														</div>
													</div>
												</a>
												<div><small class="text-muted">1.89m share</small></div>
											</div>
											<div class="list-group-item px-3">
												<div class="fw-600 mb-2">#TrollingForGood</div>
												<div class="fs-13px">Be a good Troll and spread some positivity on Studio today.</div>
												<div><small class="text-muted"><i class="fa fa-external-link-square-alt"></i> Promoted by Studio Trolls</small></div>
											</div>
											<div class="list-group-item px-3">
												<div class="text-muted"><small><strong>Trending Worldwide</strong></small></div>
												<div class="fw-600 mb-2">#CronaOutbreak</div>
												<div class="fs-13px">The coronavirus is affecting 210 countries around the world and 2 ...</div>
												<div><small class="text-muted">49.3m share</small></div>
											</div>
											<div class="list-group-item px-3">
												<div class="text-muted"><small><strong>Trending in New York</strong></small></div>
												<div class="fw-600 mb-2">#CoronavirusPandemic</div>
												<a href="#" class="card overflow-hidden mb-1 text-dark text-decoration-none">
													<div class="row no-gutters">
														<div class="col-md-8">
															<div class="card-body p-1 px-2">
																<div class="fs-12px text-muted">Coronavirus</div>
																<div class="h-40px fs-13px overflow-hidden">Coronavirus: US suspends travel from Europe</div>
															</div>
														</div>
														<div class="col-md-4 d-flex">
															<div class="h-100 w-100" style="background: url(/assets/img/gallery/news-2.jpg) center; background-size: cover;"></div>
														</div>
													</div>
												</a>
												<div><small class="text-muted">821k share</small></div>
											</div>
											<a href="#" class="list-group-item list-group-action text-center">
												Show more
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END profile-content -->
				</div>
				<!-- END profile-container -->
			</div>
			<!-- END profile -->
		</div>
		<!-- END #content -->
@endsection
