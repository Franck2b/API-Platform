<?php

namespace App\DataFixtures;

use App\Entity\Package;
use App\Entity\Recommendation;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    public function __construct(
        private UserPasswordHasherInterface $passwordHasher
    ) {
    }

    public function load(ObjectManager $manager): void
    {
        // User de test
        $user = new User();
        $user->setEmail('admin@example.com');
        $user->setPassword($this->passwordHasher->hashPassword($user, 'password123'));
        $user->setRoles(['ROLE_USER']);
        $manager->persist($user);
        // Packages
        $packages = [
            ['title' => 'Bali, Indonesia', 'image' => '/f1.webp', 'duration' => '3 days 2 Night'],
            ['title' => 'Yogyakarta', 'image' => '/f2.jpg', 'duration' => '4 days 3 Night'],
            ['title' => 'Nusa Penida', 'image' => '/f3.jpg', 'duration' => '3 days 2 Night'],
            ['title' => 'Rembang', 'image' => '/f4.avif', 'duration' => '4 days 3 Night'],
        ];

        foreach ($packages as $pkgData) {
            $package = new Package();
            $package->setTitle($pkgData['title']);
            $package->setImage($pkgData['image']);
            $package->setDuration($pkgData['duration']);
            $manager->persist($package);
        }

        // Recommendations
        $recommendations = [
            [
                'title' => 'Wales AVANT',
                'image' => '/p1.jpg',
                'rating' => 4.90,
                'price' => 122.23,
                'description' => 'Tour package 3 days 2 nights with a good and friendly tour guide'
            ],
            [
                'title' => 'Nglayur Beach',
                'image' => '/p2.jpg',
                'rating' => 4.70,
                'price' => 132.65,
                'description' => 'Tour package 3 days 2 nights with a good and friendly tour guide'
            ],
            [
                'title' => 'Paradise Villa',
                'image' => '/p3.avif',
                'rating' => 4.85,
                'price' => 145.80,
                'description' => 'Tour package 3 days 2 nights with a good and friendly tour guide'
            ],
        ];

        foreach ($recommendations as $recData) {
            $recommendation = new Recommendation();
            $recommendation->setTitle($recData['title']);
            $recommendation->setImage($recData['image']);
            $recommendation->setRating($recData['rating']);
            $recommendation->setPrice($recData['price']);
            $recommendation->setDescription($recData['description']);
            $manager->persist($recommendation);
        }

        $manager->flush();
    }
}

