<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBookRequest;
use App\Http\Requests\UpdateBookRequest;
use App\Http\Resources\BookResource;
use App\Models\Book;
use App\Models\Ebook;
use App\Models\PaperBook;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use ReflectionClass;

class BookController extends Controller
{

    /**
     * @return AnonymousResourceCollection
     */
    public function index(): AnonymousResourceCollection
    {
        return BookResource::collection(Book::paginate(10));
    }

    /**
     * @param $bookId
     * @return JsonResponse
     */
    public function show($bookId): JsonResponse
    {
        try {
            $book = Book::findOrFail($bookId);

            return response()->json(new BookResource($book));
        } catch (ModelNotFoundException $modelNotFoundException) {
            Log::error('Show single book error: ', [$modelNotFoundException]);

            return response()->json([
                'message' => 'Invalid value for book id: ' . $bookId
            ], 404);
        }
    }

    /**
     * @param StoreBookRequest $bookRequest
     * @return JsonResponse
     */
    public function store(StoreBookRequest $bookRequest)
    {
        try {
            DB::beginTransaction();

            if ($bookRequest->book_type === 'Ebook') {
                $bookType = Ebook::create($bookRequest->only(['download_url', 'size']));
            } else {
                $bookType = PaperBook::create($bookRequest->only(['shipping_weight', 'in_stock']));
            }

            $reflection = new ReflectionClass($bookType);

            $book = new Book();
            $book->title = $bookRequest->title;
            $book->category_id = $bookRequest->category_id;
            $book->author_id = $bookRequest->author_id;
            $book->isbn = $bookRequest->isbn;
            $book->description = $bookRequest->description;
            $book->price = $bookRequest->price;
            $book->bookable_type = $reflection->getShortName();
            $book->bookable_id = $bookType->id;
            $book->save();
            DB::commit();

            return response()->json(new BookResource($book), 201);
        } catch (Exception $exception) {
            DB::rollBack();
            return response()->json([
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    /**
     * @param UpdateBookRequest $bookRequest
     * @param $bookId
     * @return JsonResponse
     */
    public function update(UpdateBookRequest $bookRequest, $bookId): JsonResponse
    {
        DB::beginTransaction();
        try {
            $book = Book::findOrFail($bookId);

            if ($book->bookable_type != $bookRequest->book_type) {
                $book->bookable->delete();

                if ($bookRequest->book_type === 'Ebook') {
                    $bookType = Ebook::create($bookRequest->only(['download_url', 'size']));
                } else {
                    $bookType = PaperBook::create($bookRequest->only(['shipping_weight', 'in_stock']));
                }
            } else {
                $bookType = $book->bookable;

                if ($bookRequest->book_type === 'Ebook') {
                    $bookType->update($bookRequest->only(['download_url', 'size']));
                } else {
                    $bookType->update($bookRequest->only(['shipping_weight', 'in_stock']));
                }
            }

            $reflection = new ReflectionClass($bookType);

            $book->title = $bookRequest->title;
            $book->category_id = $bookRequest->category_id;
            $book->author_id = $bookRequest->author_id;
            $book->isbn = $bookRequest->isbn;
            $book->description = $bookRequest->description;
            $book->price = $bookRequest->price;
            $book->bookable_type = $reflection->getShortName();
            $book->bookable_id = $bookType->id;

            $book->save();

            DB::commit();

            return response()->json(new BookResource($book));
        } catch (ModelNotFoundException $modelNotFoundException) {
            Log::error('Book for update Not found: ', [$modelNotFoundException]);

            return response()->json([
                'message' => 'Invalid value for book id: ' . $bookId
            ], 404);
        } catch (Exception $exception) {
            DB::rollBack();

            Log::error('Book update error: ', [$exception]);

            return response()->json([
                'message' => 'Something went wrong'
            ], 400);
        }
    }

    public function destroy($bookId): JsonResponse
    {
        try {
            $book = Book::findOrFail($bookId);

            $book->delete();

            return response()->json([
                'message' => 'Book Deleted'
            ]);
        } catch (ModelNotFoundException $modelNotFoundException) {
            Log::error('Book for deleting Not found', [$modelNotFoundException]);

            return response()->json([
                'message' => 'Invalid value for book id: ' . $bookId
            ], 404);
        }
    }
}
