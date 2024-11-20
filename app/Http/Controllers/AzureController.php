<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;

class AzureController extends Controller
{
    private $endpoint;
    private $subscriptionKey;

    public function __construct()
    {
        // Add these to your .env file
        $this->endpoint = env('AZURE_FACE_ENDPOINT');
        $this->subscriptionKey = env('AZURE_FACE_KEY');
    }

    public function detectEmotion(Request $request)
    {
        //dd($request);
        try {
            $client = new Client();
            $response = $client->post($this->endpoint . '/face/v2.0/detect', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Ocp-Apim-Subscription-Key' => $this->subscriptionKey
                ],
                'json' => [
                    'url' => $request->input('image_url')
                ],
                'query' => [
                    'returnFaceAttributes' => 'emotion'
                ]
            ]);


            return response()->json(json_decode($response->getBody()));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
