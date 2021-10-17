@extends('layout.default')

@section('title', 'Buttons')

@push('scripts')
		<script src="/assets/plugins/highlight.js/highlight.min.js"></script>
		<script src="/assets/js/demo/highlightjs.demo.js"></script>
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
								<ul class="breadcrumb">
									<li class="breadcrumb-item"><a href="#">UI KITS</a></li>
									<li class="breadcrumb-item active">BUTTONS</li>
								</ul>
								
								<h1 class="page-header">
									Buttons <small>page header description goes here...</small>
								</h1>
								
								<hr class="mb-4" />
								
								<!-- BEGIN #classes -->
								<div id="classes" class="mb-5">
									<h4>Classes</h4>
									<p>
										Bootstrap includes several predefined button styles, each serving its own semantic purpose, with a few extras thrown in for more control.
										Please read the <a href="https://getbootstrap.com/docs/5.0/components/buttons/" target="_blank">official Bootstrap documentation</a> for the full list of options.
									</p>
									<div class="card">
										<div class="card-body">
											<button type="button" class="btn btn-default mb-1">Default</button>
											<button type="button" class="btn btn-secondary mb-1">Secondary</button>
											<button type="button" class="btn btn-black mb-1">Black</button>
											<button type="button" class="btn btn-info mb-1">Info</button>
											<button type="button" class="btn btn-primary mb-1">Primary</button>
											<button type="button" class="btn btn-purple mb-1">Purple</button>
											<button type="button" class="btn btn-indigo mb-1">Indigo</button>
											<button type="button" class="btn btn-link mb-1">Link</button>
											<br />
											<button type="button" class="btn btn-danger mb-1">Danger</button>
											<button type="button" class="btn btn-pink mb-1">Pink</button>
											<button type="button" class="btn btn-warning mb-1">Warning</button>
											<button type="button" class="btn btn-yellow mb-1">Yellow</button>
											<button type="button" class="btn btn-teal mb-1">Teal</button>
											<button type="button" class="btn btn-success mb-1">Success</button>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;button type="button" class="btn btn-default"&gt;Default&lt;/button&gt;
&lt;button type="button" class="btn btn-secondary"&gt;Secondary&lt;/button&gt;
&lt;button type="button" class="btn btn-black"&gt;Black&lt;/button&gt;
&lt;button type="button" class="btn btn-info"&gt;Info&lt;/button&gt;
&lt;button type="button" class="btn btn-primary"&gt;Primary&lt;/button&gt;
&lt;button type="button" class="btn btn-purple"&gt;Purple&lt;/button&gt;
&lt;button type="button" class="btn btn-indigo"&gt;Indigo&lt;/button&gt;
&lt;button type="button" class="btn btn-link"&gt;Link&lt;/button&gt;
&lt;button type="button" class="btn btn-danger"&gt;Danger&lt;/button&gt;
&lt;button type="button" class="btn btn-pink"&gt;Pink&lt;/button&gt;
&lt;button type="button" class="btn btn-warning"&gt;Warning&lt;/button&gt;
&lt;button type="button" class="btn btn-yellow"&gt;Yellow&lt;/button&gt;
&lt;button type="button" class="btn btn-teal"&gt;Teal&lt;/button&gt;
&lt;button type="button" class="btn btn-success"&gt;Success&lt;/button&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #classes -->
								
								<!-- BEGIN #outlineButtons -->
								<div id="outlineButtons" class="mb-5">
									<h4>Outline buttons</h4>
									<p>
										In need of a button, but not the hefty background colors they bring? Replace the default modifier classes with the <code>.btn-outline-*</code> ones to remove all background images and colors on any button.
									</p>
									<div class="card">
										<div class="card-body">
											<button type="button" class="btn btn-outline-default mb-1">Default</button>
											<button type="button" class="btn btn-outline-secondary mb-1">Secondary</button>
											<button type="button" class="btn btn-outline-black mb-1">Black</button>
											<button type="button" class="btn btn-outline-info mb-1">Info</button>
											<button type="button" class="btn btn-outline-primary mb-1">Primary</button>
											<button type="button" class="btn btn-outline-purple mb-1">Purple</button>
											<button type="button" class="btn btn-outline-indigo mb-1">Indigo</button>
											<button type="button" class="btn btn-outline-link mb-1">Link</button>
											<br />
											<button type="button" class="btn btn-outline-danger mb-1">Danger</button>
											<button type="button" class="btn btn-outline-pink mb-1">Pink</button>
											<button type="button" class="btn btn-outline-warning mb-1">Warning</button>
											<button type="button" class="btn btn-outline-yellow mb-1">Yellow</button>
											<button type="button" class="btn btn-outline-teal mb-1">Teal</button>
											<button type="button" class="btn btn-outline-success mb-1">Success</button>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;button type="button" class="btn btn-outline-default"&gt;Default&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-silver"&gt;Silver&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-black"&gt;Black&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-info"&gt;Info&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-primary"&gt;Primary&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-purple"&gt;Purple&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-indigo"&gt;Indigo&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-link"&gt;Link&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-danger"&gt;Danger&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-pink"&gt;Pink&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-warning"&gt;Warning&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-yellow"&gt;Yellow&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-teal"&gt;Teal&lt;/button&gt;
&lt;button type="button" class="btn btn-outline-success"&gt;Success&lt;/button&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #outlineButtons -->
								
								<!-- BEGIN #sizes -->
								<div id="sizes" class="mb-5">
									<h4>Sizes</h4>
									<p>
										Fancy larger or smaller buttons? Add <code>.btn-lg</code> or <code>.btn-sm</code> for additional sizes.
									</p>
									<div class="card">
										<div class="card-body pb-0">
											<div class="mb-4">
												<div class="mb-2 fs-12px text-muted">
													<b>LARGE BUTTON</b>
												</div>
												<button type="button" class="btn btn-primary btn-lg">Large button</button>
												<button type="button" class="btn btn-secondary btn-lg">Large button</button>
											</div>
											<div class="mb-4">
												<div class="mb-2 fs-12px text-muted">
													<b>SMALL BUTTON</b>
												</div>
												<button type="button" class="btn btn-primary btn-sm">Small button</button>
												<button type="button" class="btn btn-secondary btn-sm">Small button</button>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;!-- large button --&gt;
&lt;button type="button" class="btn btn-primary btn-lg"&gt;Large button&lt;/button&gt;

&lt;!-- small button --&gt;
&lt;button type="button" class="btn btn-primary btn-sm"&gt;Small button&lt;/button&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #sizes -->
								
								<!-- BEGIN #states -->
								<div id="states" class="mb-5">
									<h4>States</h4>
									<p>
										Buttons will appear pressed when active or you can still force the same active appearance by adding <code>.active</code> class.
										Make buttons look inactive by adding the <code>disabled</code> boolean attribute to any <code>&lt;button&gt;</code> element.
									</p>
									<div class="card">
										<div class="card-body pb-0">
											<div class="mb-4">
												<div class="mb-2 fs-12px text-muted">
													<b>ACTIVE STATE</b>
												</div>
												<a href="#" class="btn btn-primary btn-lg active">Primary link</a>
												<a href="#" class="btn btn-secondary btn-lg active">Link</a>
											</div>
											<div class="mb-4">
												<div class="mb-2 fs-12px text-muted">
													<b>DISABLED STATE</b>
												</div>
												<button type="button" class="btn btn-lg btn-primary" disabled>Primary button</button>
												<button type="button" class="btn btn-secondary btn-lg" disabled>Button</button>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;!-- active state --&gt;
&lt;a href="#" class="btn btn-primary btn-lg active"&gt;Primary link&lt;/a&gt;
&lt;a href="#" class="btn btn-secondary btn-lg active"&gt;Link&lt;/a&gt;

&lt;!-- disabled state --&gt;
&lt;button type="button" class="btn btn-lg btn-primary" disabled&gt;Primary button&lt;/button&gt;
&lt;button type="button" class="btn btn-secondary btn-lg" disabled&gt;Button&lt;/button&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #states -->
								
								<!-- BEGIN #buttonGroup -->
								<div id="buttonGroup" class="mb-5">
									<h4>Button group</h4>
									<p>
										Group a series of buttons together on a single line with the button group, and super-power them with JavaScript.
									</p>
									<div class="card">
										<div class="card-body">
											<div class="btn-group">
												<button type="button" class="btn btn-secondary">Left</button>
												<button type="button" class="btn btn-secondary">Middle</button>
												<button type="button" class="btn btn-secondary">Right</button>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="btn-group"&gt;
  &lt;button type="button" class="btn btn-secondary"&gt;Left&lt;/button&gt;
  &lt;button type="button" class="btn btn-secondary"&gt;Middle&lt;/button&gt;
  &lt;button type="button" class="btn btn-secondary"&gt;Right&lt;/button&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #buttonGroup -->
								
								<!-- BEGIN #groupSize -->
								<div id="groupSize" class="mb-5">
									<h4>Group size</h4>
									<p>
										Instead of applying button sizing classes to every button in a group, just add <code>.btn-group-*</code> to each <code>.btn-group</code>, including each one when nesting multiple groups.
									</p>
									<div class="card">
										<div class="card-body">
											<div class="mb-3">
												<div class="btn-group btn-group-lg">
													<button type="button" class="btn btn-secondary">Left</button>
													<button type="button" class="btn btn-secondary">Middle</button>
													<button type="button" class="btn btn-secondary">Right</button>
												</div>
											</div>
											<div class="mb-3">
												<div class="btn-group">
													<button type="button" class="btn btn-secondary">Left</button>
													<button type="button" class="btn btn-secondary">Middle</button>
													<button type="button" class="btn btn-secondary">Right</button>
												</div>
											</div>
											<div class="mb-0">
												<div class="btn-group btn-group-sm">
													<button type="button" class="btn btn-secondary">Left</button>
													<button type="button" class="btn btn-secondary">Middle</button>
													<button type="button" class="btn btn-secondary">Right</button>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="btn-group btn-group-lg"&gt;...&lt;/div&gt;
&lt;div class="btn-group"&gt;...&lt;/div&gt;
&lt;div class="btn-group btn-group-sm"&gt;...&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #groupSize -->
								
								<!-- BEGIN #verticalGroup -->
								<div id="verticalGroup" class="mb-5">
									<h4>Vertical Group</h4>
									<p>
										Make a set of buttons appear vertically stacked rather than horizontally. Split button dropdowns are not supported here.
									</p>
									<div class="card">
										<div class="card-body">
											<div class="btn-group-vertical">
												<button type="button" class="btn btn-secondary">Button</button>
												<button type="button" class="btn btn-secondary">Button</button>
												<button type="button" class="btn btn-secondary">Button</button>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="btn-group-vertical"&gt;...&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #verticalGroup -->
								
								<!-- BEGIN #buttonToolbar -->
								<div id="buttonToolbar" class="mb-5">
									<h4>Button toolbar</h4>
									<p>
										Combine sets of button groups into button toolbars for more complex components. Use utility classes as needed to space out groups, buttons, and more.
									</p>
									<div class="card">
										<div class="card-body">
											<div class="btn-toolbar">
												<div class="btn-group me-2">
													<button type="button" class="btn btn-secondary">1</button>
													<button type="button" class="btn btn-secondary">2</button>
													<button type="button" class="btn btn-secondary">3</button>
													<button type="button" class="btn btn-secondary">4</button>
												</div>
												<div class="btn-group me-2">
													<button type="button" class="btn btn-secondary">5</button>
													<button type="button" class="btn btn-secondary">6</button>
													<button type="button" class="btn btn-secondary">7</button>
												</div>
												<div class="btn-group">
													<button type="button" class="btn btn-secondary">8</button>
												</div>
											</div>
										</div>
										<div class="hljs-container rounded-bottom"><pre><code class="xml">&lt;div class="btn-toolbar"&gt;
  &lt;div class="btn-group me-2"&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;1&lt;/button&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;2&lt;/button&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;3&lt;/button&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;4&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="btn-group me-2"&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;5&lt;/button&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;6&lt;/button&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;7&lt;/button&gt;
  &lt;/div&gt;
  &lt;div class="btn-group"&gt;
    &lt;button type="button" class="btn btn-secondary"&gt;8&lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
										</div>
									</div>
								</div>
								<!-- END #buttonToolbar -->
							</div>
							<!-- END col-9-->
							<!-- BEGIN col-3 -->
							<div class="col-xl-3">
								<!-- BEGIN #sidebar-bootstrap -->
								<nav id="sidebar-bootstrap" class="navbar navbar-sticky d-none d-xl-block">
									<nav class="nav">
										<a class="nav-link" href="#classes" data-toggle="scroll-to">Classes</a>
										<a class="nav-link" href="#outlineButtons" data-toggle="scroll-to">Outline buttons</a>
										<a class="nav-link" href="#sizes" data-toggle="scroll-to">Sizes</a>
										<a class="nav-link" href="#states" data-toggle="scroll-to">States</a>
										<a class="nav-link" href="#buttonGroup" data-toggle="scroll-to">Button group</a>
										<a class="nav-link" href="#groupSize" data-toggle="scroll-to">Group size</a>
										<a class="nav-link" href="#verticalGroup" data-toggle="scroll-to">Vertical group</a>
										<a class="nav-link" href="#buttonToolbar" data-toggle="scroll-to">Button toolbar</a>
									</nav>
								</nav>
								<!-- END #sidebar-bootstrap -->
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
