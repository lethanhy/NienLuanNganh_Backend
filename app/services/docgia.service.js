const { ObjectId, Timestamp } = require("mongodb");

class DocgiaService {
    constructor(client) {
        this.Docgia = client.db().collection("docgia");
       
    }
    
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractDocgiaData(payload) {
        const docgia = {
            holot: payload.holot,
            ten: payload.ten,
            ngaysinh: payload.ngaysinh,
            phai: payload.phai,
            diachi: payload.diachi,
            dienthoai: payload.dienthoai,
            password: payload.password,
            create_at: new Date(),
              
        };
        
         
        //Remove undefined fields
        Object.keys(docgia).forEach(
            (key) => { docgia[key] === undefined && delete docgia[key]
            });console.log('thành công')
        return docgia;
        
    }

    async create(payload) {
        const docgia = this.extractDocgiaData(payload);
        const result = await this.Docgia.findOneAndUpdate(
            docgia,
            { $set: {  } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }


    async find(filter) {
        const cursor = await this.Docgia.find(filter);
        return await cursor.toArray();
    }

    async findByName(ten) {
        return await this.find({
            ten: { $regex: new RegExp(ten), $options: "i"},
        });
    }

    async findUserLogin(filter) {
        const cursor = await this.Docgia.findOne(filter);
        return await cursor;
    }

    async findById(id) {
        return await this.Docgia.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractDocgiaData(payload);
        const result = await this.Docgia.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Docgia.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Docgia.deleteMany({});
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

module.exports = DocgiaService;
