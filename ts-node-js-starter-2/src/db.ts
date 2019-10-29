import * as mongoose from 'mongoose';

const url: string = 'mongodb://127.0.0.1:27017/ts-db';

export default mongoose.connect(url, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log('Successfully Connected!');
  }
});
