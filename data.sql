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

Date: 2017-05-31 10:56:48
*/


DELETE FROM [dbo].[Order];
GO
DBCC CHECKIDENT(N'[dbo].[Order]', RESEED, 1029)
GO

-- ----------------------------
-- Records of Order
-- ----------------------------
SET IDENTITY_INSERT [dbo].[Order] ON
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1', N'test', N'0', N'1 noi nao do', N'gui vao day', N'2017-04-21 02:21:00.0000000', N'Lung Thị Linh', N'0969969969', N'10000000', N'1000', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'4', N'ad', N'0', N'Hill St. & 2nd St. Los Angeles, CA 90012', N'1600 Pennsylvania Ave NW, Washington, DC 20500', N'2017-04-19 16:59:00.0000000', N'nguoi nhan 1', N'(917) 756-8000', N'999999999', N'0', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'5', N'dien thoai', N'1', N'noi nhan1', N'noi giao1', N'2017-04-29 10:20:00.0000000', N'nguoi nhan 1', N'123', N'555555', N'55', N'3', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'6', N'test 2', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 01:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'2')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'7', N'test get list', N'1', N'hanoi', N'hcm', N'2017-05-10 15:17:00.0000000', N'nguoi nhan 1', N'123', N'111', N'1', N'3', N'4')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'8', N'quan ao', N'1', N'hust', N'neu', N'2017-04-21 12:30:00.0000000', N'lorem', N'0123', N'5555', N'4441', N'3', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'9', N'test toast', N'4', N'toast1', N'toast 2', N'2017-04-24 03:38:00.0000000', N'nguoi nhan 1', N'123', N'1111', N'11', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'10', N'dien thoai 1', N'1', N'vietnam', N'vietnam', N'2017-04-21 02:41:00.0000000', N'nguoi nhan 1', N'123', N'1111', N'11', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'11', N'dien thoai 2', N'1', N'vietnam', N'vietnam', N'2017-04-29 23:00:00.0000000', N'nguoi nhan 1', N'123', N'1111', N'111', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1009', N'sách', N'4', N'vietnam', N'china', N'2017-04-25 16:30:00.0000000', N'Linh Thị Lung', N'1111', N'1', N'1', N'2', N'2')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1010', N'mật ong', N'4', N'東京', N'大阪', N'2017-07-01 00:00:00.0000000', N'マリア小沢', N'０１２３', N'1000000000', N'0', null, N'1')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1011', N'don hang 1', N'1', N'abc', N'xyz', N'2017-05-18 00:44:00.0000000', N'abc xyz', N'0000', N'222', N'222', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1012', N'thuốc nhỏ mũi', N'1', N'41 a võ duy ninh, Bình Thạnh, TP.HCM', N'108 hồng hà , phường 2 , Tân Bình, TP.HCM', N'2017-05-04 23:59:00.0000000', N'không có', N'0', N'0', N'1000000000', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1013', N'1', N'1', N'1', N'1', N'2017-05-04 23:27:00.0000000', N'1', N'1', N'1', N'1', null, N'5')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1014', N'test 3', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1015', N'test 4', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 01:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'2')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1016', N'test 5', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1017', N'test 6', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1018', N'test 7', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1019', N'test 8', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1020', N'test 9', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1021', N'test 10', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1022', N'test 11', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1023', N'test 12', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 01:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'2')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1024', N'test 13', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1025', N'test 14', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1026', N'test 15', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 08:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1027', N'test 16', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-05-02 16:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'3')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1028', N'test 17', N'1', N'hanoi, vietnam', N'danang, vietnam', N'2017-04-30 01:14:00.0000000', N'ten 1', N'123', N'555', N'555', N'2', N'2')
GO
GO
INSERT INTO [dbo].[Order] ([OrderId], [OrderName], [ShopId], [StartingPoint], [Destination], [StartTime], [RecipientsName], [RecipientsPhoneNumber], [AdvanceDeposit], [Profit], [SelectedShipperId], [Status]) VALUES (N'1029', N'rượu vang', N'1', N'hanoi', N'hanoi', N'2017-06-04 17:29:00.0000000', N'foo', N'0011', N'9', N'9', N'2', N'1')
GO
GO
SET IDENTITY_INSERT [dbo].[Order] OFF
GO

DELETE FROM [dbo].[ReviewsShipper];
-- ----------------------------
-- Records of ReviewsShipper
-- ----------------------------
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'5', N'7', N'Lorem ipsum dolor sit amet', N'2017-05-27 17:48:26.1960000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1014', N'9', N'Lorem ipsum dolor sit amet', N'2017-05-27 17:49:25.9000000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1016', N'6', N'Some, such as California Rep. Maxine Waters, have explicitly called for impeaching the President. Others, like Hawaii Rep. Tulsi Gabbard, have merely mentioned the possibility, with Gabbard saying last month that she was studying the impeachment process.', N'2017-05-27 17:35:15.2670000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1017', N'7', N'w', N'2017-05-13 12:36:37.3800000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1019', N'4', N'gg', N'2017-05-13 18:53:26.6650000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1020', N'2', N'5', N'2017-05-13 12:27:08.1790000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1021', N'1', N'tệ', N'2017-05-13 19:27:48.3040000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1022', N'8', N'Hồi ức Linh hoàn toàn sai, nhưng có thể dễ dàng được gây ra bởi một vài dấu hiệu và các câu hỏi. Bộ nhớ có thể bị ô nhiễm. Sai kỷ niệm có thể được cấy ghép ngay cả trong tâm trí mà không xem xét mình dễ bị tổn thương và uncritical. ', N'2017-05-27 17:51:11.5650000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1024', N'1', N'tệ', N'2017-05-13 19:17:31.2560000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1025', N'10', N's', N'2017-05-13 12:35:00.3540000')
GO
GO
INSERT INTO [dbo].[ReviewsShipper] ([OrderId], [Score], [Content], [RevTime]) VALUES (N'1027', N'8', N'hay lắm', N'2017-05-30 01:21:29.7400000')
GO
GO

DELETE FROM [dbo].[ShippingRegistration];
-- ----------------------------
-- Records of ShippingRegistration
-- ----------------------------
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1', N'0', N'1-01-01 00:00:00.0000000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1', N'2', N'2017-04-23 02:54:22.6330000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1', N'3', N'2017-04-22 06:37:43.4430000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'4', N'2', N'2017-04-22 06:02:23.9350000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'4', N'3', N'2017-04-22 06:37:42.1700000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'5', N'2', N'2017-04-23 09:16:09.0220000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'5', N'3', N'2017-04-22 06:37:50.1620000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'6', N'2', N'2017-04-23 03:03:51.4010000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'6', N'3', N'2017-04-22 06:37:51.9780000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'7', N'3', N'2017-04-22 06:37:46.8850000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'8', N'2', N'2017-04-23 02:54:29.7130000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'8', N'3', N'2017-04-22 06:37:48.5470000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'9', N'3', N'2017-04-22 06:37:40.6420000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'10', N'2', N'2017-04-30 01:43:08.1020000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'10', N'3', N'2017-04-22 06:37:44.9380000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'11', N'3', N'2017-04-22 06:37:53.5150000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1009', N'2', N'2017-04-23 09:32:42.2580000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1010', N'2', N'2017-04-23 09:41:28.5440000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1023', N'0', N'2017-05-20 00:34:59.0900000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1025', N'0', N'2017-05-20 00:35:13.4730000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1029', N'2', N'2017-05-27 13:30:24.7380000')
GO
GO
INSERT INTO [dbo].[ShippingRegistration] ([OrderId], [ShipperId], [RegTime]) VALUES (N'1029', N'3', N'2017-05-27 13:30:32.2680000')
GO
GO

DELETE FROM [dbo].[User];
GO
DBCC CHECKIDENT(N'[dbo].[User]', RESEED, 4)
GO

-- ----------------------------
-- Records of User
-- ----------------------------
SET IDENTITY_INSERT [dbo].[User] ON
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'1', N'Admin', N'admin', N'e0bc614e4fd035a488619799853b075143deea596c477b8dc077e309c0fe42e9', N'admin@ship.vn', N'0987654321', N'1996-09-16', N'1', N'1', N'my shop', N'111 quang trung, hà nội', null)
GO
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'2', N'Shipper Test', N'shipper', N'e0bc614e4fd035a488619799853b075143deea596c477b8dc077e309c0fe42e9', N'shipper@ship.vn', N'0987654321', N'1990-01-01', N'1', N'2', null, null, N'5.6')
GO
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'3', N'Shipper Test 1', N'shipper1', N'e0bc614e4fd035a488619799853b075143deea596c477b8dc077e309c0fe42e9', N'shipper1@ship.vn', N'0987654321', null, null, N'2', null, null, N'7.0')
GO
GO
INSERT INTO [dbo].[User] ([UserId], [FullName], [Username], [Password], [Email], [PhoneNumber], [BirthDay], [Gender], [UserType], [ShopName], [ShopAddress], [Score]) VALUES (N'4', N'Lung Thị Linh', N'shop1', N'e0bc614e4fd035a488619799853b075143deea596c477b8dc077e309c0fe42e9', N'lunglinh@ship.vn', N'0000', null, null, N'1', null, null, null)
GO
GO
SET IDENTITY_INSERT [dbo].[User] OFF
GO
