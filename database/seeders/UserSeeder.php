<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $user = User::updateOrcreate(['username' => 'amosnkum'], [
            'name' => 'Amos Nkum',
            'username' => 'amosnkum',
            'email' => 'amos.nkum@gmail.com',
            'password' => Hash::make(1),
            'phone_number' => '0544513074'
        ]);

//
//        $role = Role::firstOrCreate(['name' => 'Admin'])->first();
//
//        $user->roles()->attach($role->id);
    }
}
