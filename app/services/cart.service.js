const { ObjectId } = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
       
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCartData(payload) {
        const cart = {
            userId: payload.userId,
            productId: payload.productId,
            name: payload.name,
            image: payload.image,
            quantity: payload.quantity,
            price: payload.price,
            create_at: new Date(), 
        };
    
        
         
        //Remove undefined fields
        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );console.log('thành công')
        return cart;
        
    }

    async create(payload) {
        const cart = this.extractCartData(payload);
        const result = await this.Cart.findOneAndUpdate(
            cart,
            { $set: {  } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }


    async find(filter) {
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractCartData(payload);
        const result = await this.Cart.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Cart.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Cart.deleteMany({});
        return result.deletedCount;
    }

}

    

module.exports = CartService;