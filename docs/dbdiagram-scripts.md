# DATABASE CREATION

``` sql
// User

enum role { 
  admin
  client 
  super_admin
}

enum gender { 
  male
  female
  other
}

enum user_type { 
  google
  email
}

Table user { 
  id varchar [pk, not null]
  username varchar [not null, unique]
  email varchar [not null, unique]
  password varchar [not null]
  full_name varchar [not null]
  phone_number varchar [not null, unique]

  user_type user_type [default: 'email']
  role role [default: 'client']
  gender gender
  avatar_img varchar
  active boolean [default: true]

  created_at timestamp [default: 'now()']
  updated_at timestamp

  last_connection timestamp [default: 'now()']

  indexes { 
    (id, username) [pk]
    (email)[unique]
  }
}

// Review & Comments 

Table review { 
  id varchar [pk, not null]
  user_id varchar [not null]
  ordered_product_id varchar [not null]
  rating_value integer [not null]
  visible boolean [default: true]
  comment_id varchar

  created_at timestamp [default: 'now()']
  updated_at timestamp

  indexes { 
    (user_id, ordered_product_id) [unique]
    (ordered_product_id) 
    (visible)
  }
}

Table comment { 
  id varchar [pk]
  user_id varchar [not null]
  content text [not null]
  visible boolean [default: true]

  comment_parent_id varchar

  created_at timestamp [default: 'now()']
  updated_at timestamp

   indexes { 
    (user_id)
    (visible)
  }
}

// Shipping Address 

Table user_address { 
  user_id varchar [not null]
  address_id varchar [not null]
  is_default boolean [default: true]
}

Table address { 
  id varchar [pk, not null]
  unit_number integer
  street_number varchar 
  address_line1 varchar [not null]
  address_line2 varchar [not null]
  city varchar [not null]
  region varchar [not null]
  postal_code varchar [not null]
  country_id integer [not null]
  reference varchar [default: 'no-ref']
  location_id varchar
}

Table location { 
  id varchar [pk]
  lat number
  lng number
}

Table country { 
  id integer [pk, increment, not null] 
  code varchar [not null, unique]
  long_name varchar [not null]
  
  indexes { 
    (code)[unique]
  }
}


// Payments 

Table user_payment_method { 
  id varchar [pk, not null]
  user_id varchar [not null]
  payment_method_id varchar [not null]
  
  provider varchar [not null]
  account_number varchar [not null] 
  expiry_date timestamp 
  is_default boolean [default: true]
}


enum payment_value {
  credit_card 
  other
}

Table payment_method { 
  id varchar [pk, not null]
  value payment_value [not null, default: 'credit_card']
}


// Shopping cart 

Table shopping_cart { 
  id varchar [pk, not null]
  user_id varchar [not null]
} 

Table shopping_cart_product_item {
  id varchar [pk, not null]
  shopping_cart_id varchar [not null]
  product_item_id varchar [not null]
  quantity integer [not null, default: 1]

  indexes {
    (shopping_cart_id, product_item_id) [unique]
    (shopping_cart_id)

  }
}

// Product

Table product { 
  id varchar [pk, not null]
  title varchar [not null]
  subtitle varchar [not null]
  description text [not null]


  created_by varchar [not null]
  updated_by varchar [not null]

  created_at timestamp [default: 'now()']
  updated_at timestamp

  indexes { 
    (id) [pk]
  }

}

Table product_image {
  id varchar [pk, not null]
  product_id varchar [not null]
  visible boolean [default: true]

  uploaded_by varchar [not null]
  uploaded_at timestamp [default: 'now()']

  indexes { 
    (product_id)
  }
}

Table  product_item { 
  id varchar [pk, not null] 
  product_id varchar [not null]
  SKU varchar [not null]
  quantity_in_stock integer [default: 1]
  price number [default: 0]
  
  slug text [not null]

  indexes {
    (product_id)[unique]
    (SKU)[unique]
    (slug)
  }
  
}

Table product_promotion { 
  product_id varchar [not null]
  promotion_id varchar [not null]
}




Table promotion { 
  id varchar [pk, not null]
  description text [not null]
  percentage_discount integer [default: 0]
  start_date timestamp [default: 'now()']
  end_date timestamp 
}

Table product_tag {
  product_id varchar [not null]
  tag_id varchar [not null]
}

Table tag {
  id varchar [pk, not null]
  code varchar [not null]
  value varchar [not null]

  indexes {
    (code)
    (value)
  }
}

Table product_category { 
  product_id varchar [not null]
  category_id varchar [not null]
}

Table category { 
  id varchar [pk, not null]
  value varchar [not null]
  description text [not null]

  season_id varchar [not null]
  parent_category_id varchar
  active boolean [default: true]

  created_by varchar [not null]
}

Table category_promotion { 
  category_id varchar [not null]
  promotion_id varchar [not null]
}

Table variation { 
  id varchar [pk, not null]
  category_id varchar [not null]
  name varchar [not null]
}

Table variation_option { 
  id varchar [pk, not null]
  variation_id varchar [not null]
  value varchar [not null]
}

Table product_configuration { 
  product_item_id varchar [not null]
  variation_option_id varchar [not null]
}

Table season {
  id varchar [pk, not null]

  description text [not null]

  start_date timestamp [default: 'now()']
  end_date timestamp 
}

// Orders 
Table order_line {
  id varchar [pk, not null]
  product_item_id varchar [not null]
  shop_order_id varchar [not null]
  quantity integer [not null]
  total_price number [not null]
}

Table shop_order { 
  id varchar [pk, not null]
  user_id varchar [not null]
  user_payment_method_id varchar [not null]
  shipping_address_id varchar [not null]
  shipping_method_id varchar [not null]
  order_total number [not null]
  order_status_id varchar [not null]

  created_at timestamp [default: 'now()']
  updated_at timestamp 

  last_location_id varchar 

  indexes { 
    (user_id)[unique]
  }
}

Table shipping_method { 
  id varchar [pk, not null]
  name varchar [not null]
  price number [not null, default: 0]
}

enum status_value {
  placed
  processing
  in_progress
  delivered
}

Table order_status { 
  id varchar [pk, not null]
  status_value status_value
}


Ref: "user"."id" < "user_address"."user_id"

Ref: "address"."id" < "user_address"."address_id"

Ref: "country"."id" < "address"."country_id"

Ref: "address"."location_id" - "location"."id"

Ref: "review"."comment_id" < "comment"."id"

Ref: "user"."id" < "review"."user_id"

Ref: "user"."id" < "comment"."user_id"

Ref: "user"."id" < "user_payment_method"."user_id"

Ref: "payment_method"."id" < "user_payment_method"."payment_method_id"

Ref: "product"."id" < "product_tag"."product_id"

Ref: "tag"."id" < "product_tag"."tag_id"

Ref: "product"."id" < "product_category"."product_id"

Ref: "category"."id" < "product_category"."category_id"

Ref: "category"."id" < "category"."parent_category_id"

Ref: "comment"."id" < "comment"."comment_parent_id"

Ref: "user"."id" < "product_image"."uploaded_by"

Ref: "product"."id" < "product_item"."product_id"

Ref: "product"."id" < "product_image"."product_id"

Ref: "category"."id" < "variation"."category_id"

Ref: "variation"."id" < "variation_option"."variation_id"

Ref: "product_item"."product_id" < "product_configuration"."product_item_id"

Ref: "variation_option"."id" < "product_configuration"."variation_option_id"

Ref: "user"."id" < "shopping_cart"."user_id"

Ref: "shopping_cart"."id" < "shopping_cart_product_item"."shopping_cart_id"

Ref: "product_item"."id" < "shopping_cart_product_item"."product_item_id"

Ref: "shop_order"."order_status_id" < "order_status"."id"

Ref: "shop_order"."shipping_method_id" < "shipping_method"."id"

Ref: "shop_order"."id" < "order_line"."shop_order_id"

Ref: "user"."id" < "shop_order"."user_id"

Ref: "shop_order"."user_payment_method_id" < "user_payment_method"."id"

Ref: "address"."id" < "shop_order"."shipping_address_id"

Ref: "product_item"."id" < "order_line"."product_item_id"

Ref: "shop_order"."last_location_id" - "location"."id"

Ref: "order_line"."id" < "review"."ordered_product_id"

Ref: "product_item"."id" < "product_image"."product_id"

Ref: "product"."id" < "product_promotion"."product_id"

Ref: "promotion"."id" < "product_promotion"."promotion_id"

Ref: "category"."id" < "category_promotion"."category_id"

Ref: "promotion"."id" < "category_promotion"."promotion_id"

Ref: "season"."id" < "category"."season_id"
```