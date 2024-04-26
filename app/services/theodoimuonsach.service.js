const { ObjectId } = require("mongodb");

class TheodoimuonsachService {
    constructor(client) {
        this.Theodoimuonsach = client.db().collection("theodoimuonsach");
       
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractTheodoimuonsachData(payload) {
        const theodoimuonsach = {
            userId:payload.userId,
            tendocgia:payload.tendocgia,
            tongtien:payload.tongtien,
            tensach:payload.tensach,
            trangthai:payload.trangthai,
            thoigianmuon:payload.thoigianmuon,
            thoigiantra:payload.thoigiantra,

        };
        
         
        //Remove undefined fields
        Object.keys(theodoimuonsach).forEach(
            (key) => theodoimuonsach[key] === undefined && delete theodoimuonsach[key]
        );console.log('thành công')
        return theodoimuonsach;
        
    }

    async create(payload) {
        const theodoimuonsach = this.extractTheodoimuonsachData(payload);
        const result = await this.Theodoimuonsach.findOneAndUpdate(
            theodoimuonsach,
            { $set: { trangthai: 'đã mượn'} },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }

    async addOrder(payload) {
        const theodoimuonsach = this.extractTheodoimuonsachData(payload);
        // const { userId, productId, name, image, quantity, price } = payload;
        const result = await this.Theodoimuonsach.findOneAndUpdate(
            theodoimuonsach,
            { $set: {  }},
            { returnDocument: "after", upsert: true }
        );
    
        console.log('thành công');
        return result.value;
    }


    async find(filter) {
        const cursor = await this.Theodoimuonsach.find(filter);
        return await cursor.toArray();
    }

    async findByName(tendocgia) {
        return await this.find({
            tendocgia: { $regex: new RegExp(tendocgia), $options: "i"},
        });
    }

    async findById(id) {
        return await this.Theodoimuonsach.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

}

module.exports = TheodoimuonsachService;