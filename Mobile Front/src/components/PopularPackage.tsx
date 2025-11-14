"use client";

import { useEffect, useState } from "react";
import PackageCard from "./PackageCard";

interface Package {
  id: number;
  image: string;
  title: string;
  duration: string;
}

export default function PopularPackage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const apiBase = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';
        const res = await fetch(`${apiBase}/api/packages`, {
          headers: { 'Accept': 'application/ld+json' }
        });
        
        if (res.ok) {
          const data = await res.json();
          const packagesData = data['hydra:member'] || [];
          setPackages(packagesData.map((pkg: any) => ({
            id: pkg.id,
            image: pkg.image,
            title: pkg.title,
            duration: pkg.duration
          })));
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="h-screen snap-start snap-always bg-white overflow-y-auto">
      <div className="px-6 py-8">
        <h2 className="text-2xl mb-3 text-center">Popular Package</h2>
        <p className="text-sm text-gray-400 mb-6 text-center">
          The most popular tour packages<br />presented to you
        </p>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-10">
            {packages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                image={pkg.image}
                title={pkg.title}
                duration={pkg.duration}
              />
            ))}
          </div>
        )}

        <button className="w-3/4 mx-auto block bg-[#FC3C5F] hover:bg-[#e23252] text-white font-normal py-3 rounded-full shadow-lg transition-all active:scale-95 mb-20 text-base">
          Explore more
        </button>

        <div className="text-center mb-8 relative">
          <div className="absolute -left-2 top-0 w-2 h-2 bg-pink-400 rounded-full"></div>
          <div className="absolute -right-2 top-10 w-2 h-2 bg-purple-400 rounded-full"></div>
          <div className="absolute left-4 bottom-0 w-2 h-2 bg-rose-400 rounded-full"></div>
          <div className="absolute right-6 bottom-2 w-2 h-2 bg-red-400 rounded-full"></div>
          
          <h3 className="text-2xl font-normal mb-4">
            Top Value From Us<br />For You
          </h3>
          <p className="text-sm text-gray-400 mb-6">
            Try a variety of benefits when using our<br />services
          </p>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl" role="img" aria-label="planet">🌍</span>
            </div>
            <h4 className="text-lg font-normal text-gray-900 mb-2">Lot Of Choices</h4>
            <p className="text-sm text-gray-400 mb-2">
              Total 500+ Destinations that we<br />work with
            </p>
            <button className="text-pink-500 font-semibold text-sm">Read more</button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center mx-auto mb-4 bg-white">
              <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-gray-900">
                <g>
                  <circle cx="24" cy="9" r="4" fill="currentColor"/>
                  <rect x="32" y="14" width="3.5" height="24" rx="1.5" fill="currentColor"/>
                  <path d="M24 14c-2.75.5-5.671 2.329-5.671 5.434 0 1.017.393 1.918 1.043 2.589a3.418 3.418 0 0 1 2.294-.823c1.089 0 2.085.533 2.688 1.362L28.5 31h-3.1l-3.841-7.067c-.097.005-.194.007-.294.007-.703 0-1.373-.105-1.959-.291l-2.138 5.385a1.5 1.5 0 0 0 .92 1.94c.384.157.81.176 1.202.049l2.183-.734L23 35.5h10.5v-3H27.19l-1.683-4L28.5 22.5V15.5c0-1.326-1.074-2.423-2.5-2.5zm-8 21.5c.828 0 1.5-.672 1.5-1.5S16.828 32.5 16 32.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5z" fill="currentColor"/>
                </g>
              </svg>
            </div>
            <h4 className="text-lg font-normal text-gray-900 mb-2">Best Tour Guide</h4>
            <p className="text-sm text-gray-400 mb-2">
              Our tour guide with 15+ years of<br />experience
            </p>
            <button className="text-pink-500 font-semibold text-sm">Read more</button>
          </div>
        </div>
      </div>
    </section>
  );
}

