<?php

namespace App\Tests\Functional;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class PackageApiTest extends WebTestCase
{
    public function testGetPackagesCollection(): void
    {
        $client = static::createClient();
        $client->request('GET', '/api/packages');

        $this->assertResponseIsSuccessful();
        $this->assertResponseHeaderSame('content-type', 'application/ld+json; charset=utf-8');
        
        $response = $client->getResponse();
        $data = json_decode($response->getContent(), true);
        
        $this->assertArrayHasKey('@context', $data);
        $this->assertArrayHasKey('@id', $data);
        $this->assertArrayHasKey('@type', $data);
        $this->assertArrayHasKey('hydra:member', $data);
    }

    public function testCreatePackageRequiresAuthentication(): void
    {
        $client = static::createClient();
        $client->request('POST', '/api/packages', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'title' => 'Test Package',
            'image' => '/test.jpg',
            'duration' => '2 days 1 night'
        ]));

        $this->assertResponseStatusCodeSame(401);
    }

    public function testCreatePackageWithAuthentication(): void
    {
        $client = static::createClient();
        
        // Login avec le compte de test (créé via fixtures)
        $client->request('POST', '/api/login', [], [], [
            'CONTENT_TYPE' => 'application/json',
        ], json_encode([
            'username' => 'admin@example.com',
            'password' => 'password123'
        ]));
        
        $this->assertResponseIsSuccessful();
        $response = json_decode($client->getResponse()->getContent(), true);
        $token = $response['token'] ?? null;
        
        $this->assertNotNull($token);
        
        // Create package with token
        $client->request('POST', '/api/packages', [], [], [
            'CONTENT_TYPE' => 'application/json',
            'HTTP_AUTHORIZATION' => 'Bearer ' . $token,
        ], json_encode([
            'title' => 'Test Package',
            'image' => '/test.jpg',
            'duration' => '2 days 1 night'
        ]));
        
        $this->assertResponseStatusCodeSame(201);
        $response = json_decode($client->getResponse()->getContent(), true);
        $this->assertArrayHasKey('title', $response);
        $this->assertEquals('Test Package', $response['title']);
    }
}

