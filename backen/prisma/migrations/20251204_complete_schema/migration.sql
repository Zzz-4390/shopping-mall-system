-- 添加缺失的字段到 message 表
ALTER TABLE `message` ADD COLUMN `conversationid` CHAR(36) NOT NULL;

-- 添加缺失的索引到 message 表
CREATE INDEX IF NOT EXISTS `idx_conversation_sendtime` ON `message` (`conversationid`, `sendtime`);

-- 修正 product 表的字段类型
ALTER TABLE `product` MODIFY COLUMN `photo` VARCHAR(500) NULL;
ALTER TABLE `product` MODIFY COLUMN `status` CHAR(20) NOT NULL;
ALTER TABLE `product` MODIFY COLUMN `category` CHAR(20) NOT NULL;

-- 添加缺失的索引到 product 表
CREATE INDEX IF NOT EXISTS `idx_product_listing` ON `product` (`status`, `category`, `publishtime`);

-- 添加 cartitem 表的唯一约束
ALTER TABLE `cartitem` ADD CONSTRAINT `cart_product_unique` UNIQUE (`cartid`, `productid`);

-- 创建视图：用户订单详情视图
DROP VIEW IF EXISTS `vw_user_order_detail`;
CREATE VIEW `vw_user_order_detail` AS
SELECT
    o.orderid,
    o.buyerid,
    o.sellerid,
    o.productid,
    o.createtime,
    o.finishtime,
    o.isdone,
    p.title AS product_title,
    p.price AS product_price,
    p.photo AS product_photo,
    p.status AS product_status,
    p.category AS product_category,
    buyer.name AS buyer_name,
    buyer.phone AS buyer_phone,
    seller.name AS seller_name,
    seller.phone AS seller_phone
FROM orders o
LEFT JOIN product p ON o.productid = p.productid
LEFT JOIN users buyer ON o.buyerid = buyer.userid
LEFT JOIN users seller ON o.sellerid = seller.userid;

-- 创建视图：购物车明细视图
DROP VIEW IF EXISTS `vw_cart_detail`;
CREATE VIEW `vw_cart_detail` AS
SELECT
    ci.cartitemid,
    ci.cartid,
    ci.productid,
    ci.entertime,
    p.title AS product_title,
    p.content AS product_content,
    p.price AS product_price,
    p.photo AS product_photo,
    p.status AS product_status,
    p.category AS product_category,
    p.sellerid AS product_sellerid,
    c.cartuserid
FROM cartitem ci
LEFT JOIN product p ON ci.productid = p.productid
LEFT JOIN cart c ON ci.cartid = c.cartid;
