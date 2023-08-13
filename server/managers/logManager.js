const Log = require('../models/Log');


exports.getAll = async (page, itemsPerPage) => {
    return await Log.find({}).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
}

exports.getSearchResult = async (searchInput, page, itemsPerPage) => {
    const regex = new RegExp(searchInput, 'i');
    return  await Log.find({name: {$regex: regex}}).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
}

exports.getRescent = () => {
    return Log.find({}).sort({ _id: -1 }).limit(3).populate('_ownerId');
}


exports.getByUserId = async (userId, page, itemsPerPage) => {
    const userLogs = await Log.find({ _ownerId: userId }).skip(page * itemsPerPage).limit(itemsPerPage).populate('_ownerId');
    const count = await Log.countDocuments({_ownerId: userId});
    let pageCount = 0;
        if (count % itemsPerPage === 0) {
            pageCount = count / itemsPerPage;
        } else {
            pageCount = Math.floor(count / itemsPerPage) + 1;
        }
        return { userLogs, pageCount };
}

exports.getById = async (id) => {
    const log = Log.findById(id).populate('_ownerId').populate('commentList.user');
    return log;
}

exports.create = async (item) => {
    return Log.create(item);
}

exports.update = async (id, item) => {
    const existing = await Log.findById(id);

    existing.name = item.name;
    existing.date = item.date;
    existing.description = item.description;
    existing.img = item.img;
    existing.location = item.location;

    return existing.save();
}

exports.deleteById = async (id) => {
    return Log.findByIdAndDelete(id);
}

exports.getCount = async () => {
    return Log.countDocuments({});
};

exports.getSearchCount = async (searchParam) => {
    const regex = new RegExp(searchParam, 'i');
    return Log.countDocuments({name: {$regex: regex}});
};

exports.addComment = async (id, commentData) => {
    const log = await Log.findById(id).populate('_ownerId').populate('commentList.user');
    log.commentList.push(commentData);
    log.save();
    return log;
}

exports.addLike = async (id, userId) => {
    const log = await Log.findById(id).populate('_ownerId').populate('commentList.user');
    log.likes.push(userId);
    log.save();
    return log;
}

exports.downloadImage = async (id, userId) => {
    const log = await Log.findById(id).populate('_ownerId').populate('commentList.user');
    log.downloads.push(userId);
    log.save();
    return log;
}