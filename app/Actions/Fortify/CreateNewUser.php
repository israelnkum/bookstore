<?php

namespace App\Actions\Fortify;

use App\Libs\TTU;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Spatie\Permission\Models\Role;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param array $input
     * @return User
     * @throws ValidationException
     * @throws \Exception
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'email' => [
                'required',
                'string',
                'max:255',
                Rule::unique(User::class)
            ]
        ])->validate();

        DB::beginTransaction();
        try {
            $user = User::create([
                'name' => $input['name'],
                'username' => $input['email'],
                'email' => $input['email'],
                'password' => Hash::make('password_confirmation')
            ]);

            $role = Role::where('name', 'user')->first();

            $user->roles()->attach($role->id);

            DB::commit();

            return $user;
        } catch (\Exception $exception) {
            DB::rollBack();

            Log::error('Registration error', [$exception->getMessage(), $exception->getLine()]);

            throw ValidationException::withMessages(['username' => 'Something went wrong']);
        }
    }
}
