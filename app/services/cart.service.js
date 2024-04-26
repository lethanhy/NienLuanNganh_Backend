const { ObjectId } = require("mongodb");

class CartService {
    constructor(client) {
        this.Cart = client.db().collection("carts");
       
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractCartData(payload) {
        const cart = {
            userId: payload.userId,
            sach: payload.sach || [],
            create_at: new Date(), 
        };
    
        
         
        //Remove undefined fields
        Object.keys(cart).forEach(
            (key) => cart[key] === undefined && delete cart[key]
        );
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
    async addCart(payload) {
        const cart = this.extractCartData(payload);
        // const { userId, productId, name, image, quantity, price } = payload;
        const result = await this.Cart.findOneAndUpdate(
            cart,
            { $set: { userId: payload.userId }},
            { returnDocument: "after", upsert: true }
        );
    
        console.log('thành công');
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Cart.find(filter);
        return await cursor.toArray();
    }

    async findByName(userId) {
        return await this.find({
            userId: { $regex: new RegExp(userId), $options: "i"},
        });
    }

    async findCartUser(userId) {
        try {
          // Sử dụng filter để tìm kiếm giỏ hàng của người dùng theo userId
          const filter = { userId: userId };
          // Sử dụng find để lấy danh sách giỏ hàng từ cơ sở dữ liệu
          const result = await this.Cart.find(filter).toArray();
          return result;
        } catch (error) {
          console.log('Error finding cart for user:', error);
          throw new Error('Error finding cart for user');
        }
      }

    async findById(id) {
        return await this.Cart.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    async finduserId(userId) {
        return await this.Cart.findOne({
            userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
        });
    }

    async findByuserId(userId) {
        try {
            const cart = await this.Cart.findOne(userId);
            return cart; // Trả về giỏ hàng nếu tìm thấy
        } catch (error) {
            console.error('Error finding cart by userId:', error);
            throw new Error(`Error finding cart by userId: ${error.message}`);
        }
    }

    // async findByuserId(userId) {
    //     const objectIdUserId = ObjectId.isValid(userId) ? new ObjectId(userId) : null;

    //     if (!objectIdUserId) {
    //         return null; // Return null if userId is not a valid ObjectId
    //     }
    
    //     return await this.findOne({ _userId: objectIdUserId }); // Assuming _id is the field representing userId in your collection
    // }
    // async findByuserId(userId) {
    //     return await this.Cart.findOne({
    //         _userId: ObjectId.isValid(userId) ? new ObjectId(userId) : null,
    //     });
    // }
    
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