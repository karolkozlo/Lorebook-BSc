import { db } from '../models/index.js';
import { NotFoundException } from "../errors.js";
import { Sequelize } from "sequelize";
import { currentDateTimetoIsoString } from "./utils.js";
import { createContent } from "./ContentService.js";

async function createLocation(name, description, universeID, parentLocationID = null) {
    let lastModified = currentDateTimetoIsoString();
    try {
        const location = await db.Location.create({
            name: name,
            description: description,
            last_modified: lastModified,
            Universe_id: universeID,
            Location_id: parentLocationID
        });
        await createContent(location.getDataValue("id"), "Location");
        return location;
    } catch(err) {
        throw new Error(err.message);
    }
};

async function findLocation(id) {
    try {
        const location = await db.Location.findOne({
            where: {
                id: id
            }
        });
        return location;
    } catch(err) {
        throw new NotFoundException("Location not found");
    }
};

async function findUniverseLocations(universeID) {
    try {
        const locations = await db.Location.findAll({
            attributes: ['id', 'name', 'Location_id'],
            where: {
                Universe_id: universeID,
            },
            order: [['last_modified', 'DESC']]
        });
        return locations;
    } catch(err) {
        throw new NotFoundException("Locations for this universe were not found");
    }
};

async function findChildLocations(id) {
    try {
        const locations = await db.Location.findAll({
            where: {
                Location_id: id
            }
        });
        return locations;
    } catch(err) {
        throw new NotFoundException("Locations were not found");
    }
};

async function findAncestorLocations(id) {
    try {
        const locations = await db.sequelize.query(`WITH RECURSIVE cte (id, name, description, Location_id) as (
            SELECT id, name, description, Location_id
            FROM locations
            WHERE id = :id
            UNION ALL
            SELECT p.id, p.name, p.description, p.Location_id
            FROM locations p
            INNER JOIN cte ON p.id = cte.Location_id
          )
          SELECT * FROM cte WHERE id != :id;`,
        {
            type: db.sequelize.QueryTypes.SELECT,
            replacements: {
                id: id
            }
        });
        return locations;
    } catch(err) {
        throw new NotFoundException("Ancestors for this locations were not found");
    }
};

async function searchLocations(universeID, expr, limit, offset) {
    let findLimit = limit;
    if(!limit) {
        findLimit = 50;
    }
    let findOffset = offset;
    if(!offset) {
        findOffset = 0;
    }
    let searchLike = '.*'+expr+'.*';
    let Op = Sequelize.Op;
    try {
        const locations = await db.Location.findAll({
            where: {
                [Op.and]: [
                    {Universe_id: universeID},
                    {name: {
                        [Op.regexp]: searchLike
                    }}
                ]
            },
            offset: findOffset,
            limit: findLimit,
            order: [['last_modified', 'DESC']]
        });
        return locations;
    } catch(err) {
        throw new Error(err.message);
    }
}

async function destroyLocation(id) {
    try {
        await db.Location.destroy({
          where: { id: id },
        });
      } catch (err) {
        throw new Error(err.message);
      }
};

async function updateLocation(id, updatedFields) {
    let lastModified = currentDateTimetoIsoString();
    try {
        const modelKeys = Object.keys(db.Location.getAttributes());
        let subsetFields = modelKeys
            .filter((key) => key in updatedFields)
            .reduce((subset, key) => {
            subset[key] = updatedFields[key];
            return subset;
        }, {});
        subsetFields.last_modified = lastModified;
        await db.Location.update(subsetFields, { where: { id: id } })
    } catch (err) {
        throw new Error(err.message);
    }
};

export {
    createLocation,
    updateLocation,
    findLocation,
    findChildLocations,
    findAncestorLocations,
    findUniverseLocations,
    searchLocations,
    destroyLocation
};