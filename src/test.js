// const mongoose = require("mongoose");
// const { Schema } = mongoose;

// const medicineTimingSchema = new Schema({
//    patient: {
//       name: {
//          type: String,
//       },
//       userId: {
//          type: Schema.Types.ObjectId,
//          ref: 'User',
//       }
//    },
//    caretaker: {
//       name: {
//          type: String,
//       },
//       userId: {
//          type: Schema.Types.ObjectId,
//          ref: 'User',
//       }
//    },
//    medicineNames: String,
//    from: String,
//    to: String,
//    frequency: String,
//    times: [String],
//    postedAt: String,
//    email: String,
//    contactNo: String,
//    whatsAppNo: String,
//    courseStatus: String,
// });

// module.exports = mongoose.model("MedicineIntakeSchedule", medicineTimingSchema);

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// const userSchema = new Schema({
//    name: {
//       type: 'String',
//       required: true,
//    },
//    email: {
//       type: 'String',
//       required: true,
//    },
//    contactNo: {
//       type: 'String',
//       required: true,
//    },
//    password: {
//       type: 'String',
//       required: true,
//    },
//    role: {
//       type: 'String',
//       required: true,
//    },
//    dateCreated: {
//       type: Date,
//       default: Date.now,
//    }
// });

// module.exports = mongoose.model("User", userSchema);