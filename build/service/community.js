import categoryRepository from '../repository/category';
import communityRepository from '../repository/community';
async function save(title, category, content) {
    try {
        const categoryId = await categoryRepository.findCategoryIdByName(category);
        if (categoryId === undefined)
            return undefined;
        const result = await communityRepository.save(title, categoryId, content);
        if (result === undefined)
            return undefined;
        return result;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
async function findById(id) {
    try {
        const result = await communityRepository.findById(id);
        if (result === undefined)
            return undefined;
        return result;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
async function deleteById(id) {
    try {
        const result = await communityRepository.deleteById(id);
        if (result === undefined || result === 0)
            return undefined;
        return result;
    }
    catch (err) {
        return undefined;
    }
}
async function update(id, title, content) {
    try {
        const result = await communityRepository.update(id, title, content);
        return result;
    }
    catch (err) {
        console.log(err);
        return undefined;
    }
}
const communityService = { save, findById, deleteById, update };
export default communityService;
