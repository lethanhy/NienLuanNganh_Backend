const { ObjectId } = require("mongodb");

class CategoryService {
    constructor(client) {
        this.Category = client.db().collection("category");
       
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCategoryData(payload) {
        const category = {
            name: payload.name,
        };
        
         
        //Remove undefined fields
        Object.keys(category).forEach(
            (key) => category[key] === undefined && delete category[key]
        );console.log('thành công')
        return category;
        
    }

    async create(payload) {
        const category = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            category,
            { $set: {  } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }


    async find(filter) {
        const cursor = await this.Category.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Category.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCategoryData(payload);
        const result = await this.Category.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Category.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    // async findFavorite() {
    //     return await this.find({ favorite: true });
    // }

    async deleteAll() {
        const result = await this.Category.deleteMany({});
        return result.deletedCount;
    }

}

    

module.exports = CategoryService;