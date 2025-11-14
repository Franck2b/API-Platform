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
use ApiPlatform\Serializer\Filter\GroupFilter;
use App\Repository\PackageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: PackageRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            normalizationContext: ['groups' => ['package:read']],
            security: "true"
        ),
        new Get(
            normalizationContext: ['groups' => ['package:read']],
            security: "true"
        ),
        new Post(
            denormalizationContext: ['groups' => ['package:write']],
            security: "is_granted('ROLE_USER')"
        ),
        new Put(
            denormalizationContext: ['groups' => ['package:write']],
            security: "is_granted('ROLE_USER')"
        ),
        new Delete(
            security: "is_granted('ROLE_USER')"
        )
    ],
    paginationItemsPerPage: 10
)]
#[ApiPlatform\Doctrine\Orm\Filter\SearchFilter(
    properties: ['title' => 'partial']
)]
#[ApiPlatform\Doctrine\Orm\Filter\OrderFilter(
    properties: ['title', 'id']
)]
class Package
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['package:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['package:read', 'package:write'])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 255)]
    private ?string $title = null;

    #[ORM\Column(length: 255)]
    #[Groups(['package:read', 'package:write'])]
    #[Assert\NotBlank]
    private ?string $image = null;

    #[ORM\Column(length: 50)]
    #[Groups(['package:read', 'package:write'])]
    #[Assert\NotBlank]
    private ?string $duration = null;

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

    public function getDuration(): ?string
    {
        return $this->duration;
    }

    public function setDuration(string $duration): static
    {
        $this->duration = $duration;

        return $this;
    }
}
