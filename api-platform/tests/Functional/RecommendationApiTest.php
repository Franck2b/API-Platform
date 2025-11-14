<?php

namespace App\Tests\Functional;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RecommendationApiTest extends WebTestCase
{
    public function testGetRecommendationsCollection(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/recommendations');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        
        $response = $client->getResponse();
        $data = json_decode($response->getContent(), true);
        
        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('hydra:member', $data);
    }

    public function testTopRatedCustomOperation(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/recommendations/top-rated');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/json');
        
        $response = $client->getResponse();
        $data = json_decode($response->getContent(), true);
        
        $this->assertIsArray($data);
    }
}

