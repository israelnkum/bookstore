<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use JsonException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     * @throws JsonException
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $permissions = json_decode(file_get_contents(database_path('seed-data/roles-and-permissions.json')),
            false, 512, JSON_THROW_ON_ERROR);

        foreach ($permissions as $permission) {
            foreach ($permission->roles as $roleItem) {
                $role = Role::firstOrCreate(['name' => $roleItem]);
                if (count($permission->permissions) > 0) {
                    foreach ($permission->permissions as $item) {
                        $rolePermission = Permission::firstOrCreate([
                            'name' => $item,
                            'group' => $permission->group
                        ]);

                        $role->givePermissionTo($rolePermission);
                    }
                }
            }
        }

        $superAdminRole = Role::query()->where('name', 'admin')->first();
        $superAdminRole?->givePermissionTo(Permission::all());

        $user = User::query()->where('username', 'amosnkum')->first();
        $user?->assignRole($superAdminRole);
    }
}
