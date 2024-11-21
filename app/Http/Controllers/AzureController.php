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
        try {
            $client = new Client();
            $response = $client->post($this->endpoint . '/face/v1.0/detect', [
                'headers' => [
                    'Content-Type' => 'application/json',
                    'Ocp-Apim-Subscription-Key' => $this->subscriptionKey
                ],
                'json' => [
                    'url' => asset('images/image.jpg') // Convert to public URL
                ],
                'query' => [
                    'detectionModel' => 'detection_01',
                    'returnFaceAttributes' => 'age,gender,emotion',
                    'recognitionModel' => 'recognition_04'
                ]
            ]);

            return response()->json(json_decode($response->getBody()));
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function testAzureConnection()
    {
        try {
            $client = new Client();
            // Add specific API endpoint path
            $response = $client->get($this->endpoint . '/face/v1.0/detect', [
                'headers' => [
                    'Ocp-Apim-Subscription-Key' => $this->subscriptionKey
                ],
                'query' => [
                    'detectionModel' => 'detection_01'
                ]
            ]);

            if ($response->getStatusCode() === 200) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Successfully connected to Azure'
                ]);
            }

            return response()->json([
                'status' => 'error',
                'message' => 'Connection failed with status code: ' . $response->getStatusCode()
            ], 400);

        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Connection failed: ' . $e->getMessage()
            ], 500);
        }
    }
}
