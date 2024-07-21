CREATE TABLE orders (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        surname VARCHAR(255) NOT NULL,
                        delivery_option VARCHAR(255) NOT NULL,
                        payment_option VARCHAR(255) NOT NULL,
                        room_number VARCHAR(255),
                        total DOUBLE PRECISION NOT NULL,
                        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
                             id SERIAL PRIMARY KEY,
                             order_id BIGINT NOT NULL,
                             dish_name VARCHAR(255) NOT NULL,
                             quantity INTEGER NOT NULL,
                             price DOUBLE PRECISION NOT NULL,
                             FOREIGN KEY (order_id) REFERENCES orders(id)
);

ALTER TABLE menuitem ADD COLUMN quantity int check ( quantity >=0);

--------------------------------
ALTER TABLE order_items
ADD COLUMN menu_item_id INTEGER,
ADD CONSTRAINT fk_menu_item
FOREIGN KEY (menu_item_id)
REFERENCES menuitem (id);
