import { wisp } from './wisp';

export async function getPhotoItemsByProjectTag(projectTag: string) {
  try {
    const result = await wisp.getContents({
      contentTypeSlug: 'photoItem',
      filters: {
        tags: projectTag, // 這裡會找出 tags 包含該專案 tag 的所有照片
      },
    });

    return result.contents || [];
  } catch (err) {
    console.error('Failed to fetch photo items:', err);
    return [];
  }
}
