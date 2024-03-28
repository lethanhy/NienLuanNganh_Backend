const { ObjectId, Timestamp } = require("mongodb");

class UserService {
    constructor(client) {
        this.User = client.db().collection("users");
       
    }
    
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractUserData(payload) {
        const user = {
            username: payload.username,
            email: payload.email,
            phone: payload.phone,
            password: payload.password,
            isAdmin: false,
            address: payload.address,
            favorite: payload.favorite,
            cart:[],
            create_at: new Date(),
              
        };
        
         
        //Remove undefined fields
        Object.keys(user).forEach(
            (key) => { user[key] === undefined && delete user[key]
            });console.log('thành công')
        return user;
        
    }

    async create(payload) {
        const user = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            user,
            { $set: { favorite: user.favorite === true } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }


    async find(filter) {
        const cursor = await this.User.find(filter);
        return await cursor.toArray();
    }

    async findByName(username) {
        return await this.find({
            username: { $regex: new RegExp(username), $options: "i"},
        });
    }

    async findUserLogin(filter) {
        const cursor = await this.User.findOne(filter);
        return await cursor;
    }

    async findById(id) {
        return await this.User.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractUserData(payload);
        const result = await this.User.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.User.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.User.deleteMany({});
        return result.deletedCount;
    }

    // async addCart(id, cartItem){
    //     const filter = {
    //         _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    //     };
    //     const update = {$push: {cart: {$each: cartItem}}};
    //     const result = await this.User.findOneAndUpdate(
    //         filter,
    //         update,
    //         { returnDocument: "after"}
    //     );
    //     return result.value;

    // }
}

module.exports = UserService;
