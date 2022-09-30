import LbAPI from "./LbAPI.js";

async function getUniverseElementsShortLists(universeID) {
    return await LbAPI
        .get(`/search/shortLists/${universeID}`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

function universeElementsMapper(elements) {
    return elements.map(el => {
        return {
            id: el.id,
            name: el.name,
            lastModified: el.last_modified,
            categoryID: el.Category_id,
            categoryName: el.categoryName
        };
    })
};

async function getSearchedUniverseElements(universeID, query, categories, tags, elementsPerPage, page) {
    let queryParams = [];

    if (categories && categories.length > 0) {
        const encodedCategories = categories.map(cat => {
            const encoded = encodeURIComponent(cat)
            return `&categories=${encoded}`;
        });
        encodedCategories.forEach(cat => queryParams.push(cat));
    }

    if (tags && tags.length > 0) {
        const encodedTags = tags.map(tag => {
            const encoded = encodeURIComponent(tag)
            return `&tags=${encoded}`;
        });
        encodedTags.forEach(tag => queryParams.push(tag));
    }

    let queryParamsString = '';
    if (queryParams.length > 0) {
        queryParams.forEach(qp => {
            queryParamsString = `${queryParamsString}${qp}`;
        });
    }


    const encodedQuery = encodeURIComponent(query ? query : '');
    return await LbAPI
        .get(`/search/${universeID}/?q=${encodedQuery}${queryParamsString}&limit=${elementsPerPage}&offset=${page}`)
        .then((response) => {
            const searchResult = {
                elements: universeElementsMapper(response.data.rows),
                totalPages: Math.ceil(response.data.count / elementsPerPage)
            };
            return searchResult;
        })
        .catch((error) => {
            if (error.response && error.response.data.message) {
                const err = new Error(`${error.response.data.message}`);
                throw err;
            } else if (error.request) {
                throw new Error("Service refused connection");
            } else {
                throw new Error("Undefined error");
            }
        });
};

export {
    getUniverseElementsShortLists,
    getSearchedUniverseElements
}