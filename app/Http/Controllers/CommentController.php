<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    public function index()
    {
        $products = Comment::all()->toArray();
        $products = array_map(
            function ($item) {
                return [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'text' => $item['text'],
                    'date' => $item['date'],
                ];
            },
            $products);
        return array_reverse($products);
    }

    public function store(Request $request)
    {
        $product = new Comment([
            'name' => $request->input('name'),
            'text' => $request->input('text'),
            'date' => $request->input('date'),

        ]);
        $product->save();

        return response()->json([
            'id' => $product->id,
            'name' => $product->name,
            'text' => $product->text,
            'date' => $product->date
        ]);
    }

    public function show($id)
    {
        $product = Comment::find($id);
        return response()->json($product);
    }

    public function update($id, Request $request)
    {
        $product = Comment::find($id);
        $product->update($request->all());

        return response()->json('Product updated!');
    }

    public function destroy($id)
    {
        $product = Comment::find($id);
        $product->delete();

        return response()->json('Product deleted!');
    }
}
