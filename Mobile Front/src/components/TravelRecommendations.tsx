"use client";

import { useEffect, useState } from "react";
import RecommendationCard from "./RecommendationCard";

interface Recommendation {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  description: string;
}

export default function TravelRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/recommendations`, {
          headers: { 'Accept': 'application/ld+json' }
        });
        
        if (res.ok) {
          const data = await res.json();
          const recommendationsData = data['hydra:member'] || [];
          setRecommendations(recommendationsData.map((rec: any) => ({
            id: rec.id,
            image: rec.image,
            title: rec.title,
            rating: rec.rating,
            price: rec.price,
            description: rec.description
          })));
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <section className="h-screen snap-start snap-always bg-white overflow-y-auto">
      <div className="px-6 py-8">
        <h2 className="text-2xl mb-3 text-center">Travel Recommendations</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          The best travel recommendations from<br />around the world for you
        </p>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <RecommendationCard
                key={rec.id}
                image={rec.image}
                title={rec.title}
                rating={rec.rating}
                price={rec.price.toFixed(2).replace('.', ',')}
                description={rec.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

