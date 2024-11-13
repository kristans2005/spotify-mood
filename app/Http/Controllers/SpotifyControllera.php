<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SpotifyControllera extends Controller
{
    public function index()
    {
        return Inertia::render('Spotify');
    }

    public function getToken()
    {

        $clientId = env('SPOTIFY_CLIENT_ID');
        $clientSecret = env('SPOTIFY_SECRET');
        $authUrl = 'https://accounts.spotify.com/api/token';
        $credentials = base64_encode("{$clientId}:{$clientSecret}");
        $response = json_decode(file_get_contents($authUrl, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => [
                    'Authorization: Basic ' . $credentials,
                    'Content-Type: application/x-www-form-urlencoded'
                ],
                'content' => http_build_query([
                    'grant_type' => 'client_credentials'
                ])
            ]
        ])));

        // dd($response);
        return json_encode($response);
    }
}
