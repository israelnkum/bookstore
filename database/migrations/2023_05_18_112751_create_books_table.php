<?php

use App\Models\Author;
use App\Models\Category;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('books', static function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignIdFor(Category::class);
            $table->foreignIdFor(Author::class);
            $table->morphs('bookable');
            $table->string('isbn');
            $table->longText('description')->nullable();
            $table->decimal('price');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
