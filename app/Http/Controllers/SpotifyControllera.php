<?php

namespace App\Http\Controllers;

use App\Models\PlaylistHistory;
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
        return json_encode($response);
    }

    public function getLatestRelease(Request $request)
    {
        $token = $request->token;
        $url = 'https://api.spotify.com/v1/browse/new-releases';
        $response = json_decode(file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => 'Authorization: Bearer ' . $token
            ]
        ])));
        return json_encode($response);
    }

    public function getMoodPlaylist(Request $request)
    {

        $token = $request->token;
        $searchQuery = $request->mood;
        $url = 'https://api.spotify.com/v1/search?q=' . urlencode($searchQuery) . '&type=track&limit=10';

        $response = json_decode(file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'GET',
                'header' => 'Authorization: Bearer ' . $token
            ]
        ])));


        // // Save history
        // if ($response && isset($response->tracks)) {
        //     $processedAlbums = [];

        //     // Process up to 20 tracks
        //     $trackCount = min(count($response->tracks), 20);

        //     for ($i = 0; $i < $trackCount; $i++) {
        //         $track = $response->tracks[$i];
        //         $albumId = $track->album->id;

        //         // Only save unique albums
        //         if (!in_array($albumId, $processedAlbums) && !empty($track->album->images)) {
        //             $history = new PlaylistHistory();
        //             $history->name = $track->album->name;
        //             $history->picture = $track->album->images[0]->url;
        //             $history->created_at = now();
        //             $history->save();

        //             $processedAlbums[] = $albumId;
        //         }
        //     }
        // }

        return json_encode($response);
    }

    /**
     * Get paginated playlist history
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getHistory(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Default 10 items per page

        $history = PlaylistHistory::orderBy('created_at', 'desc')
            ->paginate($perPage);

        return response()->json([
            'data' => $history->items(),
            'current_page' => $history->currentPage(),
            'last_page' => $history->lastPage(),
            'per_page' => $history->perPage(),
            'total' => $history->total()
        ]);
    }
}
