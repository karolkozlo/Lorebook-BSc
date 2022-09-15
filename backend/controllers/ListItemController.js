import {
    createListItem,
    findListItem,
    findListItems,
    changeListItemPosition,
    updateListItem,
    destroyListItem,
} from "../services/ListItemService.js";

async function getListItem(req, res) {
    if (req.params.id === undefined) {
      res.status(400).send({ message: "ID must be defined" });
      return;
    }
    try {
      const listItem = await findListItem(req.params.id);
      res.status(200).json(listItem);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function getListItems(req, res) {
    if (req.params.listID === undefined) {
        res.status(400).send({ message: "listID must be defined" });
        return;
    }
    try {
      const listItems = await findListItems(req.params.listID);
      res.status(200).json(listItems);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
}

async function postListItem(req, res) {
    if (req.body.contentID == undefined || req.body.listID == undefined) {
      res.status(400).send({ message: "contentID and listID must be defined" });
        return;
    }
    try {
      const createdListItem = await createListItem(
        req.body.title,
        req.body.text,
        req.body.ordinalNumber,
        req.body.listID,
        req.body.contentID
      );
      res.status(201).json(createdListItem);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function deleteListItem(req, res) {
    try {
      await destroyListItem(req.params.id, req.params.contentID);
      res.status(200).send();
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
}

async function patchListItem(req, res) {
    try {
      const id = req.params.id;
      await updateListItem(id, req.body, req.params.contentID);
      res.status(200).send();
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
  }

  async function patchListItemPosition(req, res) {
    try {
      const id = req.params.id;
      if(!req.body || !req.body.listID || req.body.oldOrdinalNumber == undefined || !req.body.newOrdinalNumber == undefined) {
          res.status(400).send({message: "Body of request should contain: listID, oldOrdinalNumber and newOrdinalNumber"});
      } else {
        if(req.body.oldOrdinalNumber != req.body.newOrdinalNumber) {
            await changeListItemPosition(id, req.body.listID, req.body.oldOrdinalNumber, req.body.newOrdinalNumber, req.params.contentID);
        }
        res.status(200).send();
      }
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
  }

  export { getListItem, getListItems, postListItem, deleteListItem, patchListItem, patchListItemPosition };