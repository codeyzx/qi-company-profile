import { INSTAGRAM_ACCESS_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  try {
    // Instagram Basic Display API endpoint
    const fields = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';
    const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw error(response.status, 'Failed to fetch Instagram posts');
    }
    
    const data = await response.json();
    
    // Transform Instagram data ke format artikel
    const articles = data.data.map((post: any, index: number) => {
      // Extract caption untuk title dan excerpt
      const caption = post.caption || '';
      const lines = caption.split('\n').filter((line: string) => line.trim());
      const title = lines[0] || 'Artikel Gaming';
      const excerpt = lines.slice(1, 3).join(' ') || caption.substring(0, 150);
      
      // Ekstrak kategori dari hashtags
      const hashtags = caption.match(/#\w+/g) || [];
      let category = 'Berita';
      if (hashtags.some((tag: string) => tag.toLowerCase().includes('review'))) category = 'Review';
      if (hashtags.some((tag: string) => tag.toLowerCase().includes('list'))) category = 'List Game';
      if (hashtags.some((tag: string) => tag.toLowerCase().includes('fact'))) category = 'Fact';
      if (hashtags.some((tag: string) => tag.toLowerCase().includes('viral') || tag.toLowerCase().includes('clip'))) category = 'Clip Viral';
      
      // Format tanggal
      const date = new Date(post.timestamp);
      const formattedDate = new Intl.DateTimeFormat('id-ID', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      }).format(date);
      
      return {
        id: post.id,
        title: title.replace(/#\w+/g, '').trim(),
        excerpt: excerpt.replace(/#\w+/g, '').trim(),
        thumbnail: post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url,
        category,
        date: formattedDate,
        readTime: `${Math.ceil(caption.length / 200)} min`,
        permalink: post.permalink,
        mediaType: post.media_type
      };
    });
    
    // Limit to 6 posts
    return new Response(JSON.stringify({ 
      success: true,
      articles: articles.slice(0, 6) 
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });
    
  } catch (err) {
    console.error('Error fetching Instagram posts:', err);
    throw error(500, 'Failed to load articles');
  }
};
