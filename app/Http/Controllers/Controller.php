<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getCommonData()
    {
        $loggedInUser = Auth::user();

        if (!$loggedInUser) {
            return response()->json([
                'message' => 'Unauthenticated'
            ], 422);
        }

        $permissions = Permission::all()->groupBy('group');
        $categories = Category::all();
        $authors = Author::all();
        $books = Book::count();

        return response([
            'permissions' => $permissions,
            'categories' => $categories,
            'authors' => $authors,
            'books' => $books,
        ]);
    }


    public function formatData(Builder $builder): array
    {
        return [
            'series' => $builder->pluck('name'),
            'values' => $builder->pluck('employees_count')
        ];
    }

    public function getRoles()
    {
        return Auth::user()->getRoleNames();
    }

    public function hasPermission($permission)
    {
        return Auth::user()?->can($permission);
    }


    public function isHr(): bool
    {
        return $this->hasPermission('approve-leave') || $this->hasPermission('disapprove-leave');
    }

    public function isSupervisor(): bool
    {
        return $this->hasPermission('approve-leave-request') || $this->hasPermission('decline-leave-request');
    }
}
