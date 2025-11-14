<?php

namespace App\Controller;

use App\Entity\Recommendation;
use App\Repository\RecommendationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/recommendations')]
final class RecommendationController extends AbstractController
{
    #[Route('/top-rated', name: 'api_recommendations_top_rated', methods: ['GET'])]
    public function getTopRated(
        RecommendationRepository $repository,
        Request $request
    ): JsonResponse {
        $minRating = (float) ($request->query->get('minRating', 4.5));
        $limit = (int) ($request->query->get('limit', 5));

        $recommendations = $repository->createQueryBuilder('r')
            ->where('r.rating >= :minRating')
            ->setParameter('minRating', $minRating)
            ->orderBy('r.rating', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();

        $data = array_map(function (Recommendation $rec) {
            return [
                'id' => $rec->getId(),
                'title' => $rec->getTitle(),
                'image' => $rec->getImage(),
                'rating' => $rec->getRating(),
                'price' => $rec->getPrice(),
                'description' => $rec->getDescription(),
            ];
        }, $recommendations);

        return new JsonResponse($data, Response::HTTP_OK);
    }
}

