import { wisp } from './wisp';

export async function getPhotoItemsByProjectTag(projectTag: string) {
  try {
    const result = await wisp.getContents({
        contentTypeSlug: "photoItem",
        limit: "all", 
    });
    
    const filtered = result.contents?.filter(photo =>
        photo.content.tags?.includes(projectTag)
    ) ?? [];

    return filtered;
  } catch (err) {
    console.error('Failed to fetch photo items:', err);
    return [];
  }
}
