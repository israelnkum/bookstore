<?php

namespace App\Http\Controllers;

use App\Models\ContactDetail;
use App\Models\User;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class SocialAuthController
{
    /**
     * @return RedirectResponse
     */
    public function redirectToGoogle(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }


    public function handleGoogleCallback(): RedirectResponse
    {
        try {
            $socialUser = Socialite::driver('google')->user();

            if (!$socialUser->token) {
                return back('Something went wrong');
            }

            $contactDetail = ContactDetail::where('work_email', $socialUser->getEmail())->first();

            if (!$contactDetail) {
                return redirect()->route('account-not-found');
            }

            if (!$contactDetail->employee->userAccount) {
                $user = User::updateOrCreate([
                    'email' => $socialUser->getEmail()
                ], [
                    'name' => $socialUser->getName(),
                    'username' => $socialUser->getEmail(),
                    'email' => $socialUser->getEmail(),
                    'password' => Hash::make(Str::random()),
                    'provider' => 'google',
                    'provider_id' => $socialUser->getId(),
                    'employee_id' => $contactDetail->employee_id
                ]);

                $user->assignRole('staff');
            } else {

                $contactDetail->employee->userAccount->assignRole('staff');

                $user = $contactDetail->employee->userAccount;
            }

            $contactDetail->employee()->update([
                'user_id' => $user->id
            ]);

            Auth::login($user);

            return redirect()->intended('home');
        } catch (Exception $exception) {
            Log::error($exception);

            return back('Something went wrong');
        }
    }
}
