<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getActiveRoles(): JsonResponse|array
    {
        $loggedInUser = Auth::user();

        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        return [
            'user' => $loggedInUser->only(['id', 'name', 'username']),
            'roles' => $loggedInUser->getRoleNames(),
            'permissions' => $loggedInUser->getPermissionsViaRoles()->pluck('name')->merge
            ($loggedInUser->getDirectPermissions()->pluck('name'))
        ];
    }
}
