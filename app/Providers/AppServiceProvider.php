<?php

namespace App\Providers;

use App\Interfaces\AuthInterfaces;
use App\Interfaces\DistributorInterfaces;
use App\Interfaces\OrderInterfaces;
use App\Interfaces\ProductInterfaces;
use App\Interfaces\UserInterfaces;
use App\Repositories\AuthRepositories;
use App\Repositories\DistributorRepositories;
use App\Repositories\OrderRepositories;
use App\Repositories\ProductRepositories;
use App\Repositories\UserRepositories;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(AuthInterfaces::class, AuthRepositories::class);
        $this->app->bind(DistributorInterfaces::class, DistributorRepositories::class);
        $this->app->bind(ProductInterfaces::class, ProductRepositories::class);
        $this->app->bind(UserInterfaces::class, UserRepositories::class);
        $this->app->bind(OrderInterfaces::class, OrderRepositories::class); 
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
