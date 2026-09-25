import { useQuery } from "@tanstack/react-query";
import { strapiFetch, POPULATE } from "@/lib/strapi";

// Content is fetched fresh on load and polled every 60s while a tab stays
// open, so a publish in Strapi shows up without a redeploy — refresh (or
// wait a minute) and it's live. See README for the true-push upgrade path.
const REFETCH_MS = 60_000;

function useSingleType(key, path, populate) {
  return useQuery({
    queryKey: [key],
    queryFn: () => strapiFetch(path, populate ? { populate } : undefined),
    staleTime: 30_000,
    refetchInterval: REFETCH_MS,
    refetchOnWindowFocus: true,
  });
}

function useCollectionType(key, path, params) {
  return useQuery({
    queryKey: [key],
    queryFn: () => strapiFetch(path, params),
    staleTime: 30_000,
    refetchInterval: REFETCH_MS,
    refetchOnWindowFocus: true,
  });
}

export const useGlobal = () => useSingleType("global", "/global", POPULATE.global);
export const useHomePage = () => useSingleType("home-page", "/home-page", POPULATE.homePage);
export const useTheHousePage = () => useSingleType("the-house-page", "/the-house-page", POPULATE.theHousePage);
export const useExperiencesPage = () => useSingleType("experiences-page", "/experiences-page", POPULATE.experiencesPage);
export const useTastingRoomPage = () => useSingleType("tasting-room-page", "/tasting-room-page", POPULATE.tastingRoomPage);
export const useLibraryPage = () => useSingleType("library-page", "/library-page", POPULATE.libraryPage);
export const useJourneysPage = () => useSingleType("journeys-page", "/journeys-page", POPULATE.journeysPage);
export const useContactPage = () => useSingleType("contact-page", "/contact-page", POPULATE.contactPage);

export const useBottles = () =>
  useCollectionType("bottles", "/bottles", { populate: POPULATE.bottle, "pagination[pageSize]": 100, sort: "id:asc" });

export const useJourneys = () =>
  useCollectionType("journeys", "/journeys", { populate: POPULATE.journey, "pagination[pageSize]": 100, sort: "order:asc" });

export const useMenu = () =>
  useCollectionType("menu-categories", "/menu-categories", {
    populate: POPULATE.menuCategory,
    "pagination[pageSize]": 100,
    sort: "order:asc",
  });
