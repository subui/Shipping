/*
Navicat SQL Server Data Transfer

Source Server         : SQL Server
Source Server Version : 130000
Source Host           : LICHBX\SQLEXPRESS:1433
Source Database       : Shipping
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 130000
File Encoding         : 65001

Date: 2017-03-18 09:30:49
*/


-- ----------------------------
-- Table structure for Order
-- ----------------------------
DROP TABLE IF EXISTS [dbo].[Order]
GO
CREATE TABLE [dbo].[Order] (
[OrderId] int NOT NULL IDENTITY(1,1) ,
[OrderName] nvarchar(255) NOT NULL ,
[ShopId] int NOT NULL ,
[StartingPoint] nvarchar(255) NOT NULL ,
[Destination] nvarchar(255) NOT NULL ,
[StartTime] datetime2(7) NOT NULL ,
[RecipientsName] nvarchar(255) NOT NULL ,
[RecipientsPhoneNumber] nvarchar(16) NOT NULL ,
[AdvanceDeposit] decimal(18) NOT NULL ,
[Profit] decimal(18) NOT NULL ,
[SelectedShipperId] int NULL ,
[Status] int NOT NULL 
)


GO

-- ----------------------------
-- Table structure for ReviewsShipper
-- ----------------------------
DROP TABLE IF EXISTS [dbo].[ReviewsShipper]
GO
CREATE TABLE [dbo].[ReviewsShipper] (
[OrderId] int NOT NULL ,
[Score] int NOT NULL ,
[Content] nvarchar(255) NOT NULL ,
[RevTime] datetime2(7) NOT NULL 
)


GO

-- ----------------------------
-- Table structure for ShippingRegistration
-- ----------------------------
DROP TABLE IF EXISTS [dbo].[ShippingRegistration]
GO
CREATE TABLE [dbo].[ShippingRegistration] (
[OrderId] int NOT NULL ,
[ShipperId] int NOT NULL ,
[RegTime] datetime2(7) NOT NULL 
)


GO

-- ----------------------------
-- Table structure for User
-- ----------------------------
DROP TABLE IF EXISTS [dbo].[User]
GO
CREATE TABLE [dbo].[User] (
[UserId] int NOT NULL IDENTITY(1,1) ,
[FullName] nvarchar(255) NOT NULL ,
[Username] varchar(32) NOT NULL ,
[Password] char(64) NOT NULL ,
[Email] varchar(255) NOT NULL ,
[PhoneNumber] varchar(16) NOT NULL ,
[BirthDay] date NULL ,
[Gender] int NULL ,
[UserType] int NOT NULL ,
[ShopName] nvarchar(255) NULL ,
[ShopAddress] nvarchar(255) NULL ,
[Score] decimal(18) NULL 
)


GO

-- ----------------------------
-- Indexes structure for table Order
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table Order
-- ----------------------------
ALTER TABLE [dbo].[Order] ADD PRIMARY KEY ([OrderId])
GO

-- ----------------------------
-- Indexes structure for table ReviewsShipper
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table ReviewsShipper
-- ----------------------------
ALTER TABLE [dbo].[ReviewsShipper] ADD PRIMARY KEY ([OrderId])
GO

-- ----------------------------
-- Indexes structure for table ShippingRegistration
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table ShippingRegistration
-- ----------------------------
ALTER TABLE [dbo].[ShippingRegistration] ADD PRIMARY KEY ([OrderId], [ShipperId])
GO

-- ----------------------------
-- Indexes structure for table User
-- ----------------------------

-- ----------------------------
-- Primary Key structure for table User
-- ----------------------------
ALTER TABLE [dbo].[User] ADD PRIMARY KEY ([UserId])
GO
