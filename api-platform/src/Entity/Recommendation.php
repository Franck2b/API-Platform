<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use App\Repository\RecommendationRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: RecommendationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['recommendation:read']],
            security: "true"
        ),
        new Get(
            normalizationContext: ['groups' => ['recommendation:read']],
            security: "true"
        ),
        new Post(
            denormalizationContext: ['groups' => ['recommendation:write']],
            security: "is_granted('ROLE_USER')"
        ),
        new Put(
            denormalizationContext: ['groups' => ['recommendation:write']],
            security: "is_granted('ROLE_USER')"
        ),
        new Delete(
            security: "is_granted('ROLE_USER')"
        )
    ],
    paginationItemsPerPage: 10
)]
#[ApiPlatform\Doctrine\Orm\Filter\SearchFilter(
    properties: ['title' => 'partial', 'description' => 'partial']
)]
#[ApiPlatform\Doctrine\Orm\Filter\OrderFilter(
    properties: ['title', 'rating', 'price', 'id']
)]
#[ApiPlatform\Doctrine\Orm\Filter\RangeFilter(
    properties: ['rating', 'price']
)]
class Recommendation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['recommendation:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['recommendation:read', 'recommendation:write'])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['recommendation:read', 'recommendation:write'])]
    #[Assert\NotBlank]
    private ?string $image = null;

    #[ORM\Column(type: 'decimal', precision: 3, scale: 2)]
    #[Groups(['recommendation:read', 'recommendation:write'])]
    #[Assert\NotBlank]
    #[Assert\Range(min: 0, max: 5)]
    private ?float $rating = null;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['recommendation:read', 'recommendation:write'])]
    #[Assert\NotBlank]
    #[Assert\Positive]
    private ?float $price = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['recommendation:read', 'recommendation:write'])]
    #[Assert\NotBlank]
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(string $title): static
    {
        $this->title = $title;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getRating(): ?float
    {
        return $this->rating;
    }

    public function setRating(float $rating): static
    {
        $this->rating = $rating;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }
}
