@extends('layout.default', ['appClass' => 'app-content-full-height', 'htmlAttribute' => ' itemscope itemtype="http://schema.org/WebPage"'])

@section('title', 'Gallery')

@push('css')
    <link href="/assets/plugins/photoswipe/dist/photoswipe.css" rel="stylesheet" />
    <link href="/assets/plugins/photoswipe/dist/default-skin/default-skin.css" rel="stylesheet" />
@endpush

@push('scripts')
		<script src="/assets/plugins/photoswipe/dist/photoswipe-ui-default.min.js"></script>
		<script src="/assets/plugins/photoswipe/dist/photoswipe.min.js"></script>
		<script src="/assets/js/demo/page-gallery.demo.js"></script>
@endpush

@section('content')
    <!-- BEGIN #content -->
		<div id="content" class="app-content p-0">
			<!-- BEGIN d-flex -->
			<div class="d-block d-md-flex align-items-stretch h-100">
				<!-- BEGIN gallery-menu-container -->
				<div class="gallery-menu-container">
					<!-- BEGIN scrollbar -->
					<div data-scrollbar="true" data-height="100%" data-skip-mobile="true">
						<!-- BEGIN gallery-menu -->
						<div class="gallery-menu">
							<div class="gallery-menu-header">Main</div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link active"><i class="fa fa-fw fa-image me-1"></i> Photos</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-heart me-1"></i> Memories</a></div>
							<div class="gallery-menu-header">Shared</div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-cloud me-1"></i> Activity</a></div>
							<div class="gallery-menu-header">Albums</div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-camera me-1"></i> All Photos</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-user me-1"></i> People</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-map-pin me-1"></i> Places</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-camera-retro me-1"></i> Selfies</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-video me-1"></i> Panaromas</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-star me-1"></i> Depth Effect</a></div>
							<div class="gallery-menu-item"><a href="#" class="gallery-menu-link"><i class="fa fa-fw fa-mobile me-1"></i> Screenshots</a></div>
						</div>
						<!-- END gallery-menu -->
					</div>
					<!-- end scrollbar -->
				</div>
				<!-- END gallery-menu-container -->
				<!-- BEGIN gallery-content-container -->
				<div class="gallery-content-container">
					<!-- BEGIN scrollbar -->
					<div data-scrollbar="true" data-height="100%">
						<!-- BEGIN gallery-content -->
						<div class="gallery-content">
							<!-- BEGIN gallery -->
							<div class="gallery">
								<!-- BEGIN gallery-header -->
								<div class="d-flex align-items-center mb-3">
									<!-- BEGIN gallery-title -->
									<div class="gallery-title mb-0">
										<a href="#">
										Wedding <i class="fa fa-chevron-right"></i> 
										<small>May 11, 2021</small>
										</a>
									</div>
									<!-- END gallery-title -->
									
									<!-- BEGIN btn-group -->
									<div class="ms-auto btn-group">
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-play"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-plus"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-upload"></i></a>
									</div>
									<!-- END btn-group -->
								</div>
								<!-- END gallery-header -->
								
								<!-- BEGIN gallery-image -->
								<div class="gallery-image">
									<ul class="gallery-image-list">
										<li><a href="/assets/img/gallery/gallery-42.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-42.jpg" itemprop="thumbnail" alt="Wedding Image 1" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-43.jpg" itemprop="contentUrl" data-size="752x442"><img src="/assets/img/gallery/gallery-43.jpg" itemprop="thumbnail" alt="Wedding Image 2" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-44.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-44.jpg" itemprop="thumbnail" alt="Wedding Image 3" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-45.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-45.jpg" itemprop="thumbnail" alt="Wedding Image 4" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-46.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-46.jpg" itemprop="thumbnail" alt="Wedding Image 5" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-47.jpg" itemprop="contentUrl" data-size="752x532"><img src="/assets/img/gallery/gallery-47.jpg" itemprop="thumbnail" alt="Wedding Image 6" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-48.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-48.jpg" itemprop="thumbnail" alt="Wedding Image 7" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-49.jpg" itemprop="contentUrl" data-size="752x1130"><img src="/assets/img/gallery/gallery-49.jpg" itemprop="thumbnail" alt="Wedding Image 8" /></a></li>
										<li><a href="/assets/img/gallery/gallery-50.jpg" itemprop="contentUrl" data-size="752x1128"><img src="/assets/img/gallery/gallery-50.jpg" itemprop="thumbnail" alt="Wedding Image 9" /></a></li>
										<li><a href="/assets/img/gallery/gallery-51.jpg" itemprop="contentUrl" data-size="752x866"><img src="/assets/img/gallery/gallery-51.jpg" itemprop="thumbnail" alt="Wedding Image 10" /></a></li>
										<li><a href="/assets/img/gallery/gallery-52.jpg" itemprop="contentUrl" data-size="752x752"><img src="/assets/img/gallery/gallery-52.jpg" itemprop="thumbnail" alt="Wedding Image 11" /></a></li>
										<li><a href="/assets/img/gallery/gallery-53.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-53.jpg" itemprop="thumbnail" alt="Wedding Image 12" class="img-portrait" /></a></li>
									</ul>
								</div>
								<!-- END gallery-image -->
							</div>
							<!-- END gallery -->
							<!-- BEGIN gallery -->
							<div class="gallery">
								<!-- BEGIN gallery-header -->
								<div class="d-flex align-items-center mb-3">
									<!-- BEGIN gallery-title -->
									<div class="gallery-title mb-0">
										<a href="#">
										Collections #339 <i class="fa fa-chevron-right"></i> 
										<small>May 8, 2021</small>
										</a>
									</div>
									<!-- END gallery-title -->
									
									<!-- BEGIN btn-group -->
									<div class="ms-auto btn-group">
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-play"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-plus"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-upload"></i></a>
									</div>
									<!-- END btn-group -->
								</div>
								<!-- END gallery-header -->
								
								<!-- BEGIN gallery-image -->
								<div class="gallery-image">
									<ul class="gallery-image-list">
										<li><a href="/assets/img/gallery/gallery-21.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-21.jpg" itemprop="thumbnail" alt="Collection #145 Image 1" /></a></li>
										<li><a href="/assets/img/gallery/gallery-22.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-22.jpg" itemprop="thumbnail" alt="Collection #145 Image 2" /></a></li>
										<li><a href="/assets/img/gallery/gallery-23.jpg" itemprop="contentUrl" data-size="752x486"><img src="/assets/img/gallery/gallery-23.jpg" itemprop="thumbnail" alt="Collection #145 Image 3" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-24.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-24.jpg" itemprop="thumbnail" alt="Collection #145 Image 4" /></a></li>
										<li><a href="/assets/img/gallery/gallery-25.jpg" itemprop="contentUrl" data-size="752x1128"><img src="/assets/img/gallery/gallery-25.jpg" itemprop="thumbnail" alt="Collection #145 Image 5" /></a></li>
										<li><a href="/assets/img/gallery/gallery-26.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-26.jpg" itemprop="thumbnail" alt="Collection #145 Image 6" /></a></li>
										<li><a href="/assets/img/gallery/gallery-27.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-27.jpg" itemprop="thumbnail" alt="Collection #145 Image 7" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-28.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-28.jpg" itemprop="thumbnail" alt="Collection #145 Image 8" /></a></li>
										<li><a href="/assets/img/gallery/gallery-29.jpg" itemprop="contentUrl" data-size="752x1128"><img src="/assets/img/gallery/gallery-29.jpg" itemprop="thumbnail" alt="Collection #145 Image 9" /></a></li>
										<li><a href="/assets/img/gallery/gallery-30.jpg" itemprop="contentUrl" data-size="752x940"><img src="/assets/img/gallery/gallery-30.jpg" itemprop="thumbnail" alt="Collection #145 Image 10" /></a></li>
									</ul>
								</div>
								<!-- END gallery-image -->
							</div>
							<!-- END gallery -->
							<!-- BEGIN gallery -->
							<div class="gallery">
								<!-- BEGIN gallery-header -->
								<div class="d-flex align-items-center mb-3">
									<!-- BEGIN gallery-title -->
									<div class="gallery-title mb-0">
										<a href="#">
										Collections #144 <i class="fa fa-chevron-right"></i> 
										<small>May 4, 2021</small>
										</a>
									</div>
									<!-- END gallery-title -->
									
									<!-- BEGIN btn-group -->
									<div class="ms-auto btn-group">
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-play"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-plus"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-upload"></i></a>
									</div>
									<!-- END btn-group -->
								</div>
								<!-- END gallery-header -->
								
								<!-- BEGIN gallery-image -->
								<div class="gallery-image">
									<ul class="gallery-image-list">
										<li><a href="/assets/img/gallery/gallery-31.jpg" itemprop="contentUrl" data-size="752x752"><img src="/assets/img/gallery/gallery-31.jpg" itemprop="thumbnail" alt="Collection #144 Image 1" /></a></li>
										<li><a href="/assets/img/gallery/gallery-32.jpg" itemprop="contentUrl" data-size="752x1128"><img src="/assets/img/gallery/gallery-32.jpg" itemprop="thumbnail" class="img-portrait" alt="Collection #144 Image 2" /></a></li>
										<li><a href="/assets/img/gallery/gallery-33.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-33.jpg" itemprop="thumbnail" alt="Collection #144 Image 3" /></a></li>
										<li><a href="/assets/img/gallery/gallery-34.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-34.jpg" itemprop="thumbnail" alt="Collection #144 Image 4" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-35.jpg" itemprop="contentUrl" data-size="752x1136"><img src="/assets/img/gallery/gallery-35.jpg" itemprop="thumbnail" alt="Collection #144 Image 5" /></a></li>
										<li><a href="/assets/img/gallery/gallery-36.jpg" itemprop="contentUrl" data-size="752x1128"><img src="/assets/img/gallery/gallery-36.jpg" itemprop="thumbnail" alt="Collection #144 Image 6" /></a></li>
										<li><a href="/assets/img/gallery/gallery-37.jpg" itemprop="contentUrl" data-size="752x480"><img src="/assets/img/gallery/gallery-37.jpg" itemprop="thumbnail" alt="Collection #144 Image 7" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-38.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-38.jpg" itemprop="thumbnail" alt="Collection #144 Image 8" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-39.jpg" itemprop="contentUrl" data-size="752x422"><img src="/assets/img/gallery/gallery-39.jpg" itemprop="thumbnail" alt="Collection #144 Image 9" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-40.jpg" itemprop="contentUrl" data-size="752x464"><img src="/assets/img/gallery/gallery-40.jpg" itemprop="thumbnail" alt="Collection #144 Image 10" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-41.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-41.jpg" itemprop="thumbnail" alt="Collection #144 Image 11" class="img-portrait" /></a></li>
									</ul>
								</div>
								<!-- END gallery-image -->
							</div>
							<!-- END gallery -->
							<!-- BEGIN gallery -->
							<div class="gallery">
								<!-- BEGIN gallery-header -->
								<div class="d-flex align-items-center mb-3">
									<!-- BEGIN gallery-title -->
									<div class="gallery-title mb-0">
										<a href="#">
										Collection #143 <i class="fa fa-chevron-right"></i> 
										<small>May 3, 2021</small>
										</a>
									</div>
									<!-- END gallery-title -->
									
									<!-- BEGIN btn-group -->
									<div class="ms-auto btn-group">
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-play"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-plus"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-upload"></i></a>
									</div>
									<!-- END btn-group -->
								</div>
								<!-- END gallery-header -->
								
								<!-- BEGIN gallery-image -->
								<div class="gallery-image">
									<ul class="gallery-image-list">
										<li><a href="/assets/img/gallery/gallery-1.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-1.jpg" itemprop="thumbnail" alt="Collection #143 Image 1" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-2.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-2.jpg" itemprop="thumbnail" alt="Collection #143 Image 2" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-3.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-3.jpg" itemprop="thumbnail" alt="Collection #143 Image 3" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-4.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-4.jpg" itemprop="thumbnail" alt="Collection #143 Image 4" /></a></li>
									</ul>
								</div>
								<!-- END gallery-image -->
							</div>
							<!-- END gallery -->
							<!-- BEGIN gallery -->
							<div class="gallery">
								<!-- BEGIN gallery-header -->
								<div class="d-flex align-items-center mb-3">
									<!-- BEGIN gallery-title -->
									<div class="gallery-title mb-0">
										<a href="#">
											Random <i class="fa fa-chevron-right"></i> 
											<small>May 1, 2021</small>
										</a>
									</div>
									<!-- END gallery-title -->
									
									<!-- BEGIN btn-group -->
									<div class="ms-auto btn-group">
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-play"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-plus"></i></a>
										<a href="#" class="btn btn-default btn-sm"><i class="fa fa-upload"></i></a>
									</div>
									<!-- END btn-group -->
								</div>
								<!-- END gallery-header -->
								
								<!-- BEGIN gallery-image -->
								<div class="gallery-image">
									<ul class="gallery-image-list">
										<li><a href="/assets/img/gallery/gallery-5.jpg" itemprop="contentUrl" data-size="752x500"><img src="/assets/img/gallery/gallery-5.jpg" itemprop="thumbnail" alt="Random Image 1" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-6.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-6.jpg" itemprop="thumbnail" alt="Random Image 2" /></a></li>
										<li><a href="/assets/img/gallery/gallery-7.jpg" itemprop="contentUrl" data-size="752x476"><img src="/assets/img/gallery/gallery-7.jpg" itemprop="thumbnail" alt="Random Image 3" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-8.jpg" itemprop="contentUrl" data-size="752x472"><img src="/assets/img/gallery/gallery-8.jpg" itemprop="thumbnail" alt="Random Image 4" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-9.jpg" itemprop="contentUrl" data-size="752x504"><img src="/assets/img/gallery/gallery-9.jpg" itemprop="thumbnail" alt="Random Image 5" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-10.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-10.jpg" itemprop="thumbnail" alt="Random Image 6" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-11.jpg" itemprop="contentUrl" data-size="752x564"><img src="/assets/img/gallery/gallery-11.jpg" itemprop="thumbnail" alt="Random Image 7" /></a></li>
										<li><a href="/assets/img/gallery/gallery-12.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-12.jpg" itemprop="thumbnail" alt="Random Image 8" class="img-portrait" /></a></li>
										<li><a href="/assets/img/gallery/gallery-13.jpg" itemprop="contentUrl" data-size="752x502"><img src="/assets/img/gallery/gallery-13.jpg" itemprop="thumbnail" alt="Random Image 9" class="img-portrait" /></a></li>
									</ul>
								</div>
								<!-- END gallery-image -->
							</div>
							<!-- END gallery -->
						</div>
						<!-- END gallery-content -->
					</div>
					<!-- END scrollbar -->
				</div>
				<!-- END gallery-content-container -->
			</div>
			<!-- END d-flex -->
		</div>
		<!-- END #content -->

		<!-- BEGIN photoswipe -->
		<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
			<div class="pswp__bg"></div>
			<div class="pswp__scroll-wrap">
				<div class="pswp__container">
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
					<div class="pswp__item"></div>
				</div>
				<div class="pswp__ui pswp__ui--hidden">
					<div class="pswp__top-bar">
						<div class="pswp__counter"></div>
						<button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
						<button class="pswp__button pswp__button--share" title="Share"></button>
						<button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
						<button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
						<div class="pswp__preloader">
							<div class="pswp__preloader__icn">
								<div class="pswp__preloader__cut">
								<div class="pswp__preloader__donut"></div>
								</div>
							</div>
						</div>
					</div>
					<div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
						<div class="pswp__share-tooltip"></div>
					</div>
					<button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
					<button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
					<div class="pswp__caption">
						<div class="pswp__caption__center"></div>
					</div>
				</div>
			</div>
		</div>
		<!-- END photoswipe -->
@endsection
