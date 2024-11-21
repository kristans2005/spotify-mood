<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MoodController extends Controller
{

    public function detectMood(Request $request)
    {
        return response()->json([
            'mood' => 'happy'
        ]);
    }


}
