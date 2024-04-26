const { ObjectId, Timestamp } = require("mongodb");

class NhanvienService {
    constructor(client) {
        this.Nhanvien = client.db().collection("nhanvien");
       
    }
    
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractNhanvienData(payload) {
        const nhanvien = {
            hotennv: payload.hotennv,
            password: payload.password,
            chucvu: payload.chucvu,
            diachi:payload.diachi,
            dienthoai:payload.dienthoai,
            create_at: new Date(),
              
        };console.log('thành công')
        
         
        //Remove undefined fields
        Object.keys(nhanvien).forEach(
            (key) => { nhanvien[key] === undefined && delete nhanvien[key]
            });console.log('thành công')
        return nhanvien;
        
    }

    async create(payload) {
        const nhanvien = this.extractNhanvienData(payload);
        const result = await this.Nhanvien.findOneAndUpdate(
            nhanvien,
            { $set: {  } },
            { returnDocument: "after", upsert: true }
        );
        return result.value;
    }


    async find(filter) {
        const cursor = await this.Nhanvien.find(filter);
        return await cursor.toArray();
    }

    async findByName(hotennv) {
        return await this.find({
            hotennv: { $regex: new RegExp(hotennv), $options: "i"},
        });
    }

    async findUserLogin(filter) {
        const cursor = await this.Nhanvien.findOne(filter);
        return await cursor;
    }

    async findById(id) {
        return await this.Nhanvien.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractNhanvienData(payload);
        const result = await this.Nhanvien.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after"}
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Nhanvien.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Nhanvien.deleteMany({});
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

module.exports = NhanvienService;
