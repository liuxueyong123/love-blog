CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account` varchar(255)  NOT NULL DEFAULT '',
  `password` varchar(255)  NOT NULL DEFAULT '',
  `name` varchar(255)  NOT NULL DEFAULT '',
  `gender` tinyint  NOT NULL DEFAULT 1 comment '1: female; 2:male',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `album` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `image_link` varchar(255)  NOT NULL DEFAULT '',
  `picture_time` varchar(255)  NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT '',
  `type_id` int  NOT NULL,
  `upload_account_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `album_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255)  NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `post` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` int  NOT NULL,
  `content` text  NOT NULL,
  `publish_time` TIMESTAMP not null,
  `type_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `post_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255)  NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `post_like` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int  NOT NULL,
  `post_id` int  NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `post_comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int  NOT NULL,
  `content` text  NOT NULL,
  `publish_time`  varchar(255)  NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `article` ( 
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `publisher_id` int  NOT NULL,
  `content` text  NOT NULL,
  `publish_time` varchar(255) DEFAULT '',
  `type_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `article_type` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(255)  NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `article_like` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `account_id` int  NOT NULL,
  `article_id` int  NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `article_comment` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int  NOT NULL,
  `content` text  NOT NULL,
  `publish_time`  varchar(255)  NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- 增加类型说明
ALTER TABLE album_type ADD COLUMN type_detail VARCHAR(255) DEFAULT NULL;
ALTER TABLE post_type ADD COLUMN type_detail VARCHAR(255) DEFAULT NULL;
ALTER TABLE article_type ADD COLUMN type_detail VARCHAR(255) DEFAULT NULL;

-- 增加类型图标
ALTER TABLE album_type ADD COLUMN type_icon VARCHAR(255) DEFAULT NULL;
ALTER TABLE post_type ADD COLUMN type_icon VARCHAR(255) DEFAULT NULL;
ALTER TABLE article_type ADD COLUMN type_icon VARCHAR(255) DEFAULT NULL;

