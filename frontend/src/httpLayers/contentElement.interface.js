import contentElementType from '@/domain/contentElementTypes.js';
import { deleteText, createText } from './text.http.js';
import { deleteList, createList } from './list.http.js';
import { deleteLinkGroup, createLinkGroup } from './link.http.js';
import { deleteImageGroup, createImageGroup } from './image.http.js';

async function createContentElement(fields, contentID, type) {
  let element = null;
  try {
    if (type == contentElementType.text) {
      element = await createText(fields, contentID);
    } else if (type == contentElementType.list) {
      element = await createList(fields, contentID);
    } else if (type == contentElementType.linkGroup) {
      element = await createLinkGroup(fields, contentID);
    } else if (type == contentElementType.imageGroup) {
      element = await createImageGroup(fields, contentID);
    }
  } catch (error) {
    throw new Error(error.message);
  }
  return element;
};

async function deleteContentElement(id, contentID, type) {
  if (type == contentElementType.text) {
    await deleteText(id, contentID);
  } else if (type == contentElementType.list) {
    await deleteList(id, contentID);
  } else if (type == contentElementType.linkGroup) {
    await deleteLinkGroup(id, contentID);
  } else if (type == contentElementType.imageGroup) {
    await deleteImageGroup(id, contentID);
  }
};

export {
  createContentElement,
  deleteContentElement
}