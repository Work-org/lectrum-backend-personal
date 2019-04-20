// Core
import { Schema, model } from 'mongoose';

// Document shape
const schema = new Schema({});

// Collection
export const products = model('product', schema);
