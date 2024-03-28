const { ObjectId } = require("mongodb");

class OrderService {
    constructor(client) {
        this.Order = client.db().collection("orders");
       
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractOrderData(payload) {
        const order = {
            userId: payload.userId,
        //     products: [{
        //       productId:String(payload.productId),
        //       quantity:Number(payload.quantity),
        //    }],
        //    address: payload.address,
        //    status:payload.status,
        //   create_at: new Date(),
           name: payload.user,
           phone: payload.phone,
           address: payload.address,
           orderItems: payload.orderItems,
           paidAt: new Date(),
           totalPrice: payload.totalPrice,
           totalPriceDiscount: payload.totalPriceDiscount,
           orderStatus: payload.orderStatus,

        };
        
         
        //Remove undefined fields
        Object.keys(order).forEach(
            (key) => order[key] === undefined && delete order[key]
        );console.log('thành công')
        return order;
        
    }

    async create(payload) {
        const order = this.extractOrderData(payload);
        const result = await this.Order.findOneAndUpdate(
            order,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Order.find(filter);
        return await cursor.toArray();
    }

    // async findByName(name) {
    //     return await this.find({
    //         name: { $regex: new RegExp(name), $options: "i"},
    //     });
    // }

    async findById(id) {
        return await this.Order.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

}

module.exports = OrderService;