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
									<span class="user-name" id="userName"></span>
									<span class="user-level" id="user-level">{{ auth()->user()->role }}</span>
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
						@if (auth()->user()->role == 'distributor')
						<li class="nav-item {{ request()->is('cms/admin/dashboard') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/dashboard') }}">
								<i class="fa-solid fa-home"></i>
								<p>Dashboard</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('cms/admin/distributor') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/distributor') }}">
								<i class="fas fa-building"></i>
								<p>Distributor</p>
							</a>
						</li> 
						<li class="nav-item {{ request()->is('cms/admin/product') ? 'active' : '' }}">
							<a href="{{ url('cms/admin/product') }}">
								<i class="fab fa-product-hunt"></i>
								<p>Product</p>
							</a>
						</li>   
						<li class="nav-item {{ request()->is('cms/admin/data-pesanan') ? 'active' : '' }}">
							<a href="{{ url('cms/admin/data-pesanan') }}">
								<i class="fas fa-mortar-pestle"></i>
								<p>Data pesanan</p>
							</a>
						</li>   
						@elseif (auth()->user()->role == 'admin')
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
						<li class="nav-item {{ request()->is('/cms/admin/management-product-admin') ? 'active' : '' }}">
							<a href="{{ url('/cms/admin/management-product-admin') }}">
								<i class="fas fa-database"></i>
								<p>Data seluruh produk</p>
							</a>
						</li>  
						@endif
					<ul>
				</div>
			</div>
		</div>

		<script>
			$(document).ready(function () {
				function getNameUser() {
					$.ajax({
						type: "GET",
						url: `${appUrl}/v1/user/get-personal`,
						dataType: "json",
						success: function (response) {
							if (response.message == 'Success get data personal user') {
								$('#userName').text(!response.data.profile ? 'Admin' : response.data.profile.name)
							}else{
								$('#userName').text('Admin')
							}
						}
					});
				}

				getNameUser()
			});
		</script>
		<!-- End Sidebar -->