export interface Product {
  _id:string,
  imageCover:string,
  title:string,
  price:Number,
  category: Category,
  ratingsAverage:Number,
  description?:string,
  images?:string[]
}

interface Category{
  name:string
}
