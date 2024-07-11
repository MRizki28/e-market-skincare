		<!-- Sidebar -->
		<div class="sidebar sidebar-style-2">			
			<div class="sidebar-wrapper scrollbar scrollbar-inner">
				<div class="sidebar-content">
					<div class="user">
						<div class="avatar-sm float-left mr-2">
							<img src="{{asset('profile.png')}}" alt="" class="avatar-img rounded-circle">
						</div>
						<div class="info">
							<a href="{{ url('changepassword') }}" >
								<span>
									{{ auth()->user()->username }}
									<span class="user-level" id="user-level">{{ auth()->user()->roles }}</span>
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
						@if (Auth::user()->roles == 'admin')
						<li class="nav-item {{ request()->is('/') ? 'active' : '' }}">
							<a href="{{ url('/') }}">
								<i class="fa-solid fa-home"></i>
								<p>Dashboard</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('approve-member*') ? 'active' : '' }}">
							<a href="{{ url('approve-member') }}">
								<i class="fas fa-check"></i>
								<p>Approve Member</p>
								<span class="badge badge-danger" id="approveBadge"></span>
							</a>
						</li>
						
						<li class="nav-item {{ request()->is('child*') ? 'active' : '' }}">
							<a href="{{ url('child') }}">
								<i class="fas fa-child"></i>
								<p>Child/Anak</p>
							</a>
						</li>	
						<li class="nav-item {{ request()->is('report*') ? 'active' : '' }}">
							<a href="{{ url('report') }}">
								<i class="fas fa-child"></i>
								<p>Report Child/Anak</p>
							</a>
						</li>	
						<li class="nav-item {{ request()->is('schedule*') ? 'active' : '' }}">
							<a href="{{ url('schedule') }}">
								<i class="fas fa-calendar-alt"></i>
								<p>Schedule</p>
							</a>
						</li>
						<li class="nav-item {{ request()->is('news*') ? 'active' : '' }}">
							<a href="{{ url('news') }}">
								<i class="fas fa-newspaper"></i>
								<p>News</p>
							</a>
						</li>						  
						<li class="nav-item {{ request()->is('member*') || request()->is('admin-staff*') ? 'active' : '' }}">
							<a data-toggle="collapse" href="#sidebarLayouts" class="collapsed" aria-expanded="false">
								<i class="fas fa-user"></i>
								<p>User management</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="sidebarLayouts" style="">
								<ul class="nav nav-collapse">
									<li class="nav-item {{ request()->is('member*') ? 'active' : '' }}">
										<a href="{{ url('member') }}">
											<span class="sub-item">Member</span>
										</a>
									</li>
									<li class="nav-item {{ request()->is('admin-staff-member*') ? 'active' : '' }}">
										<a href="{{ url('admin-staff-member') }}">
											<span class="sub-item">Account</span>
										</a>
									</li>
								</ul>
							</div>
						</li>       
						@elseif (Auth::user()->roles == 'staff')
						<li class="nav-item {{ request()->is('/') ? 'active' : '' }}">
							<a href="{{ url('/') }}">
								<i class="fa-solid fa-home"></i>
								<p>Dashboard</p>
							</a>
						</li>  
						<li class="nav-item {{ request()->is('approve-member*') ? 'active' : '' }}">
							<a href="{{ url('approve-member') }}">
								<i class="fas fa-check"></i>
								<p>Approve Member</p>
								<span class="badge badge-danger" id="approveBadge"></span>
							</a>
						</li>
						
						<li class="nav-item {{ request()->is('child*') ? 'active' : '' }}">
							<a href="{{ url('child') }}">
								<i class="fas fa-child"></i>
								<p>Child/Anak</p>
							</a>
						</li>	
						<li class="nav-item {{ request()->is('report*') ? 'active' : '' }}">
							<a href="{{ url('report') }}">
								<i class="fas fa-child"></i>
								<p>Report Child/Anak</p>
							</a>
						</li>	
						<li class="nav-item {{ request()->is('schedule*') ? 'active' : '' }}">
							<a href="{{ url('schedule') }}">
								<i class="fas fa-calendar-alt"></i>
								<p>Schedule</p>
							</a>
						</li>
						<li class="nav-item {{ request()->is('news*') ? 'active' : '' }}">
							<a href="{{ url('news') }}">
								<i class="fas fa-newspaper"></i>
								<p>News</p>
							</a>
						</li>						  
						<li class="nav-item {{ request()->is('member*') || request()->is('admin-staff*') ? 'active' : '' }}">
							<a data-toggle="collapse" href="#sidebarLayouts" class="collapsed" aria-expanded="false">
								<i class="fas fa-user"></i>
								<p>User management</p>
								<span class="caret"></span>
							</a>
							<div class="collapse" id="sidebarLayouts" style="">
								<ul class="nav nav-collapse">
									<li class="nav-item {{ request()->is('member*') ? 'active' : '' }}">
										<a href="{{ url('member') }}">
											<span class="sub-item">Member</span>
										</a>
									</li>
									{{-- <li class="nav-item {{ request()->is('admin-staff*') ? 'active' : '' }}">
										<a href="{{ url('admin-staff') }}">
											<span class="sub-item">Admin & Staff</span>
										</a>
									</li> --}}
								</ul>
							</div>
						</li>       
						@endif
						
					<ul>
				</div>
			</div>
		</div>
		<!-- End Sidebar -->