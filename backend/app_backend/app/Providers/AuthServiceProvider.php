<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Carbon\Carbon;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes(function ($router) {
            $router->forAccessTokens();
            // Uncomment for allowing personal access tokens
            $router->forPersonalAccessTokens();
            $router->forTransientTokens();
        });
        
        Passport::tokensExpireIn(Carbon::now()->addMinutes(30));
        
        Passport::refreshTokensExpireIn(Carbon::now()->addDays(10));
        //
    }
}
