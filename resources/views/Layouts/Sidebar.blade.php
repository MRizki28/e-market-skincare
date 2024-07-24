		<!-- Sidebar -->
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="{{asset('static/img/profile.jpg')}}" alt="" class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a href="#" >
								<span>
									{{-- {{ auth()->user()->username }} --}}Rizki
									<span class="user-level" id="user-level">Admin</span>
								</span>
							</a>
							<div class="clearfix"></div>
							<div class="collapse in" id="collapseExample">
								<ul class="nav">
									<li>
										<a href="#">
											<span class="link-collapse">Settings</span>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<ul class="nav nav-primary">
						<li class="nav-item {{ request()->is('/cms/admin') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin') }}">
								<i class="fa-solid fa-home"></i>
								<p>Dashboard</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('/cms/admin/usermanagement') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/usermanagement') }}">
								<i class="fa-solid fa-user"></i>
								<p>User management</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('/cms/admin/distributor') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/distributor') }}">
								<i class="fa-solid fa-user"></i>
								<p>Distributor</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('cms/admin/product') ? 'active' : '' }}">
							<a href="{{ url('cms/admin/product') }}">
								<i class="fa-solid fa-user"></i>
								<p>Product</p>
							</a>
						</li>   
					<ul>
				</div>
			</div>
		</div>
		<!-- End Sidebar -->