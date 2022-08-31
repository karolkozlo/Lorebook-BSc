
function isCategoryHardcoded(categoryID) {
    return ['Locations', 'Characters', 'Events'].includes(categoryID);
}

export {
    isCategoryHardcoded
};