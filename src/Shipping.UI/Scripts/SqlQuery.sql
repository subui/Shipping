select * from [dbo].[User] where UserId = 2;
select * from [dbo].[Order] where OrderId = 1027;
select * from [dbo].[ShippingRegistration];
select * from [dbo].[ReviewsShipper];

delete from [dbo].[ReviewsShipper]

select [Order].SelectedShipperId from [dbo].[Order] where [Order].OrderName = 'dien thoai 1';

select * from [dbo].[User] where UserId in (select ShopId from [dbo].[Order] where OrderName = 'ad')

select * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='User'

update INFORMATION_SCHEMA.COLUMNS set NUMERIC_SCALE = 1 where TABLE_NAME='User' and COLUMN_NAME = 'Score'

ALTER TABLE [dbo].[User] ALTER COLUMN Score decimal(18,1)

update [dbo].[Order] set Status = 2 where OrderId = 6;

update [dbo].[Order] set StartTime = DATEADD(HOUR, 7, StartTime) where OrderId > 1000;

insert into [dbo].[Order] (
	OrderName,
	ShopId,
	StartingPoint,
	Destination,
	StartTime,
	RecipientsName,
	RecipientsPhoneNumber,
	AdvanceDeposit,
	Profit,
	SelectedShipperId,
	[Status])
values (
	'test 2',
	1,
	'hanoi, vietnam',
	'danang, vietnam',
	'20170430 01:14:00 AM',
	'ten 1',
	'123',
	555,
	555,
	2,
	2
);

update [dbo].[Order] set ShopId = 4 where OrderId = 9

SELECT 
    [Extent1].[OrderId] AS [OrderId]
    FROM [dbo].[Order] AS [Extent1]
    WHERE ([Extent1].[SelectedShipperId] = 2) OR (([Extent1].[SelectedShipperId] IS NULL) AND (2 IS NULL))

select * from "user"