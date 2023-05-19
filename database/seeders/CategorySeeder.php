<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'Historical Fiction',
            'Non Fiction',
            'Children\'s Literature',
            'Romance',
            'Science Fiction',
            'History',
            'Fiction',
            'Fantasy',
            'Memoir'
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate([
                'name' => $category
            ], [
                'name' => $category,
                'user_id' => 1
            ]);
        }
    }
}
