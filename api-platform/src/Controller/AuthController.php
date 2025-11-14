<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Attribute\Route;

final class AuthController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(): void
    {
        // Cette méthode ne sera jamais appelée car json_login intercepte la requête
        // Mais la route doit exister pour que Symfony la reconnaisse
    }
}
