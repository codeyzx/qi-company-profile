-- Seed data for game_categories table
-- This migration adds the 4 categories currently hardcoded in PopularGames.svelte
INSERT INTO
    game_categories (
        title_id,
        title_en,
        description_id,
        description_en,
        icon,
        badge_id,
        badge_en,
        count_text_id,
        count_text_en,
        gradient_from,
        gradient_to,
        sort_order,
        status
    )
VALUES
    (
        'News',
        'News',
        'Berita terkini seputar dunia game — dari perilisan judul baru, patch update, event esports, hingga tren industri gaming global. Cepat, akurat, dan selalu update.',
        'Latest news from the gaming world — from new releases, patch updates, esports events, to global gaming industry trends. Fast, accurate, and always updated.',
        'Newspaper',
        'Breaking',
        'Breaking',
        '500+ Artikel',
        '500+ Articles',
        '#F5CB3B',
        '#322F81',
        1,
        'published'
    ),
    (
        'List Game',
        'Game Lists',
        'Rekomendasi pilihan game terbaik dengan tema menarik — "Top 10 Games of the Month", "Best Indie Games", hingga "Game Lokal Wajib Coba". Panduan praktis untuk temukan game favoritmu.',
        'Curated game recommendations with interesting themes — "Top 10 Games of the Month", "Best Indie Games", to "Must-Try Local Games". Practical guide to find your favorite games.',
        'ListOrdered',
        'Curated',
        'Curated',
        '100+ Lists',
        '100+ Lists',
        '#8B5CF6',
        '#06B6D4',
        2,
        'published'
    ),
    (
        'Fact',
        'Gaming Facts',
        'Fakta unik, trivia seru, dan insight mendalam dari jagat gaming — sejarah game legendaris, easter egg tersembunyi, hingga data statistik industri. Pengetahuan ringan tapi berbobot.',
        'Unique facts, fun trivia, and deep insights from the gaming world — legendary game history, hidden easter eggs, to industry statistics. Light but substantial knowledge.',
        'Lightbulb',
        'Insights',
        'Insights',
        '200+ Facts',
        '200+ Facts',
        '#F59E0B',
        '#EF4444',
        3,
        'published'
    ),
    (
        'Clip Viral',
        'Viral Clips',
        'Kumpulan video pendek dan klip viral dari komunitas gamer — momen epic, gameplay luar biasa, hingga kejadian tak terduga. Konten seru yang bikin kamu pengen share!',
        'Collection of short videos and viral clips from the gaming community — epic moments, amazing gameplay, to unexpected events. Fun content that makes you want to share!',
        'Video',
        'Trending',
        'Trending',
        '300+ Clips',
        '300+ Clips',
        '#EC4899',
        '#8B5CF6',
        4,
        'published'
    );