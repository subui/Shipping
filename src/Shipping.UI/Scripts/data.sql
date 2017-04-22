/*
Navicat SQL Server Data Transfer

Source Server         : SQL Server
Source Server Version : 130000
Source Host           : localhost\SqlExpress:1433
Source Database       : Shipping
Source Schema         : dbo

Target Server Type    : SQL Server
Target Server Version : 130000
File Encoding         : 65001

Date: 2017-04-22 10:27:19
*/


DELETE FROM [dbo].[Order];
-- ----------------------------
-- Records of Order
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Order] ON
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1', N'test', N'0', N'1 noi nao do', N'gui vao day', N'2017-04-21 02:21:00.0000000', N'Lung Thị Linh', N'0969969969', N'10000000', N'1000', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'4', N'ad', N'0', N'Hill St. & 2nd St. Los Angeles, CA 90012', N'1600 Pennsylvania Ave NW, Washington, DC 20500', N'2017-04-19 16:59:00.0000000', N'nguoi nhan 1', N'(917) 756-8000', N'999999999', N'0', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'5', N'dien thoai', N'1', N'noi nhan1', N'noi giao1', N'2017-04-29 03:20:00.0000000', N'nguoi nhan 1', N'123', N'555555', N'55', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'6', N'test 2', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-26 13:14:00.0000000', N'ten 1', N'123', N'555', N'555', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'7', N'test get list', N'1', N'hanoi', N'hcm', N'2017-05-10 15:17:00.0000000', N'nguoi nhan 1', N'123', N'111', N'1', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'8', N'quan ao', N'1', N'hust', N'neu', N'2017-04-21 05:30:00.0000000', N'lorem', N'0123', N'5555', N'4441', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'9', N'test toast', N'2', N'toast1', N'toast 2', N'2017-04-24 03:38:00.0000000', N'nguoi nhan 1', N'123', N'1111', N'11', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'10', N'dien thoai 1', N'1', N'vietnam', N'vietnam', N'2017-04-21 02:41:00.0000000', N'nguoi nhan 1', N'123', N'1111', N'11', null, N'0')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'11', N'dien thoai 2', N'1', N'vietnam', N'vietnam', N'2017-04-21 04:00:00.0000000', N'nguoi nhan 1', N'123', N'1111', N'111', null, N'0')
GO
GO
SET IDENTITY_INSERT [dbo].[Order] OFF
GO

DELETE FROM [dbo].[ReviewsShipper];
-- ----------------------------
-- Records of ReviewsShipper
-- ----------------------------

DELETE FROM [dbo].[ShippingRegistration];
-- ----------------------------
-- Records of ShippingRegistration
-- ----------------------------
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1', N'0', N'1-01-01 00:00:00.0000000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1', N'2', N'1-01-01 00:00:00.0000000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'10', N'2', N'2017-04-21 18:08:54.3670000')
GO
GO

DELETE FROM [dbo].[User];
-- ----------------------------
-- Records of User
-- ----------------------------
SET IDENTITY_INSERT [dbo].[User] ON
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'1', N'Admin', N'admin', N'49dc52e6bf2abe5ef6e2bb5b0f1ee2d765b922ae6cc8b95d39dc06c21c848f8c', N'admin@ship.vn', N'0987654321', null, null, N'1', null, null, null)
GO
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'2', N'Shipper Test', N'shipper', N'e0bc614e4fd035a488619799853b075143deea596c477b8dc077e309c0fe42e9', N'shipper@ship.vn', N'0987654321', null, null, N'2', null, null, null)
GO
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'3', N'Shipper Test 1', N'shipper1', N'e0bc614e4fd035a488619799853b075143deea596c477b8dc077e309c0fe42e9', N'shipper1@ship.vn', N'0987654321', null, null, N'2', null, null, null)
GO
GO
SET IDENTITY_INSERT [dbo].[User] OFF
GO
