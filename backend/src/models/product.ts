import mongoose from 'mongoose';

interface IImage {
  fileName: string;
  originalName: string;
}

interface IProduct {
  title: string;
  image: IImage;
  category: string;
  description?: string;
  price?: number | null;
}

const imageSchema = new mongoose.Schema<IImage>(
  {
    fileName: {
      type: String,
      required: [true, 'Имя файла изображения обязательно'],
    },
    originalName: {
      type: String,
      required: [true, 'Оригинальное имя файла обязательно'],
    },
  },
  {
    _id: false,
  },
);

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Название товара обязательно'],
    unique: true,
    minlength: [2, 'Название товара должно содержать не менее 2 символов'],
    maxlength: [30, 'Название товара должно содержать не более 30 символов'],
  },
  image: {
    type: imageSchema,
    required: [true, 'Изображение товара обязательно'],
  },
  category: {
    type: String,
    required: [true, 'Категория товара обязательна'],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
    min: [0, 'Цена товара не может быть отрицательной'],
  },
});

export default mongoose.model<IProduct>('product', productSchema);
