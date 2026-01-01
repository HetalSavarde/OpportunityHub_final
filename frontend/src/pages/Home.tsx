import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { Opportunity, fetchOpportunities } from "@/services/opportunityService";
import Navbar from "@/components/Navbar";
import OpportunityCard from "@/components/OpportunityCard";
import FiltersSidebar from "@/components/FiltersSidebar";
import UpcomingDeadlines from "@/components/UpcomingDeadlines";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Home = () => {
  const { user, isAuthenticated, isLoading: authLoading, toggleWishlist } =
    useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null); // UI only
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  /* 🔐 Auth guard */
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [authLoading, isAuthenticated, navigate]);

  /* 🔄 Fetch opportunities (ONLY location + domain) */
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const loadOpportunities = async () => {
      setIsLoading(true);
      try {
        const data = await fetchOpportunities({
          location: user.location,
          domains: user.domains,
        });
        setOpportunities(data);
      } catch (err) {
        console.error("Failed to load opportunities:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadOpportunities();
  }, [isAuthenticated, user?.location, user?.domains]);

  /* ❤️ Wishlist */
  const handleWishlistToggle = async (id: string) => {
    await toggleWishlist(id);
  };

  /* 🔍 Local filtering (SAFE) */
  const filteredOpportunities = useMemo(() => {
    let result = [...opportunities];

    // UI Type filter (local only)
    if (selectedType) {
      result = result.filter((opp) => opp.type === selectedType);
    }

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (opp) =>
          opp.title.toLowerCase().includes(q) ||
          opp.organization.toLowerCase().includes(q) ||
          opp.domains.some((d) => d.toLowerCase().includes(q))
      );
    }

    return result;
  }, [opportunities, selectedType, searchQuery]);

  /* ⏰ Urgent */
  const urgentCount = opportunities.filter((opp) => {
    const d = new Date(opp.deadline);
    const days =
      (d.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    return days <= 7;
  }).length;

  /* 🟣 Type Pills (UI only) */
  const typeFilters = [
    { key: null, label: "All" },
    { key: "hackathon", label: "Hackathons" },
    { key: "tech-event", label: "Events" },
    { key: "college-fest", label: "Fests" },
    { key: "internship", label: "Internships" },
    { key: "job", label: "Jobs" },
  ];

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} showSearch />

      <main className="max-w-[1600px] mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* LEFT */}
          <div className="hidden lg:block w-64">
            <FiltersSidebar
              selectedTypes={selectedType ? [selectedType] : []}
              onTypeChange={() => {}}
              availableCount={opportunities.length}
              wishlistedCount={user?.wishlist?.length || 0}
              urgentCount={urgentCount}
            />
          </div>

          {/* CENTER */}
          <div className="flex-1">
            {/* Pills */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {typeFilters.map((t) => (
                <Button
                  key={t.label}
                  size="sm"
                  variant={
                    t.key === selectedType ||
                    (t.key === null && selectedType === null)
                      ? "default"
                      : "outline"
                  }
                  onClick={() => setSelectedType(t.key)}
                >
                  {t.label}
                </Button>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Stat label="Available" value={filteredOpportunities.length} />
              <Stat label="Wishlisted" value={user?.wishlist?.length || 0} />
              <Stat label="Urgent" value={urgentCount} danger />
            </div>

            {/* Grid */}
            {filteredOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOpportunities.map((opp, i) => (
                  <OpportunityCard
                    key={opp.id}
                    opportunity={opp}
                    isWishlisted={user?.wishlist?.includes(opp.id)}
                    onWishlistToggle={handleWishlistToggle}
                    colorIndex={i}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-card rounded-xl border">
                <p className="text-muted-foreground">
                  No opportunities found matching your criteria.
                </p>
                <Button className="mt-4" onClick={() => setSelectedType(null)}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="hidden xl:block w-72">
            <UpcomingDeadlines opportunities={opportunities} />
          </div>
        </div>
      </main>
    </div>
  );
};

/* 🔢 Small stat card */
const Stat = ({
  label,
  value,
  danger,
}: {
  label: string;
  value: number;
  danger?: boolean;
}) => (
  <div className="bg-card rounded-xl p-4 border text-center">
    <p
      className={`text-2xl font-bold ${
        danger ? "text-destructive" : "text-primary-dark"
      }`}
    >
      {value}
    </p>
    <p className="text-xs text-muted-foreground">{label}</p>
  </div>
);

export default Home;
