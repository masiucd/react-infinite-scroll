import { Type, createSchema, typedModel } from 'ts-mongoose';

const userSchema = createSchema({
  name: Type.string({ required: true }),
  age: Type.number,
  email: Type.string({ required: true }),
});

const User = typedModel('User', userSchema);
export default User;
